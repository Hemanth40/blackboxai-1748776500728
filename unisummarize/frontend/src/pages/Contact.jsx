import { useState } from 'react';
import { Mail, Github, Twitter, MapPin, Phone, Clock, Send, Sparkles, MessageSquare, User, AtSign, FileText } from 'lucide-react';

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });

  const contactMethods = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: 'Email',
      description: 'Drop us a line anytime',
      contact: 'contact@unisummarize.com',
      link: 'mailto:contact@unisummarize.com',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: <Github className="h-6 w-6" />,
      title: 'GitHub',
      description: 'Follow our open source journey',
      contact: '@unisummarize',
      link: 'https://github.com/unisummarize',
      color: 'from-gray-700 to-gray-900',
    },
    {
      icon: <Twitter className="h-6 w-6" />,
      title: 'Twitter',
      description: 'Get the latest updates',
      contact: '@unisummarize',
      link: 'https://twitter.com/unisummarize',
      color: 'from-blue-400 to-blue-600',
    },
  ];

  const officeInfo = [
    {
      icon: <MapPin className="h-6 w-6" />,
      title: 'Location',
      description: '123 Innovation Street, Tech City, TC 12345',
      color: 'bg-red-100 text-red-600',
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: 'Phone',
      description: '+1 (555) 123-4567',
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: 'Office Hours',
      description: 'Monday - Friday: 9:00 AM - 5:00 PM EST',
      color: 'bg-blue-100 text-blue-600',
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement contact form submission
    setIsSubmitted(true);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-gray-50">
        <div className="card p-12 text-center max-w-lg mx-auto animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-100 rounded-full mb-8">
            <MessageSquare className="h-10 w-10 text-primary-500 animate-pulse" />
          </div>
          <h2 className="text-3xl font-bold mb-4 font-heading gradient-text">Message Sent!</h2>
          <p className="text-gray-600 text-lg mb-8">
            Thank you for reaching out. We'll get back to you as soon as possible.
          </p>
          <a
            href="/"
            className="btn-primary inline-flex items-center gap-2"
          >
            Back to Home
          </a>
        </div>
      </div>
    );
  }

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
            <div className="flex items-center justify-center gap-2 mb-6">
              <Sparkles className="h-6 w-6 text-accent-300" />
              <span className="text-accent-300 font-medium">Let's Connect</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-8 font-heading">
              Get in 
              <span className="block bg-gradient-to-r from-accent-300 to-accent-100 bg-clip-text text-transparent">
                Touch
              </span>
            </h1>
            <p className="text-xl text-white/80 leading-relaxed max-w-3xl mx-auto">
              Have questions or suggestions? We'd love to hear from you. 
              Our team is here to help and provide support.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => (
              <a
                key={index}
                href={method.link}
                target="_blank"
                rel="noopener noreferrer"
                className="card card-hover p-8 text-center group animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${method.color} rounded-2xl text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {method.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 font-heading text-gray-900">{method.title}</h3>
                <p className="text-gray-600 mb-3">{method.description}</p>
                <p className="text-primary-600 font-medium">{method.contact}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-4xl font-bold mb-6 font-heading gradient-text">Send Us a Message</h2>
              <p className="text-xl text-gray-600">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="card p-8 space-y-8 animate-fade-in-up">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-medium mb-3 text-gray-700">
                    First Name
                  </label>
                  <div className="relative">
                    <User className="absolute top-3 left-4 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-3 text-gray-700">
                    Last Name
                  </label>
                  <div className="relative">
                    <User className="absolute top-3 left-4 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-3 text-gray-700">
                  Email
                </label>
                <div className="relative">
                  <AtSign className="absolute top-3 left-4 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-3 text-gray-700">
                  Subject
                </label>
                <div className="relative">
                  <FileText className="absolute top-3 left-4 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-3 text-gray-700">
                  Message
                </label>
                <div className="relative">
                  <MessageSquare className="absolute top-4 left-4 h-5 w-5 text-gray-400" />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full h-40 pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300 resize-none"
                    required
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                className="btn-primary w-full py-4 text-lg flex items-center justify-center gap-2"
              >
                <Send className="h-5 w-5" />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Office Information */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl font-bold mb-6 font-heading gradient-text">Visit Our Office</h2>
            <p className="text-xl text-gray-600">
              Stop by our office during business hours to meet the team in person.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {officeInfo.map((info, index) => (
              <div
                key={index}
                className="card card-hover p-8 text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 ${info.color} rounded-2xl mb-6`}>
                  {info.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 font-heading text-gray-900">{info.title}</h3>
                <p className="text-gray-600">{info.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
