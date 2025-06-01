#!/usr/bin/env python3
import pytest
import coverage
import sys
import os
from pathlib import Path

def run_tests_with_coverage():
    """Run tests with coverage reporting"""
    # Start coverage measurement
    cov = coverage.Coverage(
        branch=True,
        source=["services", "utils", "middleware", "main.py"],
        omit=["*/__init__.py", "*/tests/*", "run_tests.py"]
    )
    cov.start()

    # Run pytest with specified arguments
    args = [
        "--verbose",
        "--color=yes",
        "-s",  # Show print statements
        "--tb=short",  # Shorter traceback format
        "--strict-markers",
        "-ra",  # Show extra test summary
    ]

    # Add coverage options
    args.extend([
        "--cov=.",
        "--cov-report=term-missing",
        "--cov-report=html:coverage_html",
        "--cov-report=xml:coverage.xml"
    ])

    # Run tests
    result = pytest.main(args)

    # Stop coverage measurement
    cov.stop()
    cov.save()

    # Generate reports
    print("\nGenerating coverage reports...")
    cov.report(show_missing=True)
    cov.html_report(directory='coverage_html')
    cov.xml_report()

    return result

def main():
    """Main function to run tests"""
    print("Starting test run...")
    print("Python version:", sys.version)
    print("Current directory:", os.getcwd())
    
    # Create reports directory if it doesn't exist
    Path("reports").mkdir(exist_ok=True)
    
    try:
        result = run_tests_with_coverage()
        
        if result == 0:
            print("\n✅ All tests passed!")
            print("\nCoverage reports have been generated:")
            print("- HTML report: coverage_html/index.html")
            print("- XML report: coverage.xml")
        else:
            print("\n❌ Some tests failed!")
            
        sys.exit(result)
        
    except Exception as e:
        print(f"\n❌ Error running tests: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
