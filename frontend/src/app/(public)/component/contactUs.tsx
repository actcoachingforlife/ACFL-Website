import { Mail, Phone, MapPin } from "lucide-react";
import ContactForm from "./ContactForm";

const Contact = () => {
  return (
    <section className="bg-gray-50 min-h-screen flex flex-col items-center justify-center px-4 py-16">
        <div className="max-w-7xl mx-auto px-6 py-12">
           <div className="flex flex-col md:flex-row justify-between gap-8 mb-12">
             {/* Header Section */}
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-2">Connect</p>
              <h1 className="text-4xl font-bold text-gray-900 mb-3">Contact us</h1>
              <p className="text-gray-600">
                  We're here to support your journey towards personal and professional
                  growth
              </p>
            </div>

            {/* Contact Info Section */}
            <div>
              <div className="space-y-6">
                  <div className="flex items-start gap-3">
                  <Mail className="text-gray-700 mt-1" />
                  <div>
                      <h2 className="font-semibold text-gray-900">Email</h2>
                      <p className="text-gray-600">support@actcoaching.com</p>
                  </div>
                  </div>
                  <div className="flex items-start gap-3">
                  <Phone className="text-gray-700 mt-1" />
                  <div>
                      <h2 className="font-semibold text-gray-900">Phone</h2>
                      <p className="text-gray-600">+1 (888) 234-5678</p>
                  </div>
                  </div>
                  <div className="flex items-start gap-3">
                  <MapPin className="text-gray-700 mt-1" />
                  <div>
                      <h2 className="font-semibold text-gray-900">Office</h2>
                      <p className="text-gray-600">
                      Level 5, 123 Business Street, Sydney NSW 2000
                      </p>
                  </div>
                  </div>
              </div>
            </div>
           </div>

           {/* Contact Form and Map Section */}
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
             {/* Contact Form */}
             <div className="flex justify-center">
               <ContactForm />
             </div>

             {/* Google Maps */}
             <div className="overflow-hidden shadow-lg rounded-lg">
                 <iframe
                     src="https://maps.google.com/maps?q=Level+5,+123+Business+Street,+Sydney+NSW+2000&output=embed"
                     width="100%"
                     height="100%"
                     style={{ border: 0, minHeight: '500px' }}
                     allowFullScreen
                     loading="lazy"
                     referrerPolicy="no-referrer-when-downgrade"
                     title="Level 5, 123 Business Street, Sydney NSW 2000"
                     className="w-full"
                 />
             </div>
           </div>
        </div>
    </section>
  );
};

export default Contact;
