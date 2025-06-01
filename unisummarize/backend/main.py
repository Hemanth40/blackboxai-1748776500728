from fastapi import FastAPI, HTTPException, UploadFile, File, Form, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from enum import Enum
from typing import Optional
import uvicorn

from config import settings
from services.summarizer import summarizer_service
from utils.file_handler import FileHandler, validate_url
from utils.logger import RequestLogMiddleware, log_error, log_info
from middleware.auth import AuthMiddleware

# Models
class InputType(str, Enum):
    text = "text"
    file = "file"
    url = "url"
    image = "image"

class Domain(str, Enum):
    academic = "academic"
    legal = "legal"
    medical = "medical"
    research = "research"
    corporate = "corporate"

class Format(str, Enum):
    bullet = "bullet"
    paragraph = "paragraph"
    detailed = "detailed"

class SummarizeRequest(BaseModel):
    input_type: InputType
    content: str
    domain: Domain
    format: Format

class SummarizeResponse(BaseModel):
    summary: str

# Create FastAPI app
app = FastAPI(
    title="UniSummarize API",
    description="AI-powered text summarization API",
    version="1.0.0"
)

# Add middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.middleware("http")(AuthMiddleware())
app.middleware("http")(RequestLogMiddleware())

# Routes
@app.post("/api/summarize", response_model=SummarizeResponse)
async def summarize(request: SummarizeRequest):
    """
    Summarize text based on input type, domain, and format.
    """
    try:
        log_info("Processing summarization request", {
            "input_type": request.input_type,
            "domain": request.domain,
            "format": request.format
        })

        if request.input_type == InputType.text:
            summary = await summarizer_service.summarize_text(
                request.content,
                request.domain,
                request.format
            )
        elif request.input_type == InputType.url:
            # Validate URL first
            validate_url(request.content)
            summary = await summarizer_service.summarize_url(
                request.content,
                request.domain,
                request.format
            )
        else:
            raise HTTPException(
                status_code=400,
                detail="Invalid input type for this endpoint. Use /api/summarize/file for file uploads."
            )

        log_info("Summarization completed successfully")
        return {"summary": summary}

    except Exception as e:
        log_error(e, {
            "input_type": request.input_type,
            "domain": request.domain,
            "format": request.format
        })
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/summarize/file", response_model=SummarizeResponse)
async def summarize_file(
    file: UploadFile = File(...),
    domain: Domain = Form(...),
    format: Format = Form(...),
    file_handler: FileHandler = Depends(FileHandler)
):
    """
    Handle file uploads (PDF, DOCX, images) for summarization.
    """
    try:
        log_info("Processing file upload", {
            "filename": file.filename,
            "content_type": file.content_type,
            "domain": domain,
            "format": format
        })

        # Validate file
        await file_handler.validate_file(file)
        
        # Read file content
        file_content = await file.read()
        file_extension = file_handler.get_file_extension(file.filename)
        
        if file_extension in ['png', 'jpg', 'jpeg']:
            summary = await summarizer_service.summarize_image(
                file_content,
                domain,
                format
            )
        else:  # pdf or docx
            summary = await summarizer_service.summarize_file(
                file_content,
                file.filename,
                domain,
                format
            )

        log_info("File summarization completed successfully", {
            "filename": file.filename
        })
        return {"summary": summary}
        
    except Exception as e:
        log_error(e, {
            "filename": file.filename,
            "domain": domain,
            "format": format
        })
        raise HTTPException(status_code=500, detail=str(e))
    
    finally:
        await file.close()

# Health check endpoint
@app.get("/api/health")
async def health_check():
    """
    Check the health status of the API and its dependencies.
    """
    try:
        # Check if summarizer service is ready
        model_status = "online" if summarizer_service.summarizer is not None else "offline"
        
        return {
            "status": "healthy",
            "timestamp": datetime.utcnow().isoformat(),
            "services": {
                "api": "online",
                "summarizer": model_status
            },
            "version": "1.0.0"
        }
    except Exception as e:
        log_error(e)
        return {
            "status": "unhealthy",
            "error": str(e)
        }

# Error handlers
from fastapi.responses import JSONResponse

@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    log_error(exc)
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": {
                "status_code": exc.status_code,
                "detail": exc.detail
            }
        }
    )

@app.exception_handler(Exception)
async def general_exception_handler(request, exc):
    log_error(exc)
    return JSONResponse(
        status_code=500,
        content={
            "error": {
                "status_code": 500,
                "detail": "Internal server error"
            }
        }
    )

if __name__ == "__main__":
    log_info(f"Starting server on {settings.host}:{settings.port}")
    uvicorn.run(
        "main:app",
        host=settings.host,
        port=settings.port,
        reload=settings.debug
    )
