import { Link } from 'react-router-dom';
import { BookOpen, Github, Twitter, Linkedin, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Product',
      links: [
        { name: 'Summarize', path: '/summarize' },
        { name: 'How It Works', path: '/how-it-works' },
        { name: 'About', path: '/about' },
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Contact', path: '/contact' },
        { name: 'Feedback', path: '/feedback' },
        { name: 'Help Center', path: '/help' },
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', path: '/privacy' },
        { name: 'Terms of Service', path: '/terms' },
        { name: 'Cookie Policy', path: '/cookies' },
      ]
    }
  ];

  const socialLinks = [
    { name: 'GitHub', icon: Github, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
    { name: 'Email', icon: Mail, href: 'mailto:contact@unisummarize.com' },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container-custom section-padding">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6 group">
              <div className="relative">
                <BookOpen className="h-8 w-8 text-primary-400 group-hover:text-primary-300 transition-colors" />
                <div className="absolute -inset-1 bg-primary-400/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-primary-300 bg-clip-text text-transparent font-heading">
                UniSummarize
              </span>
            </Link>
            <p className="text-gray-300 text-lg leading-relaxed mb-6 max-w-md">
              Transform lengthy content into clear, concise summaries with our AI-powered summarization tool. 
              Perfect for students, professionals, and researchers.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="p-3 bg-gray-800 hover:bg-primary-600 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-glow group"
                    aria-label={social.name}
                  >
                    <Icon className="h-5 w-5 text-gray-300 group-hover:text-white transition-colors" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold text-white mb-4 font-heading">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-gray-300 hover:text-primary-400 transition-colors duration-300 hover:translate-x-1 inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-semibold text-white mb-2 font-heading">
                Stay Updated
              </h3>
              <p className="text-gray-300">
                Get the latest updates and features delivered to your inbox.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300"
              />
              <button className="btn-primary whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-gray-300">
              <span>© {currentYear} UniSummarize. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-400 animate-bounce-gentle" />
              <span>for better productivity</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
