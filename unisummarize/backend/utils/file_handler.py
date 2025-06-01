from fastapi import HTTPException, UploadFile
from typing import List
import magic
import os

# Allowed file types and their MIME types
ALLOWED_FILE_TYPES = {
    'pdf': 'application/pdf',
    'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'png': 'image/png',
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg'
}

# Maximum file size (10 MB)
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB in bytes

class FileHandler:
    @staticmethod
    async def validate_file(file: UploadFile) -> bool:
        """
        Validate file type and size.
        Returns True if valid, raises HTTPException if not.
        """
        try:
            # Read first 2048 bytes for MIME type detection
            header = await file.read(2048)
            await file.seek(0)  # Reset file pointer
            
            # Get MIME type
            mime_type = magic.from_buffer(header, mime=True)
            
            # Check file type
            if mime_type not in ALLOWED_FILE_TYPES.values():
                raise HTTPException(
                    status_code=400,
                    detail=f"File type not allowed. Allowed types: {', '.join(ALLOWED_FILE_TYPES.keys())}"
                )
            
            # Check file size
            file_size = 0
            while chunk := await file.read(8192):
                file_size += len(chunk)
                if file_size > MAX_FILE_SIZE:
                    raise HTTPException(
                        status_code=400,
                        detail=f"File size too large. Maximum size allowed: {MAX_FILE_SIZE/1024/1024}MB"
                    )
            
            await file.seek(0)  # Reset file pointer
            return True
            
        except Exception as e:
            if not isinstance(e, HTTPException):
                raise HTTPException(status_code=500, detail=f"Error validating file: {str(e)}")
            raise e

    @staticmethod
    def get_file_extension(filename: str) -> str:
        """Get file extension from filename."""
        return os.path.splitext(filename)[1].lower().replace('.', '')

    @staticmethod
    async def save_file_temporarily(file: UploadFile) -> str:
        """
        Save uploaded file to temporary location.
        Returns the path to the saved file.
        """
        try:
            temp_dir = "temp"
            if not os.path.exists(temp_dir):
                os.makedirs(temp_dir)
            
            file_path = os.path.join(temp_dir, file.filename)
            
            # Save file
            with open(file_path, "wb") as buffer:
                while chunk := await file.read(8192):
                    buffer.write(chunk)
            
            return file_path
            
        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=f"Error saving file: {str(e)}"
            )

    @staticmethod
    def cleanup_temp_file(file_path: str) -> None:
        """Remove temporary file."""
        try:
            if os.path.exists(file_path):
                os.remove(file_path)
        except Exception as e:
            print(f"Error cleaning up temporary file: {str(e)}")

# URL validation
def validate_url(url: str) -> bool:
    """
    Validate URL format and accessibility.
    Returns True if valid, raises HTTPException if not.
    """
    import re
    import requests
    
    # Basic URL format validation
    url_pattern = re.compile(
        r'^https?://'  # http:// or https://
        r'(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+[A-Z]{2,6}\.?|'  # domain...
        r'localhost|'  # localhost...
        r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})'  # ...or ip
        r'(?::\d+)?'  # optional port
        r'(?:/?|[/?]\S+)$', re.IGNORECASE)
    
    if not url_pattern.match(url):
        raise HTTPException(status_code=400, detail="Invalid URL format")
    
    try:
        # Check if URL is accessible
        response = requests.head(url, timeout=5)
        response.raise_for_status()
        return True
    except requests.RequestException as e:
        raise HTTPException(status_code=400, detail=f"URL not accessible: {str(e)}")
