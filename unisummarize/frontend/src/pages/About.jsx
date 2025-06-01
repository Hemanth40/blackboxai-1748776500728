import { Brain, Shield, Zap, Users, Target, Award, Globe, Heart, Lightbulb, Lock, Accessibility } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: 'Smart Summarization',
      description: 'Our advanced AI algorithms understand context and key information to create meaningful, accurate summaries.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Privacy First',
      description: 'All processing happens securely. Your data is protected with enterprise-grade security measures.',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: 'Lightning Fast',
      description: 'Get instant summaries of your content, no matter the format or length, in just seconds.',
      color: 'from-yellow-500 to-orange-500',
    },
  ];

  const team = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Lead AI Researcher',
      bio: 'PhD in Natural Language Processing with 10+ years of experience in text summarization and machine learning.',
      avatar: '👩‍🔬',
      expertise: ['NLP', 'Machine Learning', 'Research'],
    },
    {
      name: 'Michael Chen',
      role: 'Senior Software Engineer',
      bio: 'Specialized in building scalable web applications and AI-powered tools with modern technologies.',
      avatar: '👨‍💻',
      expertise: ['Full Stack', 'AI Integration', 'Cloud Architecture'],
    },
    {
      name: 'Emma Rodriguez',
      role: 'UX Designer',
      bio: 'Passionate about creating intuitive and accessible user experiences that make complex tools simple.',
      avatar: '👩‍🎨',
      expertise: ['UI/UX Design', 'User Research', 'Accessibility'],
    },
  ];

  const values = [
    {
      icon: <Lightbulb className="h-6 w-6" />,
      title: 'Innovation',
      description: 'We continuously improve our algorithms and user experience to provide the best summarization tool possible.',
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: 'Privacy',
      description: 'Your data security is our top priority. We process everything securely and never compromise your privacy.',
    },
    {
      icon: <Accessibility className="h-6 w-6" />,
      title: 'Accessibility',
      description: 'We believe everyone should have access to tools that make information processing easier and more efficient.',
    },
  ];

  const stats = [
    { number: '50K+', label: 'Documents Processed', icon: Brain },
    { number: '10K+', label: 'Happy Users', icon: Users },
    { number: '99.9%', label: 'Accuracy Rate', icon: Target },
    { number: '5+', label: 'Languages Supported', icon: Globe },
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
              About 
              <span className="block bg-gradient-to-r from-accent-300 to-accent-100 bg-clip-text text-transparent">
                UniSummarize
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 leading-relaxed max-w-3xl mx-auto">
              We're on a mission to make information more accessible by transforming lengthy content
              into clear, concise summaries that save you time and boost productivity.
            </p>
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
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-2xl mb-4">
                    <Icon className="h-8 w-8 text-primary-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 font-heading gradient-text">Our Mission</h2>
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                In today's fast-paced world, we're overwhelmed with information. UniSummarize was
                created to help students, professionals, and researchers save time and increase
                productivity by quickly understanding the essence of any content.
              </p>
              <p>
                We believe in making knowledge more accessible through cutting-edge AI technology while maintaining
                the highest standards of privacy, security, and user experience.
              </p>
              <p>
                Our vision is to become the world's most trusted and efficient text summarization platform,
                empowering millions of users to process information faster and make better decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-heading gradient-text">
              What Sets Us Apart
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the unique features that make UniSummarize the preferred choice for intelligent text summarization.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card card-hover p-8 text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${feature.color} rounded-2xl text-white mb-6`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-4 font-heading text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-heading gradient-text">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The brilliant minds behind UniSummarize, dedicated to revolutionizing how you process information.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="card card-hover p-8 text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-6xl mb-6">{member.avatar}</div>
                <h3 className="text-xl font-semibold mb-2 font-heading text-gray-900">{member.name}</h3>
                <p className="text-primary-600 font-medium mb-4">{member.role}</p>
                <p className="text-gray-600 mb-6 leading-relaxed">{member.bio}</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {member.expertise.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="container-custom">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-heading">Our Core Values</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              The principles that guide everything we do and shape our commitment to excellence.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-500/20 rounded-xl mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 font-heading">{value.title}</h3>
                <p className="text-gray-300 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recognition Section */}
      <section className="section-padding bg-white">
        <div className="container-custom text-center">
          <div className="max-w-4xl mx-auto animate-fade-in-up">
            <div className="inline-flex items-center gap-2 mb-6">
              <Award className="h-6 w-6 text-primary-500" />
              <span className="text-primary-600 font-medium">Recognition & Awards</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 font-heading gradient-text">
              Trusted by Thousands
            </h2>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              UniSummarize has been recognized for its innovation in AI-powered text processing and 
              commitment to user privacy. Join the growing community of users who trust us with their 
              most important documents.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex items-center gap-2 px-6 py-3 bg-gray-100 rounded-xl">
                <Heart className="h-5 w-5 text-red-500" />
                <span className="font-medium text-gray-700">4.9/5 User Rating</span>
              </div>
              <div className="flex items-center gap-2 px-6 py-3 bg-gray-100 rounded-xl">
                <Shield className="h-5 w-5 text-green-500" />
                <span className="font-medium text-gray-700">SOC 2 Compliant</span>
              </div>
              <div className="flex items-center gap-2 px-6 py-3 bg-gray-100 rounded-xl">
                <Globe className="h-5 w-5 text-blue-500" />
                <span className="font-medium text-gray-700">Global Reach</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
