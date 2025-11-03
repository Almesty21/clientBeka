// src/pages/Contact/Contact.tsx
import { ContactForm } from '../../components/contact/ContactForm';
import { SocialLinks } from '../../components/contact/SocialLinks';

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white px-6 md:px-20 py-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-400 mb-8 text-center">
          Contact Me
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Contact Form - Takes 60% of the width */}
          <div className="lg:w-[60%] bg-black-900 p-8 shadow-2x">
            <ContactForm />
          </div>

          {/* Social Links - Takes 40% of the width, centered both ways */}
          <div className="lg:w-[40%] bg-black-900 p-8 rounded-xl shadow-2xl flex items-center">
            <div className="text-center w-full">
              <SocialLinks />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;