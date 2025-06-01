import logging
import sys
from pathlib import Path
from logging.handlers import RotatingFileHandler
import json
from datetime import datetime
from config import settings

# Create logs directory if it doesn't exist
LOGS_DIR = Path(__file__).resolve().parent.parent / "logs"
LOGS_DIR.mkdir(exist_ok=True)

# Log file paths
APP_LOG_FILE = LOGS_DIR / "app.log"
ERROR_LOG_FILE = LOGS_DIR / "error.log"
REQUEST_LOG_FILE = LOGS_DIR / "requests.log"

class JSONFormatter(logging.Formatter):
    """Custom JSON formatter for structured logging"""
    def format(self, record):
        log_obj = {
            "timestamp": datetime.utcnow().isoformat(),
            "level": record.levelname,
            "message": record.getMessage(),
            "module": record.module,
            "function": record.funcName,
            "line": record.lineno
        }
        
        # Add exception info if present
        if record.exc_info:
            log_obj["exception"] = {
                "type": str(record.exc_info[0].__name__),
                "message": str(record.exc_info[1]),
                "traceback": self.formatException(record.exc_info)
            }
        
        # Add extra fields if present
        if hasattr(record, "extra_fields"):
            log_obj.update(record.extra_fields)
        
        return json.dumps(log_obj)

def setup_logger(name: str, log_file: Path, level=logging.INFO):
    """Set up a logger with both file and console handlers"""
    logger = logging.getLogger(name)
    logger.setLevel(level)
    
    # Prevent duplicate handlers
    if logger.handlers:
        return logger
    
    # File handler with rotation
    file_handler = RotatingFileHandler(
        log_file,
        maxBytes=10*1024*1024,  # 10MB
        backupCount=5
    )
    file_handler.setFormatter(JSONFormatter())
    logger.addHandler(file_handler)
    
    # Console handler
    console_handler = logging.StreamHandler(sys.stdout)
    console_handler.setFormatter(JSONFormatter())
    logger.addHandler(console_handler)
    
    return logger

# Create loggers
app_logger = setup_logger("app", APP_LOG_FILE)
error_logger = setup_logger("error", ERROR_LOG_FILE, level=logging.ERROR)
request_logger = setup_logger("request", REQUEST_LOG_FILE)

class RequestLogMiddleware:
    """Middleware to log all requests"""
    async def __call__(self, request, call_next):
        # Start timer
        start_time = datetime.utcnow()
        
        # Get request details
        request_details = {
            "method": request.method,
            "url": str(request.url),
            "client_ip": request.client.host,
            "headers": dict(request.headers),
            "timestamp": start_time.isoformat()
        }
        
        try:
            # Process request
            response = await call_next(request)
            
            # Debug log response type and content
            request_logger.info(
                f"Response type: {type(response)}"
            )
            if hasattr(response, "body"):
                body = await response.body()
                request_logger.info(
                    f"Response body: {body.decode('utf-8') if body else 'empty'}"
                )
            
            # Calculate duration
            duration = (datetime.utcnow() - start_time).total_seconds()
            
            # Log request details
            request_logger.info(
                "Request processed",
                extra={
                    "extra_fields": {
                        **request_details,
                        "status_code": response.status_code,
                        "duration": duration
                    }
                }
            )
            
            return response
            
        except Exception as e:
            # Log error details
            error_logger.exception(
                "Request failed",
                extra={
                    "extra_fields": {
                        **request_details,
                        "error": str(e)
                    }
                }
            )
            raise

def log_error(error: Exception, context: dict = None):
    """Helper function to log errors with context"""
    error_logger.exception(
        str(error),
        extra={
            "extra_fields": {
                "context": context or {}
            }
        }
    )

def log_info(message: str, context: dict = None):
    """Helper function to log info messages with context"""
    app_logger.info(
        message,
        extra={
            "extra_fields": {
                "context": context or {}
            }
        }
    )

def log_warning(message: str, context: dict = None):
    """Helper function to log warning messages with context"""
    app_logger.warning(
        message,
        extra={
            "extra_fields": {
                "context": context or {}
            }
        }
    )
