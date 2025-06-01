from fastapi import Request, HTTPException
from fastapi.security import APIKeyHeader
from typing import Optional
import time
from datetime import datetime, timedelta
import jwt
from config import settings

# API Key authentication
api_key_header = APIKeyHeader(name="X-API-Key", auto_error=False)

# Store for rate limiting
# In production, this should be replaced with Redis
rate_limit_store = {}

class RateLimiter:
    def __init__(self, requests_per_hour: int = 100):
        self.requests_per_hour = requests_per_hour
        self.window_size = 3600  # 1 hour in seconds

    def is_rate_limited(self, client_id: str) -> bool:
        """
        Check if a client has exceeded their rate limit.
        Returns True if rate limited, False otherwise.
        """
        current_time = time.time()
        
        # Clean up old entries
        self._cleanup_old_entries(current_time)
        
        # Get client's request history
        client_requests = rate_limit_store.get(client_id, {"requests": [], "count": 0})
        
        # Remove requests outside the current window
        window_start = current_time - self.window_size
        client_requests["requests"] = [
            req_time for req_time in client_requests["requests"]
            if req_time > window_start
        ]
        client_requests["count"] = len(client_requests["requests"])
        
        # Check if rate limit is exceeded
        if client_requests["count"] >= self.requests_per_hour:
            return True
        
        # Add current request
        client_requests["requests"].append(current_time)
        client_requests["count"] += 1
        rate_limit_store[client_id] = client_requests
        
        return False

    def _cleanup_old_entries(self, current_time: float):
        """Remove entries older than the window size."""
        cutoff_time = current_time - self.window_size
        for client_id in list(rate_limit_store.keys()):
            rate_limit_store[client_id]["requests"] = [
                req_time for req_time in rate_limit_store[client_id]["requests"]
                if req_time > cutoff_time
            ]
            rate_limit_store[client_id]["count"] = len(rate_limit_store[client_id]["requests"])
            if rate_limit_store[client_id]["count"] == 0:
                del rate_limit_store[client_id]

class AuthMiddleware:
    def __init__(self):
        self.rate_limiter = RateLimiter(settings.rate_limit)

    async def __call__(self, request: Request, call_next):
        # Skip authentication for health check
        if request.url.path == "/api/health":
            return await call_next(request)

        try:
            # Verify API key
            api_key = request.headers.get("X-API-Key")
            if not api_key or api_key != settings.api_key:
                raise HTTPException(
                    status_code=401,
                    detail="Invalid or missing API key"
                )

            # Check rate limit
            if settings.rate_limit_enabled:
                client_id = request.headers.get("X-Client-ID", api_key)
                if self.rate_limiter.is_rate_limited(client_id):
                    raise HTTPException(
                        status_code=429,
                        detail="Rate limit exceeded. Please try again later."
                    )

            # Add rate limit headers to response
            response = await call_next(request)
            if settings.rate_limit_enabled:
                client_requests = rate_limit_store.get(client_id, {"count": 0})
                remaining = max(0, settings.rate_limit - client_requests["count"])
                
                response.headers["X-RateLimit-Limit"] = str(settings.rate_limit)
                response.headers["X-RateLimit-Remaining"] = str(remaining)
                response.headers["X-RateLimit-Reset"] = str(int(time.time() + 3600))

            return response

        except HTTPException as exc:
            return {
                "error": {
                    "status_code": exc.status_code,
                    "detail": exc.detail
                }
            }
        except Exception as e:
            return {
                "error": {
                    "status_code": 500,
                    "detail": "Internal server error"
                }
            }

def get_api_key(request: Request) -> Optional[str]:
    """Helper function to get API key from request headers."""
    return request.headers.get("X-API-Key")

def verify_api_key(api_key: str) -> bool:
    """Verify if the API key is valid."""
    return api_key == settings.api_key
