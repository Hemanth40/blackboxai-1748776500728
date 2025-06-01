import { FileText, Brain, CheckCircle, ArrowRight, Upload, Zap, Shield, Eye, Lock, Server, Cpu, Globe } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: <Upload className="h-8 w-8" />,
      title: 'Input Processing',
      step: '01',
      description: 'Your content is intelligently processed based on the input type you choose',
      details: [
        'Text input is cleaned and normalized for optimal processing',
        'Documents are parsed and text is extracted with high accuracy',
        'URLs are scraped for relevant content while respecting privacy',
        'Images are processed using advanced OCR technology',
      ],
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: 'AI Analysis',
      step: '02',
      description: 'Our advanced AI algorithms analyze content structure and extract meaning',
      details: [
        'Natural Language Processing identifies key concepts and themes',
        'TextRank algorithm determines sentence importance and relevance',
        'Domain-specific processing adapts to specialized content types',
        'Context preservation ensures accurate and meaningful summarization',
      ],
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: <CheckCircle className="h-8 w-8" />,
      title: 'Summary Generation',
      step: '03',
      description: 'A polished summary is generated according to your preferences',
      details: [
        'Bullet points format for quick overview and scanning',
        'Paragraph form maintains narrative flow and readability',
        'Detailed structure provides comprehensive understanding',
        'Quality checks ensure accuracy, coherence, and completeness',
      ],
      color: 'from-green-500 to-emerald-500',
    },
  ];

  const technologies = [
    {
      name: 'Advanced NLP',
      description: 'State-of-the-art natural language processing for deep content understanding',
      icon: <Brain className="h-6 w-6" />,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      name: 'TextRank Algorithm',
      description: 'Sophisticated ranking system that identifies the most important sentences',
      icon: <Zap className="h-6 w-6" />,
      color: 'bg-yellow-100 text-yellow-600',
    },
    {
      name: 'OCR Technology',
      description: 'Cutting-edge optical character recognition for image-to-text conversion',
      icon: <Eye className="h-6 w-6" />,
      color: 'bg-purple-100 text-purple-600',
    },
    {
      name: 'Domain Models',
      description: 'Specialized AI models trained for different content domains and industries',
      icon: <Cpu className="h-6 w-6" />,
      color: 'bg-green-100 text-green-600',
    },
  ];

  const securityFeatures = [
    {
      icon: <Lock className="h-5 w-5" />,
      title: 'End-to-End Encryption',
      description: 'All data is encrypted during transmission and processing',
    },
    {
      icon: <Server className="h-5 w-5" />,
      title: 'No Data Storage',
      description: 'We never store your content on our servers',
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: 'Privacy First',
      description: 'Your documents remain completely private and secure',
    },
    {
      icon: <Globe className="h-5 w-5" />,
      title: 'GDPR Compliant',
      description: 'Full compliance with international privacy regulations',
    },
  ];

  return (
    <div className="min-h-screen pt-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-bg-primary text-white section-padding">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-bounce-gentle"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-bounce-gentle" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="container-custom relative z-10 text-center">
          <div className="max-w-4xl mx-auto animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-bold mb-8 font-heading">
              How 
              <span className="block bg-gradient-to-r from-accent-300 to-accent-100 bg-clip-text text-transparent">
                UniSummarize Works
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 leading-relaxed max-w-3xl mx-auto">
              Discover the advanced technology and intelligent processes behind our 
              state-of-the-art text summarization platform.
            </p>
          </div>
        </div>
      </section>

      {/* Process Flow */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-heading gradient-text">
              Three Simple Steps
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our streamlined process transforms your content into clear, actionable summaries in seconds.
            </p>
          </div>

          <div className="space-y-24">
            {steps.map((step, index) => (
              <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 animate-fade-in-up`} style={{ animationDelay: `${index * 0.2}s` }}>
                {/* Content */}
                <div className="lg:w-1/2 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${step.color} rounded-2xl text-white`}>
                      {step.icon}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-primary-600 mb-1">Step {step.step}</div>
                      <h3 className="text-3xl font-bold font-heading text-gray-900">{step.title}</h3>
                    </div>
                  </div>
                  <p className="text-xl text-gray-600 leading-relaxed">{step.description}</p>
                  <ul className="space-y-4">
                    {step.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <ArrowRight className="h-5 w-5 text-primary-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Visual */}
                <div className="lg:w-1/2">
                  <div className="card p-12 text-center">
                    <div className={`inline-flex items-center justify-center w-32 h-32 bg-gradient-to-r ${step.color} rounded-3xl text-white mb-6 mx-auto`}>
                      {step.icon}
                    </div>
                    <div className="text-6xl font-bold text-gray-200 mb-4">{step.step}</div>
                    <h4 className="text-xl font-semibold text-gray-900">{step.title}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-heading gradient-text">
              Powered by Advanced Technology
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We leverage cutting-edge AI and machine learning technologies to deliver the most accurate and efficient summarization.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="card card-hover p-8 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 ${tech.color} rounded-xl mb-6`}>
                  {tech.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 font-heading text-gray-900">{tech.name}</h3>
                <p className="text-gray-600 leading-relaxed">{tech.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy & Security Section */}
      <section className="section-padding bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="container-custom">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 mb-4">
              <Shield className="h-6 w-6 text-primary-400" />
              <span className="text-primary-400 font-medium">Security & Privacy</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-heading">
              Your Data is Safe with Us
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We've built UniSummarize with privacy-first principles and enterprise-grade security measures 
              to ensure your content remains completely secure and confidential.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {securityFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-500/20 rounded-xl mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="card bg-white/5 backdrop-blur-sm border border-white/10 p-8 animate-fade-in-up">
            <h3 className="text-2xl font-bold mb-6 font-heading text-center">Privacy Guarantee</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-primary-400 mb-2">0</div>
                <p className="text-gray-300">Data Storage</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-400 mb-2">100%</div>
                <p className="text-gray-300">Local Processing</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-400 mb-2">∞</div>
                <p className="text-gray-300">Privacy Protection</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-white">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-heading gradient-text">
              Ready to Experience the Magic?
            </h2>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              Now that you understand how UniSummarize works, try it yourself and see 
              the power of intelligent summarization in action.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/summarize"
                className="btn-primary text-lg px-8 py-4 inline-flex items-center gap-2 group"
              >
                Try UniSummarize Now
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="/about"
                className="btn-secondary text-lg px-8 py-4"
              >
                Learn More About Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
