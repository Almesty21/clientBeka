// src/components/Contact/ContactForm.tsx
import { FormProvider } from 'react-hook-form';
import { Input } from '../Form/Input';
import { TextArea } from '../Form/TextArea';
import { Button } from '../Form/Button';
import { useContactReg } from '../../hooks/useContact';
import { 
  MessageOutlined, 
  RocketOutlined, 
  CheckCircleOutlined,
  UserOutlined,
  MailFilled,
  BulbOutlined,
  ThunderboltOutlined
} from '@ant-design/icons';

export const ContactForm: React.FC = () => {
  const formMethods = useContactReg();
  const { handleSubmit, onSubmit, loading, error, success } = formMethods;


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-blue-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto"> {/* Reduced from max-w-4xl to max-w-2xl */}

        {/* Premium Contact Form */}
        <div className="relative">
          {/* Glow Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-xl opacity-20 animate-pulse"></div>
          
          <div className="relative bg-gray-900 rounded-2xl shadow-xl border border-gray-800/50 overflow-hidden backdrop-blur-sm">
            {/* Form Header */}
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700/50 p-6 lg:p-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl mb-4 shadow-lg">
                  <MessageOutlined className="text-white text-2xl" />
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3">
                  Get In Touch
                </h2>
                <p className="text-gray-300">
                  Ready to start your project? We're here to help.
                </p>
              </div>
            </div>

            <div className="p-6 lg:p-8">
              {/* Success Message */}
              {success && (
                <div className="mb-4 p-4 bg-green-500/20 border border-green-500/30 rounded-xl backdrop-blur-sm">
                  <div className="flex items-center space-x-3">
                    <CheckCircleOutlined className="h-5 w-5 text-green-400 flex-shrink-0" />
                    <div>
                      <h3 className="text-sm font-semibold text-green-400 mb-1">
                        Message Sent!
                      </h3>
                      <p className="text-green-300 text-sm">
                        {success}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="mb-4 p-4 bg-red-500/20 border border-red-500/30 rounded-xl backdrop-blur-sm">
                  <div className="flex items-center space-x-3">
                    <svg className="h-5 w-5 text-red-400 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <h3 className="text-sm font-semibold text-red-400 mb-1">
                        Something went wrong
                      </h3>
                      <p className="text-red-300 text-sm">
                        {error}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Wrap with FormProvider */}
              <FormProvider {...formMethods}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="flex items-center text-sm font-medium text-gray-200">
                        <div className="w-6 h-6 bg-blue-500/20 rounded-lg flex items-center justify-center mr-2">
                          <UserOutlined className="text-blue-400 text-xs" />
                        </div>
                        Full Name *
                      </label>
                      <Input
                        type="text"
                        name="name"
                        placeholder="Your full name"
                        required
                        className="w-full px-3 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="flex items-center text-sm font-medium text-gray-200">
                        <div className="w-6 h-6 bg-green-500/20 rounded-lg flex items-center justify-center mr-2">
                          <MailFilled className="text-green-400 text-xs" />
                        </div>
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        name="email"
                        placeholder="your.email@example.com"
                        required
                        className="w-full px-3 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center text-sm font-medium text-gray-200">
                      <div className="w-6 h-6 bg-purple-500/20 rounded-lg flex items-center justify-center mr-2">
                        <BulbOutlined className="text-purple-400 text-xs" />
                      </div>
                      Subject *
                    </label>
                    <Input
                      type="text"
                      name="subject"
                      placeholder="What's this about?"
                      required
                      className="w-full px-3 py-3 bg-gray-800 border border-gray-700 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center text-sm font-medium text-gray-200">
                      <div className="w-6 h-6 bg-orange-500/20 rounded-lg flex items-center justify-center mr-2">
                        <MessageOutlined className="text-orange-400 text-xs" />
                      </div>
                      Your Message *
                    </label>
                    <TextArea
                      name="message"
                      placeholder="Tell us about your project and how we can help..."
                      rows={4}
                      required
                      className="w-full px-3 py-3 bg-gray-800 border border-gray-700 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none text-sm"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    loading={loading}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border-none relative overflow-hidden group mt-2"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    {loading ? (
                      <div className="flex items-center justify-center space-x-2 relative z-10">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span className="text-sm">Sending...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2 relative z-10">
                        <span>Send Message</span>
                        <RocketOutlined className="text-lg" />
                      </div>
                    )}
                  </Button>
                </form>
              </FormProvider>

              {/* Premium Footer Note */}
              <div className="mt-6 pt-4 border-t border-gray-700/50">
                <div className="flex items-center justify-center space-x-4 text-gray-400 text-sm">
                  <div className="flex items-center space-x-1">
                    <ThunderboltOutlined className="text-blue-400 text-xs" />
                    <span>Fast Response</span>
                  </div>
                  <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                  <div className="flex items-center space-x-1">
                    <CheckCircleOutlined className="text-green-400 text-xs" />
                    <span>24/7 Support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background Decorations */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute -top-40 -right-32 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-1000"></div>
        </div>
      </div>
    </div>
  );
};
