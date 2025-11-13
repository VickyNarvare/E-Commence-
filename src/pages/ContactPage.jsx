import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import { validateEmail } from '../utils/helpers';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!validateEmail(formData.email)) newErrors.email = 'Valid email is required';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  const contactInfo = [
    {
      icon: FiMail,
      title: 'Email Us',
      content: 'support@eliteshop.com',
      link: 'mailto:support@eliteshop.com'
    },
    {
      icon: FiPhone,
      title: 'Call Us',
      content: '+1 (555) 123-4567',
      link: 'tel:+15551234567'
    },
    {
      icon: FiMapPin,
      title: 'Visit Us',
      content: '123 Commerce Street, New York, NY 10001',
      link: 'https://maps.google.com'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-secondary-600 text-white py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h1 className="text-5xl font-bold mb-4">Get In Touch</h1>
            <p className="text-xl text-white/90">
              Have a question? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 -mt-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <a href={info.link} target={info.link.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer">
                  <Card className="text-center p-8 hover:scale-105 transition-transform cursor-pointer">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-full flex items-center justify-center">
                      <info.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{info.title}</h3>
                    <p className="text-gray-600">{info.content}</p>
                  </Card>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
                
                {isSubmitted && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800 font-medium">✓ Message sent successfully! We'll get back to you soon.</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <Input
                    label="Your Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    error={errors.name}
                    required
                  />

                  <Input
                    label="Email Address"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    error={errors.email}
                    required
                  />

                  <Input
                    label="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    error={errors.subject}
                    required
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="6"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all duration-200 outline-none resize-none"
                      required
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    fullWidth
                    size="lg"
                    icon={<FiSend />}
                  >
                    Send Message
                  </Button>
                </form>
              </Card>
            </motion.div>

            {/* Map & Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Map */}
              <Card className="overflow-hidden" padding="none">
                <div className="aspect-video bg-gray-200 relative">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    title="Office Location"
                  />
                </div>
              </Card>

              {/* Business Hours */}
              <Card className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Business Hours</h3>
                <div className="space-y-3">
                  {[
                    { days: 'Monday - Friday', hours: '9:00 AM - 6:00 PM' },
                    { days: 'Saturday', hours: '10:00 AM - 4:00 PM' },
                    { days: 'Sunday', hours: 'Closed' },
                  ].map((schedule, index) => (
                    <div key={index} className="flex justify-between text-gray-700">
                      <span className="font-medium">{schedule.days}</span>
                      <span>{schedule.hours}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* FAQ Link */}
              <Card className="p-8 bg-gradient-to-br from-primary-50 to-secondary-50">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Need Quick Answers?</h3>
                <p className="text-gray-700 mb-4">
                  Check out our FAQ page for instant answers to common questions.
                </p>
                <Button variant="outline">
                  View FAQs
                </Button>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
