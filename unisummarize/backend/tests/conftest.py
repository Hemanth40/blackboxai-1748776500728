import pytest
import os
import shutil
from pathlib import Path
from fastapi.testclient import TestClient
from main import app
from config import settings

# Test configuration
TEST_DIR = Path(__file__).parent
TEMP_TEST_DIR = TEST_DIR / "temp"
TEST_UPLOAD_DIR = TEST_DIR / "uploads"
TEST_API_KEY = "test-api-key"

@pytest.fixture(autouse=True)
def setup_test_environment():
    """Setup test environment before each test"""
    # Create test directories
    TEMP_TEST_DIR.mkdir(exist_ok=True)
    TEST_UPLOAD_DIR.mkdir(exist_ok=True)
    
    # Set test settings
    settings.api_key = TEST_API_KEY
    settings.upload_dir = TEST_UPLOAD_DIR
    settings.temp_dir = TEMP_TEST_DIR
    settings.rate_limit = 10  # Lower rate limit for testing
    
    yield
    
    # Cleanup after tests
    if TEMP_TEST_DIR.exists():
        shutil.rmtree(TEMP_TEST_DIR)
    if TEST_UPLOAD_DIR.exists():
        shutil.rmtree(TEST_UPLOAD_DIR)

@pytest.fixture
def client():
    """Test client fixture"""
    return TestClient(app)

@pytest.fixture
def api_headers():
    """Headers with API key"""
    return {"X-API-Key": TEST_API_KEY}

@pytest.fixture
def sample_text():
    """Sample text for testing"""
    return """
    This is a sample text for testing the summarization functionality.
    It contains multiple sentences and should be long enough to generate a meaningful summary.
    The text includes various topics and should be processed correctly by the summarization model.
    We expect the summary to capture the main points while maintaining coherence and readability.
    """

@pytest.fixture
def sample_pdf():
    """Sample PDF file for testing"""
    content = b"%PDF-1.4\nTest PDF content for summarization testing"
    return ("test.pdf", content, "application/pdf")

@pytest.fixture
def sample_docx():
    """Sample DOCX file for testing"""
    content = b"PK\x03\x04\x14\x00\x00\x00\x00\x00Test DOCX content"
    return ("test.docx", content, "application/vnd.openxmlformats-officedocument.wordprocessingml.document")

@pytest.fixture
def sample_image():
    """Sample image file for testing"""
    content = b"Fake PNG image content for OCR testing"
    return ("test.png", content, "image/png")

@pytest.fixture
def sample_url():
    """Sample URL for testing"""
    return "https://example.com/test-article"

class MockSummarizer:
    """Mock summarizer for testing"""
    def __init__(self):
        self.last_input = None
    
    async def summarize_text(self, text, domain, format_type):
        self.last_input = {"text": text, "domain": domain, "format": format_type}
        return "Mock summary for text input"
    
    async def summarize_file(self, content, filename, domain, format_type):
        self.last_input = {"filename": filename, "domain": domain, "format": format_type}
        return "Mock summary for file input"
    
    async def summarize_url(self, url, domain, format_type):
        self.last_input = {"url": url, "domain": domain, "format": format_type}
        return "Mock summary for URL input"
    
    async def summarize_image(self, content, domain, format_type):
        self.last_input = {"domain": domain, "format": format_type}
        return "Mock summary for image input"

@pytest.fixture
def mock_summarizer():
    """Mock summarizer fixture"""
    return MockSummarizer()

def pytest_configure(config):
    """Configure pytest"""
    config.addinivalue_line(
        "markers",
        "slow: marks tests as slow (deselect with '-m \"not slow\"')"
    )
    config.addinivalue_line(
        "markers",
        "integration: marks tests as integration tests"
    )

def pytest_collection_modifyitems(config, items):
    """Modify test items to add markers"""
    for item in items:
        if "integration" in item.nodeid:
            item.add_marker(pytest.mark.integration)
        if "slow" in item.nodeid:
            item.add_marker(pytest.mark.slow)
