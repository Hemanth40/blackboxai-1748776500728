# UniSummarize Backend

FastAPI-based backend for the UniSummarize application, providing AI-powered text summarization capabilities.

## Features

- Text summarization using state-of-the-art AI models
- Multiple input types support:
  - Direct text input
  - File upload (PDF, DOCX)
  - URL content extraction
  - Image OCR
- Domain-specific summarization
- Multiple output formats
- File validation and security measures
- Rate limiting and API key authentication
- CORS support

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Configure environment:
```bash
cp .env.example .env
# Edit .env with your settings
```

4. Run the server:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

## API Endpoints

### POST /api/summarize
Summarize text or URL content.

Request body:
```json
{
    "input_type": "text|url",
    "content": "string",
    "domain": "academic|legal|medical|research|corporate",
    "format": "bullet|paragraph|detailed"
}
```

### POST /api/summarize/file
Summarize content from uploaded files (PDF, DOCX, images).

Form data:
- file: File upload
- domain: string (academic|legal|medical|research|corporate)
- format: string (bullet|paragraph|detailed)

### GET /api/health
Health check endpoint.

## Project Structure

```
backend/
├── main.py              # FastAPI application and routes
├── config.py            # Configuration and settings
├── requirements.txt     # Python dependencies
├── services/
│   └── summarizer.py    # Text summarization service
└── utils/
    └── file_handler.py  # File processing utilities
```

## API Response Format

Success Response:
```json
{
    "summary": "Summarized text content..."
}
```

Error Response:
```json
{
    "error": {
        "status_code": 400,
        "detail": "Error message..."
    }
}
```

## Input Types

1. Text Input
   - Direct text pasting
   - Minimum length requirement
   - Support for multiple languages

2. File Upload
   - PDF documents
   - DOCX files
   - Size limit: 10MB
   - Automatic text extraction

3. URL Content
   - Web page content extraction
   - Article parsing
   - URL validation

4. Image OCR
   - Support for PNG, JPG, JPEG
   - Text extraction from images
   - Multiple language support

## Summarization Domains

1. Academic
   - Research papers
   - Academic articles
   - Educational content

2. Legal
   - Legal documents
   - Contracts
   - Case law

3. Medical
   - Medical reports
   - Research papers
   - Clinical documents

4. Research
   - Scientific papers
   - Research findings
   - Technical documents

5. Corporate
   - Business documents
   - Reports
   - Emails

## Output Formats

1. Bullet Points
   - Key points extraction
   - Concise format
   - Easy to read

2. Paragraph
   - Flowing narrative
   - Context preservation
   - Natural language

3. Detailed
   - Comprehensive analysis
   - Main themes
   - Key findings

## Error Handling

The API uses standard HTTP status codes:
- 200: Success
- 400: Bad Request (invalid input)
- 401: Unauthorized
- 429: Too Many Requests
- 500: Internal Server Error

## Security Features

1. Input Validation
   - File type verification
   - Size limits
   - Content validation

2. Authentication
   - API key requirement
   - Rate limiting
   - Request validation

3. CORS Security
   - Configured origins
   - Method restrictions
   - Header controls

## Development Guidelines

1. Code Style
   - Follow PEP 8
   - Use type hints
   - Document functions

2. Testing
   - Write unit tests
   - Integration tests
   - API tests

3. Error Handling
   - Proper exception handling
   - Meaningful error messages
   - Logging

4. Performance
   - Async operations
   - Efficient file handling
   - Resource cleanup
