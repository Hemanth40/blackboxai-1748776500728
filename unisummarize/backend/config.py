import os
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Base directory
BASE_DIR = Path(__file__).resolve().parent

# API Settings
API_VERSION = "v1"
API_PREFIX = f"/api/{API_VERSION}"

# Server Settings
DEBUG = os.getenv("DEBUG", "True").lower() == "true"
HOST = os.getenv("HOST", "0.0.0.0")
PORT = int(os.getenv("PORT", 8000))

# CORS Settings
CORS_ORIGINS = os.getenv("CORS_ORIGINS", "http://localhost:8000").split(",")
CORS_ORIGINS = [origin.strip() for origin in CORS_ORIGINS]

# File Upload Settings
UPLOAD_DIR = BASE_DIR / "uploads"
TEMP_DIR = BASE_DIR / "temp"
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB

# Create necessary directories
UPLOAD_DIR.mkdir(exist_ok=True)
TEMP_DIR.mkdir(exist_ok=True)

# Model Settings
SUMMARIZATION_MODEL = os.getenv("SUMMARIZATION_MODEL", "facebook/bart-large-cnn")
MAX_SUMMARY_LENGTH = int(os.getenv("MAX_SUMMARY_LENGTH", 130))
MIN_SUMMARY_LENGTH = int(os.getenv("MIN_SUMMARY_LENGTH", 30))

# OCR Settings
OCR_LANGUAGES = os.getenv("OCR_LANGUAGES", "en").split(",")
OCR_LANGUAGES = [lang.strip() for lang in OCR_LANGUAGES]

# Security Settings
API_KEY_HEADER = "X-API-Key"
API_KEY = os.getenv("API_KEY")

# Rate Limiting
RATE_LIMIT_ENABLED = os.getenv("RATE_LIMIT_ENABLED", "True").lower() == "true"
RATE_LIMIT = int(os.getenv("RATE_LIMIT", 100))  # requests per hour

# Cleanup Settings
TEMP_FILE_TTL = 3600  # 1 hour in seconds

class Settings:
    """
    Application settings class
    """
    def __init__(self):
        self.debug = DEBUG
        self.host = HOST
        self.port = PORT
        self.api_prefix = API_PREFIX
        self.cors_origins = CORS_ORIGINS
        self.upload_dir = UPLOAD_DIR
        self.temp_dir = TEMP_DIR
        self.max_file_size = MAX_FILE_SIZE
        self.summarization_model = SUMMARIZATION_MODEL
        self.max_summary_length = MAX_SUMMARY_LENGTH
        self.min_summary_length = MIN_SUMMARY_LENGTH
        self.ocr_languages = OCR_LANGUAGES
        self.api_key = API_KEY
        self.rate_limit_enabled = RATE_LIMIT_ENABLED
        self.rate_limit = RATE_LIMIT
        self.temp_file_ttl = TEMP_FILE_TTL

    def dict(self):
        """Return settings as dictionary"""
        return {
            "debug": self.debug,
            "host": self.host,
            "port": self.port,
            "api_prefix": self.api_prefix,
            "cors_origins": self.cors_origins,
            "upload_dir": str(self.upload_dir),
            "temp_dir": str(self.temp_dir),
            "max_file_size": self.max_file_size,
            "summarization_model": self.summarization_model,
            "max_summary_length": self.max_summary_length,
            "min_summary_length": self.min_summary_length,
            "ocr_languages": self.ocr_languages,
            "rate_limit_enabled": self.rate_limit_enabled,
            "rate_limit": self.rate_limit,
            "temp_file_ttl": self.temp_file_ttl
        }

# Create settings instance
settings = Settings()
