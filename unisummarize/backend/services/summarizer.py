from transformers import pipeline
from typing import List, Optional
import requests
from bs4 import BeautifulSoup
import pytesseract
from PIL import Image
import io
import docx
import PyPDF2
import easyocr
import re

class SummarizerService:
    def __init__(self):
        # Initialize the summarization model
        self.summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
        # Initialize EasyOCR for image text extraction
        self.reader = easyocr.Reader(['en'])

    def _clean_text(self, text: str) -> str:
        """Clean and preprocess text."""
        # Remove extra whitespace
        text = re.sub(r'\s+', ' ', text)
        # Remove special characters but keep punctuation
        text = re.sub(r'[^\w\s.,!?-]', '', text)
        return text.strip()

    def _format_summary(self, summary: str, format_type: str) -> str:
        """Format the summary based on the requested format."""
        if format_type == "bullet":
            # Split into sentences and create bullet points
            sentences = re.split(r'[.!?]+', summary)
            sentences = [s.strip() for s in sentences if s.strip()]
            return "\n".join(f"• {sentence}" for sentence in sentences)
        
        elif format_type == "detailed":
            # For detailed format, we'll add sections
            return f"""
Key Points:
{summary}

Analysis:
The text provides comprehensive information about the topic, highlighting several important aspects.

Main Themes:
• {summary.split('.')[0]}
• {summary.split('.')[1] if len(summary.split('.')) > 1 else ''}
            """.strip()
        
        else:  # paragraph format
            return summary

    def _adapt_to_domain(self, text: str, domain: str) -> str:
        """Adapt the summary style based on the domain."""
        domain_prefixes = {
            "academic": "This academic analysis reveals that ",
            "legal": "From a legal perspective, ",
            "medical": "The medical findings indicate that ",
            "research": "The research demonstrates that ",
            "corporate": "The business implications suggest that "
        }
        return f"{domain_prefixes.get(domain, '')}{text}"

    async def summarize_text(self, text: str, domain: str, format_type: str) -> str:
        """Summarize plain text input."""
        cleaned_text = self._clean_text(text)
        
        # Generate summary
        summary = self.summarizer(cleaned_text, max_length=130, min_length=30, do_sample=False)[0]['summary_text']
        
        # Adapt to domain and format
        summary = self._adapt_to_domain(summary, domain)
        formatted_summary = self._format_summary(summary, format_type)
        
        return formatted_summary

    async def summarize_file(self, file_content: bytes, filename: str, domain: str, format_type: str) -> str:
        """Extract and summarize text from files (PDF, DOCX)."""
        text = ""
        
        if filename.endswith('.pdf'):
            # Handle PDF files
            pdf_file = io.BytesIO(file_content)
            pdf_reader = PyPDF2.PdfReader(pdf_file)
            for page in pdf_reader.pages:
                text += page.extract_text()
        
        elif filename.endswith('.docx'):
            # Handle DOCX files
            doc = docx.Document(io.BytesIO(file_content))
            text = "\n".join([paragraph.text for paragraph in doc.paragraphs])
        
        else:
            raise ValueError("Unsupported file format")

        return await self.summarize_text(text, domain, format_type)

    async def summarize_url(self, url: str, domain: str, format_type: str) -> str:
        """Extract and summarize text from a URL."""
        try:
            response = requests.get(url)
            response.raise_for_status()
            
            # Parse HTML and extract text
            soup = BeautifulSoup(response.text, 'html.parser')
            # Remove script and style elements
            for script in soup(["script", "style"]):
                script.decompose()
            
            # Get text content
            text = soup.get_text()
            text = self._clean_text(text)
            
            return await self.summarize_text(text, domain, format_type)
        
        except Exception as e:
            raise Exception(f"Error processing URL: {str(e)}")

    async def summarize_image(self, image_content: bytes, domain: str, format_type: str) -> str:
        """Extract and summarize text from images using OCR."""
        try:
            # Convert bytes to PIL Image
            image = Image.open(io.BytesIO(image_content))
            
            # Use EasyOCR to extract text
            results = self.reader.readtext(image)
            text = " ".join([result[1] for result in results])
            
            if not text.strip():
                raise ValueError("No text could be extracted from the image")
            
            return await self.summarize_text(text, domain, format_type)
        
        except Exception as e:
            raise Exception(f"Error processing image: {str(e)}")

# Create a singleton instance
summarizer_service = SummarizerService()
