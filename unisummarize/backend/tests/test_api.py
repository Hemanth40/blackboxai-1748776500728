import pytest
from fastapi.testclient import TestClient
from main import app
from config import settings
import os
import io

# Test client
client = TestClient(app)

# Test data
TEST_API_KEY = "test-api-key"
settings.api_key = TEST_API_KEY

@pytest.fixture
def api_headers():
    return {"X-API-Key": TEST_API_KEY}

def test_health_check():
    """Test health check endpoint"""
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"

def test_summarize_text(api_headers):
    """Test text summarization endpoint"""
    test_data = {
        "input_type": "text",
        "content": "This is a test text that needs to be summarized. It contains multiple sentences and should be processed by the summarization model. The text should be long enough to generate a meaningful summary.",
        "domain": "academic",
        "format": "bullet"
    }
    
    response = client.post("/api/summarize", json=test_data, headers=api_headers)
    assert response.status_code == 200
    assert "summary" in response.json()

def test_summarize_url(api_headers):
    """Test URL summarization endpoint"""
    test_data = {
        "input_type": "url",
        "content": "https://example.com",
        "domain": "research",
        "format": "paragraph"
    }
    
    response = client.post("/api/summarize", json=test_data, headers=api_headers)
    assert response.status_code == 200
    assert "summary" in response.json()

def test_summarize_file(api_headers):
    """Test file upload summarization"""
    # Create a test PDF file
    test_file_content = b"%PDF-1.4\nTest PDF content"
    test_files = {
        "file": ("test.pdf", io.BytesIO(test_file_content), "application/pdf")
    }
    test_data = {
        "domain": "academic",
        "format": "detailed"
    }
    
    response = client.post(
        "/api/summarize/file",
        files=test_files,
        data=test_data,
        headers=api_headers
    )
    assert response.status_code == 200
    assert "summary" in response.json()

def test_summarize_image(api_headers):
    """Test image OCR and summarization"""
    # Create a test image file
    test_image = b"fake-image-content"
    test_files = {
        "file": ("test.png", io.BytesIO(test_image), "image/png")
    }
    test_data = {
        "domain": "academic",
        "format": "bullet"
    }
    
    response = client.post(
        "/api/summarize/file",
        files=test_files,
        data=test_data,
        headers=api_headers
    )
    assert response.status_code == 200
    assert "summary" in response.json()

def test_invalid_api_key():
    """Test authentication with invalid API key"""
    test_data = {
        "input_type": "text",
        "content": "Test content",
        "domain": "academic",
        "format": "bullet"
    }
    
    response = client.post(
        "/api/summarize",
        json=test_data,
        headers={"X-API-Key": "invalid-key"}
    )
    assert response.status_code == 401

def test_rate_limiting(api_headers):
    """Test rate limiting"""
    # Make multiple requests to trigger rate limit
    for _ in range(settings.rate_limit + 1):
        response = client.get("/api/health", headers=api_headers)
    
    # Next request should be rate limited
    response = client.get("/api/health", headers=api_headers)
    assert response.status_code == 429

def test_invalid_input_type(api_headers):
    """Test invalid input type handling"""
    test_data = {
        "input_type": "invalid",
        "content": "Test content",
        "domain": "academic",
        "format": "bullet"
    }
    
    response = client.post("/api/summarize", json=test_data, headers=api_headers)
    assert response.status_code == 422  # Validation error

def test_invalid_domain(api_headers):
    """Test invalid domain handling"""
    test_data = {
        "input_type": "text",
        "content": "Test content",
        "domain": "invalid",
        "format": "bullet"
    }
    
    response = client.post("/api/summarize", json=test_data, headers=api_headers)
    assert response.status_code == 422  # Validation error

def test_invalid_format(api_headers):
    """Test invalid format handling"""
    test_data = {
        "input_type": "text",
        "content": "Test content",
        "domain": "academic",
        "format": "invalid"
    }
    
    response = client.post("/api/summarize", json=test_data, headers=api_headers)
    assert response.status_code == 422  # Validation error

def test_empty_content(api_headers):
    """Test empty content handling"""
    test_data = {
        "input_type": "text",
        "content": "",
        "domain": "academic",
        "format": "bullet"
    }
    
    response = client.post("/api/summarize", json=test_data, headers=api_headers)
    assert response.status_code == 400  # Bad request

def test_large_file(api_headers):
    """Test file size limit handling"""
    # Create a large file exceeding the size limit
    large_content = b"x" * (settings.max_file_size + 1)
    test_files = {
        "file": ("large.pdf", io.BytesIO(large_content), "application/pdf")
    }
    test_data = {
        "domain": "academic",
        "format": "bullet"
    }
    
    response = client.post(
        "/api/summarize/file",
        files=test_files,
        data=test_data,
        headers=api_headers
    )
    assert response.status_code == 400  # Bad request
