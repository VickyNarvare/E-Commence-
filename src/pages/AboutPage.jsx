import React from 'react';
import { motion } from 'framer-motion';
import { FiAward, FiHeart, FiTrendingUp, FiUsers } from 'react-icons/fi';
import Card from '../components/ui/Card';

const AboutPage = () => {
  const values = [
    {
      icon: FiAward,
      title: 'Quality First',
      description: 'We curate only the finest products from trusted brands worldwide.'
    },
    {
      icon: FiHeart,
      title: 'Customer Focus',
      description: 'Your satisfaction is our top priority, always going the extra mile.'
    },
    {
      icon: FiTrendingUp,
      title: 'Innovation',
      description: 'Constantly improving our platform to enhance your shopping experience.'
    },
    {
      icon: FiUsers,
      title: 'Community',
      description: 'Building lasting relationships with our valued customers.'
    },
  ];

  const stats = [
    { value: '10K+', label: 'Premium Products' },
    { value: '50K+', label: 'Happy Customers' },
    { value: '100+', label: 'Brand Partners' },
    { value: '24/7', label: 'Support Available' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-secondary-600 text-white py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-5xl font-bold mb-6">About EliteShop</h1>
            <p className="text-xl text-white/90 leading-relaxed">
              We're redefining online shopping with premium products, exceptional service, 
              and a commitment to making every purchase an experience worth remembering.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 -mt-16">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center p-6">
                  <p className="text-4xl font-bold text-primary-600 mb-2">{stat.value}</p>
                  <p className="text-gray-600">{stat.label}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Founded in 2020, EliteShop began with a simple mission: to make premium products 
                accessible to everyone. What started as a small online store has grown into a 
                trusted destination for quality-conscious shoppers worldwide.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                We believe shopping should be more than just a transaction. It's about discovery, 
                trust, and the joy of finding exactly what you're looking for. That's why we 
                carefully select every product in our catalog and stand behind each one.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Today, we're proud to serve over 50,000 happy customers and partner with the 
                world's leading brands to bring you the best shopping experience possible.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop"
                alt="Our Store"
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center p-8 h-full">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-2xl flex items-center justify-center">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The passionate people behind EliteShop
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Sarah Johnson', role: 'Founder & CEO', image: 'https://i.pravatar.cc/300?img=1' },
              { name: 'Michael Chen', role: 'Head of Operations', image: 'https://i.pravatar.cc/300?img=13' },
              { name: 'Emma Davis', role: 'Customer Experience Lead', image: 'https://i.pravatar.cc/300?img=5' },
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center p-8">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 mx-auto rounded-full mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
