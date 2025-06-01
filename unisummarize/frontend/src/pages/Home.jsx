import { Link } from 'react-router-dom';
import { FileText, Globe, Image, Type, ArrowRight, Sparkles, Zap, Shield, Users } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: <Type className="h-8 w-8" />,
      title: 'Text Input',
      description: 'Paste any text directly and get instant summaries with AI precision',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: 'Document Upload',
      description: 'Support for PDF, Word, and various document formats',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: 'URL Processing',
      description: 'Extract and summarize content from any webpage instantly',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: <Image className="h-8 w-8" />,
      title: 'Image OCR',
      description: 'Extract text from images using advanced OCR technology',
      color: 'from-orange-500 to-red-500',
    },
  ];

  const domains = [
    {
      name: 'Academic',
      description: 'Perfect for students and researchers',
      tag: 'StudySummarizer',
      icon: '🎓',
      stats: '10K+ papers',
    },
    {
      name: 'Legal',
      description: 'Simplify complex legal documents',
      tag: 'LegalBrev',
      icon: '⚖️',
      stats: '5K+ docs',
    },
    {
      name: 'Medical',
      description: 'Summarize medical research and reports',
      tag: 'MedDigest',
      icon: '🏥',
      stats: '8K+ reports',
    },
    {
      name: 'Research',
      description: 'Condense academic papers and studies',
      tag: 'ResearchBrevio',
      icon: '🔬',
      stats: '15K+ studies',
    },
    {
      name: 'Corporate',
      description: 'Streamline business documents',
      tag: 'MailBrev',
      icon: '💼',
      stats: '20K+ emails',
    },
  ];

  const stats = [
    { number: '50K+', label: 'Documents Summarized', icon: FileText },
    { number: '10K+', label: 'Happy Users', icon: Users },
    { number: '99.9%', label: 'Uptime', icon: Shield },
    { number: '5sec', label: 'Average Speed', icon: Zap },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-bg-primary text-white section-padding pt-32">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-bounce-gentle"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-bounce-gentle" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="container-custom relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-6 animate-fade-in-down">
              <Sparkles className="h-6 w-6 text-accent-300" />
              <span className="text-accent-300 font-medium">AI-Powered Summarization</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-8 font-heading animate-fade-in-up">
              Transform Long Text into
              <span className="block bg-gradient-to-r from-accent-300 to-accent-100 bg-clip-text text-transparent">
                Clear Summaries
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-12 text-white/80 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Your intelligent, multi-mode text summarization tool designed for students, 
              professionals, and researchers who value their time.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <Link
                to="/summarize"
                className="group bg-white text-primary-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-large flex items-center gap-2"
              >
                Try Now for Free
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/how-it-works"
                className="text-white border-2 border-white/30 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/10 transition-all duration-300"
              >
                How It Works
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-xl mb-4">
                    <Icon className="h-6 w-6 text-primary-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-heading gradient-text">
              Multiple Input Methods
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from various input methods to suit your workflow and get instant, accurate summaries.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card card-hover p-8 text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl text-white mb-6`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 font-heading text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Domains Section */}
      <section className="section-padding bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="container-custom">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-heading">
              Specialized for Every Domain
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our AI understands context and terminology across different fields to provide accurate summaries.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {domains.map((domain, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:scale-105 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-3xl">{domain.icon}</span>
                  <div>
                    <h3 className="text-xl font-semibold font-heading">{domain.name}</h3>
                    <span className="text-sm text-gray-400">{domain.stats}</span>
                  </div>
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">{domain.description}</p>
                <span className="inline-block bg-primary-500/20 text-primary-300 px-4 py-2 rounded-full text-sm font-medium">
                  {domain.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-white">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-heading gradient-text">
              Ready to Start Summarizing?
            </h2>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              Join thousands of users who save hours every day with our intelligent summarization tool. 
              Try it now and experience the difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/summarize"
                className="btn-primary text-lg px-8 py-4 inline-flex items-center gap-2 group"
              >
                Get Started Now
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/about"
                className="btn-secondary text-lg px-8 py-4"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
