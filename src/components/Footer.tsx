import { Link } from 'react-router-dom';
import { Row, Col, Tooltip, Button, notification } from 'antd';
import { 
  GithubOutlined, 
  MailOutlined, 
  PhoneOutlined, 
  LinkedinOutlined, 
  MediumOutlined, 
  PlayCircleOutlined,
  TwitterOutlined,
  InstagramOutlined,
  HeartFilled,
  RocketOutlined,
  CodeOutlined,
  GlobalOutlined,
  ArrowRightOutlined
} from '@ant-design/icons';
import { useState } from 'react';

interface SocialLink {
  icon: React.ReactNode;
  link: string;
  name: string;
  color: string;
}

const socialLinks: SocialLink[] = [
  { 
    icon: <GithubOutlined />, 
    link: 'https://github.com/almesty21', 
    name: 'GitHub',
    color: 'hover:text-gray-400'
  },
  { 
    icon: <LinkedinOutlined />, 
    link: 'https://linkedin.com/in/almesty', 
    name: 'LinkedIn',
    color: 'hover:text-blue-400'
  },
  { 
    icon: <TwitterOutlined />, 
    link: 'https://twitter.com/almesty', 
    name: 'Twitter',
    color: 'hover:text-blue-500'
  },
  { 
    icon: <InstagramOutlined />, 
    link: 'https://instagram.com/almesty', 
    name: 'Instagram',
    color: 'hover:text-pink-500'
  },
  { 
    icon: <MediumOutlined />, 
    link: 'https://medium.com/@almesty', 
    name: 'Medium',
    color: 'hover:text-green-400'
  },
  { 
    icon: <PlayCircleOutlined />, 
    link: 'https://youtube.com/almesty', 
    name: 'YouTube',
    color: 'hover:text-red-500'
  },
];

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      notification.success({
        message: 'Welcome to the Club! 🎉',
        description: "You've joined our exclusive newsletter community.",
        placement: 'bottomRight',
      });
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 5000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-black to-blue-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-500"></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative container mx-auto px-4 py-16">
        <Row gutter={[48, 32]} className="max-w-7xl mx-auto">
          {/* Brand & Social Section */}
          <Col xs={24} lg={8} className="space-y-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <RocketOutlined className="text-white text-lg" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                BekyWeb
              </span>
            </div>
            
            <p className="text-gray-300 text-lg leading-relaxed">
              Crafting digital experiences that inspire and transform. Let's build the future together.
            </p>
            
            {/* Newsletter Subscription */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
              <h4 className="font-semibold text-white mb-3 flex items-center">
                <MailOutlined className="mr-2 text-blue-400" />
                Stay in the Loop
              </h4>
              {isSubscribed ? (
                <div className="text-center py-4">
                  <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <HeartFilled className="text-green-400 text-xl" />
                  </div>
                  <p className="text-green-400 font-medium">Welcome aboard! 🚀</p>
                  <p className="text-gray-400 text-sm mt-1">Check your inbox for magic.</p>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-3">
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 bg-gray-900/80 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <Button
                    htmlType="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-none text-white font-semibold py-3 h-auto rounded-xl flex items-center justify-center space-x-2"
                  >
                    <span>Join Newsletter</span>
                    <ArrowRightOutlined />
                  </Button>
                </form>
              )}
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 pt-4">
              {socialLinks.map((social) => (
                <Tooltip key={social.name} title={social.name} color="blue">
                  <a
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl flex items-center justify-center text-lg transition-all duration-300 transform hover:scale-110 hover:shadow-lg ${social.color}`}
                  >
                    {social.icon}
                  </a>
                </Tooltip>
              ))}
            </div>
          </Col>

          {/* Quick Links */}
          <Col xs={24} sm={12} lg={5} className="space-y-6">
            <h4 className="text-lg font-bold text-white flex items-center">
              <CodeOutlined className="mr-2 text-blue-400" />
              Navigation
            </h4>
            <div className="space-y-4">
              {['Home', 'About', 'Projects', 'Blog', 'Contact'].map((item) => (
                <Link
                  key={item}
                  to={`/${item.toLowerCase()}`}
                  className="block text-gray-300 hover:text-white transition-all duration-300 transform hover:translate-x-2 group"
                >
                  <span className="group-hover:text-blue-400">{item}</span>
                </Link>
              ))}
            </div>
          </Col>

          {/* Services */}
          <Col xs={24} sm={12} lg={5} className="space-y-6">
            <h4 className="text-lg font-bold text-white flex items-center">
              <RocketOutlined className="mr-2 text-green-400" />
              Services
            </h4>
            <div className="space-y-4">
              {['Web Development', 'Mobile Apps', 'UI/UX Design', 'Consulting', 'AI Solutions'].map((service) => (
                <a
                  key={service}
                  href="#"
                  className="block text-gray-300 hover:text-white transition-all duration-300 transform hover:translate-x-2 group"
                >
                  <span className="group-hover:text-green-400">{service}</span>
                </a>
              ))}
            </div>
          </Col>

          {/* Contact Info */}
          <Col xs={24} sm={12} lg={6} className="space-y-6">
            <h4 className="text-lg font-bold text-white flex items-center">
              <GlobalOutlined className="mr-2 text-purple-400" />
              Get In Touch
            </h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 group cursor-pointer">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                  <PhoneOutlined className="text-blue-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Phone</p>
                  <p className="text-white group-hover:text-blue-400 transition-colors">+251 912 345 678</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 group cursor-pointer">
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                  <MailOutlined className="text-green-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Email</p>
                  <p className="text-white group-hover:text-green-400 transition-colors">hello@bekyweb.com</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 group">
                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center group-hover:bg-purple-500/30 transition-colors">
                  <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Location</p>
                  <p className="text-white group-hover:text-purple-400 transition-colors">Addis Ababa, Ethiopia</p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-gray-800/50 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
            <div className="text-center lg:text-left">
              <p className="text-gray-400">
                © {new Date().getFullYear()} BekyWeb Portfolio. All rights reserved.
              </p>
            </div>
            
            <div className="flex items-center space-x-6 text-gray-400">
              <a href="#" className="hover:text-white transition-colors text-sm">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors text-sm">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors text-sm">Cookies</a>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-gray-400">Crafted with</span>
              <HeartFilled className="text-red-500 animate-pulse" />
              <span className="text-gray-400">by</span>
              <span className="text-blue-400 font-semibold">Mihretab</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 z-50 border border-white/10"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </footer>
  );
};

export default Footer;