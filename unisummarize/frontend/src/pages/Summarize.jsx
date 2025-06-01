import { useState, useRef } from 'react';
import { Upload, Link as LinkIcon, Image as ImageIcon, FileText, Copy, Download, Sparkles, Zap, Clock, Target } from 'lucide-react';

const Summarize = () => {
  const [inputType, setInputType] = useState('text');
  const [domain, setDomain] = useState('academic');
  const [format, setFormat] = useState('bullet');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState('');
  const fileInputRef = useRef(null);

  const inputTypes = [
    { 
      id: 'text', 
      label: 'Text', 
      icon: <FileText className="h-5 w-5" />,
      description: 'Paste text directly',
      color: 'from-blue-500 to-cyan-500'
    },
    { 
      id: 'file', 
      label: 'Document', 
      icon: <Upload className="h-5 w-5" />,
      description: 'Upload PDF, DOCX',
      color: 'from-purple-500 to-pink-500'
    },
    { 
      id: 'url', 
      label: 'URL', 
      icon: <LinkIcon className="h-5 w-5" />,
      description: 'Extract from webpage',
      color: 'from-green-500 to-emerald-500'
    },
    { 
      id: 'image', 
      label: 'Image', 
      icon: <ImageIcon className="h-5 w-5" />,
      description: 'OCR text extraction',
      color: 'from-orange-500 to-red-500'
    },
  ];

  const domains = [
    { id: 'academic', label: 'Academic', tag: 'StudySummarizer', icon: '🎓' },
    { id: 'legal', label: 'Legal', tag: 'LegalBrev', icon: '⚖️' },
    { id: 'medical', label: 'Medical', tag: 'MedDigest', icon: '🏥' },
    { id: 'research', label: 'Research', tag: 'ResearchBrevio', icon: '🔬' },
    { id: 'corporate', label: 'Corporate', tag: 'MailBrev', icon: '💼' },
  ];

  const formats = [
    { id: 'bullet', label: 'Bullet Points', icon: '•', description: 'Key points in list format' },
    { id: 'paragraph', label: 'Paragraph', icon: '¶', description: 'Flowing narrative summary' },
    { id: 'detailed', label: 'Detailed', icon: '📋', description: 'Comprehensive analysis' },
  ];

  const features = [
    { icon: Zap, title: 'Lightning Fast', description: 'Get summaries in seconds' },
    { icon: Target, title: 'Highly Accurate', description: 'AI-powered precision' },
    { icon: Clock, title: 'Save Time', description: 'Hours of reading in minutes' },
  ];

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setContent(''); // Clear content when file is selected
    }
  };

  const handleChooseFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setResult('');

    try {
      let response;
      if (inputType === 'text' || inputType === 'url') {
        if (!content.trim()) {
          throw new Error('Please enter valid content.');
        }
        const payload = {
          input_type: inputType,
          content: content.trim(),
          domain,
          format,
        };
        response = await fetch('/api/summarize', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
      } else if (inputType === 'file' || inputType === 'image') {
        if (!file) {
          throw new Error('Please select a file to upload.');
        }
        const formData = new FormData();
        formData.append('file', file);
        formData.append('domain', domain);
        formData.append('format', format);

        response = await fetch('/api/summarize/file', {
          method: 'POST',
          body: formData,
        });
      } else {
        throw new Error('Invalid input type.');
      }

      // Read response text once
      const responseText = await response.text();

      if (!response.ok) {
        try {
          const errorData = JSON.parse(responseText);
          throw new Error(errorData.detail || 'Failed to get summary.');
        } catch {
          throw new Error(responseText);
        }
      }

      try {
        const data = JSON.parse(responseText);
        setResult(data.summary);
      } catch {
        throw new Error(`Unexpected response: ${responseText}`);
      }
    } catch (error) {
      setResult(`<p class="text-red-600 font-semibold">Error: ${error.message}</p>`);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    const textContent = result.replace(/<[^>]*>/g, '');
    navigator.clipboard.writeText(textContent);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-6 w-6 text-primary-500" />
            <span className="text-primary-600 font-medium">AI-Powered Summarization</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 font-heading gradient-text">
            Summarize Your Content
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transform lengthy documents, articles, and texts into clear, concise summaries in seconds.
          </p>
        </div>

        {/* Features Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-soft animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="p-2 bg-primary-100 rounded-lg">
                  <Icon className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
          {/* Input Section */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {/* Input Type Selection */}
            <div className="mb-8">
              <label className="block text-lg font-semibold text-gray-900 mb-4 font-heading">
                Choose Input Type
              </label>
              <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-2 gap-4">
                {inputTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => {
                      setInputType(type.id);
                      setContent('');
                      setFile(null);
                      setResult('');
                    }}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      inputType === type.id
                        ? 'border-primary-500 bg-primary-50 shadow-glow'
                        : 'border-gray-200 hover:border-primary-300 bg-white'
                    }`}
                  >
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-3 bg-gradient-to-r ${type.color} text-white`}>
                      {type.icon}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">{type.label}</h3>
                    <p className="text-sm text-gray-600">{type.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Content Input */}
              <div className="card p-6">
                <label className="block text-lg font-semibold text-gray-900 mb-4 font-heading">
                  {inputType === 'text' && 'Enter Your Text'}
                  {inputType === 'file' && 'Upload Document'}
                  {inputType === 'url' && 'Enter URL'}
                  {inputType === 'image' && 'Upload Image'}
                </label>
                
                {inputType === 'text' && (
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full h-48 p-4 border border-gray-300 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300 resize-none"
                    placeholder="Paste your text here... (minimum 100 characters for best results)"
                  />
                )}
                
                {(inputType === 'file' || inputType === 'image') && (
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-primary-400 transition-colors duration-300 bg-gray-50 cursor-pointer" onClick={handleChooseFileClick}>
                    <Upload className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                    <p className="text-lg font-medium text-gray-700 mb-2">
                      Drag and drop your {inputType === 'file' ? 'document' : 'image'}
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                      or click to browse files
                    </p>
                    <button type="button" className="btn-secondary" onClick={handleChooseFileClick}>
                      Choose File
                    </button>
                    <input type="file" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
                    {file && <p className="mt-2 text-gray-700">Selected file: {file.name}</p>}
                  </div>
                )}
                
                {inputType === 'url' && (
                  <input
                    type="url"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full p-4 border border-gray-300 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300"
                    placeholder="https://example.com/article"
                  />
                )}
              </div>

              {/* Domain Selection */}
              <div className="card p-6">
                <label className="block text-lg font-semibold text-gray-900 mb-4 font-heading">
                  Select Domain
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-2 gap-3">
                  {domains.map((d) => (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => setDomain(d.id)}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                        domain === d.id
                          ? 'border-primary-500 bg-primary-50 shadow-glow'
                          : 'border-gray-200 hover:border-primary-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{d.icon}</span>
                        <div>
                          <h3 className="font-semibold text-gray-900">{d.label}</h3>
                          <p className="text-sm text-gray-600">{d.tag}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Format Selection */}
              <div className="card p-6">
                <label className="block text-lg font-semibold text-gray-900 mb-4 font-heading">
                  Choose Format
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {formats.map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setFormat(f.id)}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                        format === f.id
                          ? 'border-primary-500 bg-primary-50 shadow-glow'
                          : 'border-gray-200 hover:border-primary-300 bg-white'
                      }`}
                    >
                      <div className="text-2xl mb-2">{f.icon}</div>
                      <h3 className="font-semibold text-gray-900 mb-1">{f.label}</h3>
                      <p className="text-sm text-gray-600">{f.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || (inputType !== 'file' && inputType !== 'image' && !content.trim()) || (inputType === 'file' || inputType === 'image') && !file}
                className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 ${
                  isLoading || (inputType !== 'file' && inputType !== 'image' && !content.trim()) || (inputType === 'file' || inputType === 'image') && !file
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'btn-primary'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Analyzing Content...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <Sparkles className="h-5 w-5" />
                    Generate Summary
                  </div>
                )}
              </button>
            </form>
          </div>

          {/* Result Section */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold font-heading text-gray-900">Summary Result</h2>
                {result && (
                  <div className="flex gap-2">
                    <button
                      onClick={copyToClipboard}
                      className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                      title="Copy to clipboard"
                    >
                      <Copy className="h-5 w-5" />
                    </button>
                    <button
                      className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                      title="Download summary"
                    >
                      <Download className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </div>
              
              <div className="card p-8 min-h-[600px]">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-500 mb-6"></div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Processing Your Content</h3>
                    <p className="text-gray-600">Our AI is analyzing and summarizing your text...</p>
                  </div>
                ) : result ? (
                  <div className="prose prose-lg max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: result }} />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                      <FileText className="h-12 w-12 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready to Summarize</h3>
                    <p className="text-gray-600">Enter your content and click "Generate Summary" to get started.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summarize;
