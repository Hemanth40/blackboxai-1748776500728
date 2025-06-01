import { useState } from 'react';
import { Star, MessageSquare, ThumbsUp, ThumbsDown, Mail, Github, Heart, Sparkles, Send } from 'lucide-react';

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isHelpful, setIsHelpful] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [category, setCategory] = useState('general');

  const categories = [
    { id: 'general', label: 'General Feedback', icon: '💭' },
    { id: 'feature', label: 'Feature Request', icon: '💡' },
    { id: 'bug', label: 'Bug Report', icon: '🐛' },
    { id: 'improvement', label: 'Improvement', icon: '⚡' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement feedback submission to backend
    setIsSubmitted(true);
  };

  const renderStars = () => {
    return [...Array(5)].map((_, index) => (
      <button
        key={index}
        type="button"
        onClick={() => setRating(index + 1)}
        className="focus:outline-none transform transition-transform hover:scale-110"
      >
        <Star
          className={`h-8 w-8 ${
            index < rating ? 'fill-primary-500 text-primary-500' : 'text-gray-300'
          } transition-colors duration-300`}
        />
      </button>
    ));
  };

  if (isSubmitted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-gray-50">
        <div className="card p-12 text-center max-w-lg mx-auto animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-100 rounded-full mb-8">
            <Heart className="h-10 w-10 text-primary-500 animate-pulse" />
          </div>
          <h2 className="text-3xl font-bold mb-4 font-heading gradient-text">Thank You!</h2>
          <p className="text-gray-600 text-lg mb-8">
            Your feedback helps us improve UniSummarize for everyone. We truly appreciate your input!
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
              <span className="text-accent-300 font-medium">Share Your Thoughts</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-8 font-heading">
              Your Feedback 
              <span className="block bg-gradient-to-r from-accent-300 to-accent-100 bg-clip-text text-transparent">
                Makes Us Better
              </span>
            </h1>
            <p className="text-xl text-white/80 leading-relaxed max-w-3xl mx-auto">
              Help us improve UniSummarize by sharing your experience and suggestions. 
              Your input directly shapes our future updates.
            </p>
          </div>
        </div>
      </section>

      {/* Feedback Form */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSubmit} className="card p-8 space-y-12 animate-fade-in-up">
              {/* Category Selection */}
              <div>
                <label className="block text-lg font-semibold mb-6 font-heading text-gray-900">
                  What type of feedback do you have?
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setCategory(cat.id)}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 text-center ${
                        category === cat.id
                          ? 'border-primary-500 bg-primary-50 shadow-glow'
                          : 'border-gray-200 hover:border-primary-300 bg-white'
                      }`}
                    >
                      <div className="text-3xl mb-2">{cat.icon}</div>
                      <div className="text-sm font-medium text-gray-900">{cat.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Star Rating */}
              <div>
                <label className="block text-lg font-semibold mb-6 font-heading text-gray-900">
                  How would you rate your experience?
                </label>
                <div className="flex gap-3 justify-center bg-white p-6 rounded-xl border border-gray-200">
                  {renderStars()}
                </div>
              </div>

              {/* Helpful Question */}
              <div>
                <label className="block text-lg font-semibold mb-6 font-heading text-gray-900">
                  Were the summaries helpful?
                </label>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setIsHelpful(true)}
                    className={`flex items-center gap-3 px-6 py-3 rounded-xl border-2 transition-all duration-300 ${
                      isHelpful === true
                        ? 'border-primary-500 bg-primary-50 text-primary-700 shadow-glow'
                        : 'border-gray-200 hover:border-primary-300 bg-white text-gray-700'
                    }`}
                  >
                    <ThumbsUp className="h-5 w-5" />
                    Yes
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsHelpful(false)}
                    className={`flex items-center gap-3 px-6 py-3 rounded-xl border-2 transition-all duration-300 ${
                      isHelpful === false
                        ? 'border-primary-500 bg-primary-50 text-primary-700 shadow-glow'
                        : 'border-gray-200 hover:border-primary-300 bg-white text-gray-700'
                    }`}
                  >
                    <ThumbsDown className="h-5 w-5" />
                    No
                  </button>
                </div>
              </div>

              {/* Detailed Feedback */}
              <div>
                <label className="block text-lg font-semibold mb-6 font-heading text-gray-900">
                  Share your thoughts with us
                </label>
                <div className="relative">
                  <MessageSquare className="absolute top-4 left-4 h-5 w-5 text-gray-400" />
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="What did you like? What could be improved?"
                    className="w-full h-40 pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300 resize-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn-primary w-full py-4 text-lg flex items-center justify-center gap-2"
              >
                <Send className="h-5 w-5" />
                Submit Feedback
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Additional Contact Methods */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-heading gradient-text">
              Other Ways to Reach Us
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Have a specific question or concern? We're always here to help through various channels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="card card-hover p-8 text-center">
              <Mail className="h-10 w-10 text-primary-500 mx-auto mb-6" />
              <h3 className="text-xl font-semibold mb-4 font-heading text-gray-900">Email Support</h3>
              <p className="text-gray-600 mb-6">
                Get in touch with our support team for personalized assistance
              </p>
              <a
                href="mailto:support@unisummarize.com"
                className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
              >
                support@unisummarize.com
              </a>
            </div>

            <div className="card card-hover p-8 text-center">
              <Github className="h-10 w-10 text-primary-500 mx-auto mb-6" />
              <h3 className="text-xl font-semibold mb-4 font-heading text-gray-900">GitHub Issues</h3>
              <p className="text-gray-600 mb-6">
                Report technical issues or contribute to our open source project
              </p>
              <a
                href="https://github.com/unisummarize/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
              >
                Visit GitHub Repository
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Feedback;
