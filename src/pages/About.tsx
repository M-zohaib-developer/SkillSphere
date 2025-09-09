import React from 'react';
import { Users, Target, Award, Globe, Mail, Phone, MapPin, Linkedin, Twitter, Github } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const About: React.FC = () => {
  const { theme } = useTheme();

  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Former tech executive with 15+ years of experience in educational technology and a passion for democratizing learning.',
      linkedin: '#',
      twitter: '#',
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Full-stack developer and architect who built the platform from the ground up with scalability and user experience in mind.',
      linkedin: '#',
      github: '#',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Content',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Educational specialist with expertise in curriculum development and learning methodologies for adult learners.',
      linkedin: '#',
      twitter: '#',
    },
    {
      name: 'David Kim',
      role: 'Lead Designer',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'UI/UX designer focused on creating intuitive and accessible learning experiences that engage and inspire learners.',
      linkedin: '#',
      github: '#',
    },
  ];

  const stats = [
    { number: '50,000+', label: 'Active Learners', icon: Users },
    { number: '500+', label: 'Expert Instructors', icon: Award },
    { number: '1,200+', label: 'Courses Available', icon: Target },
    { number: '45+', label: 'Countries Reached', icon: Globe },
  ];

  const values = [
    {
      title: 'Accessibility',
      description: 'We believe quality education should be accessible to everyone, regardless of background or location.',
      icon: '🌍',
    },
    {
      title: 'Excellence',
      description: 'We maintain the highest standards in course content, instructor expertise, and learning outcomes.',
      icon: '⭐',
    },
    {
      title: 'Innovation',
      description: 'We continuously evolve our platform with cutting-edge technology and learning methodologies.',
      icon: '🚀',
    },
    {
      title: 'Community',
      description: 'We foster a supportive learning environment where students and instructors can connect and grow.',
      icon: '🤝',
    },
  ];

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-200`}>
      {/* Hero Section */}
      <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} py-24`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className={`text-4xl md:text-6xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              About SkillSphere
            </h1>
            <p className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Empowering learners worldwide with high-quality, accessible education that transforms careers and lives.
            </p>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className={`text-3xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Our Mission
              </h2>
              <p className={`text-lg mb-6 leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                At SkillSphere, we're dedicated to breaking down barriers to quality education. Our mission is to provide 
                accessible, comprehensive, and practical learning experiences that empower individuals to achieve their 
                professional and personal goals.
              </p>
              <p className={`text-lg leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                We believe that learning should be engaging, relevant, and applicable to real-world challenges. That's why 
                we partner with industry experts and thought leaders to create courses that not only teach theory but also 
                provide hands-on experience.
              </p>
            </div>
            
            <div>
              <h2 className={`text-3xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Our Vision
              </h2>
              <p className={`text-lg mb-6 leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                We envision a world where geographical boundaries, financial constraints, and traditional educational 
                limitations no longer prevent talented individuals from reaching their full potential.
              </p>
              <p className={`text-lg leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Through technology and innovation, we're building the future of education – one that's personalized, 
                flexible, and designed to meet the evolving needs of learners in the digital age.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className={`py-24 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl font-bold text-center mb-16 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Our Impact in Numbers
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full">
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl font-bold text-center mb-16 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Our Core Values
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className={`p-8 rounded-lg border ${
                  theme === 'dark' 
                    ? 'bg-gray-800 border-gray-700' 
                    : 'bg-white border-gray-200'
                } shadow-lg hover:shadow-xl transition-shadow duration-200`}
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {value.title}
                </h3>
                <p className={`leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className={`py-24 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl font-bold text-center mb-16 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Meet Our Team
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className={`text-center p-6 rounded-lg border ${
                  theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600' 
                    : 'bg-gray-50 border-gray-200'
                } hover:shadow-lg transition-shadow duration-200`}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {member.name}
                </h3>
                <p className={`text-sm font-medium mb-4 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                  {member.role}
                </p>
                <p className={`text-sm mb-4 leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {member.bio}
                </p>
                <div className="flex justify-center space-x-4">
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      className={`${theme === 'dark' ? 'text-gray-400 hover:text-blue-400' : 'text-gray-500 hover:text-blue-600'} transition-colors duration-200`}
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  )}
                  {member.twitter && (
                    <a
                      href={member.twitter}
                      className={`${theme === 'dark' ? 'text-gray-400 hover:text-blue-400' : 'text-gray-500 hover:text-blue-600'} transition-colors duration-200`}
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                  )}
                  {member.github && (
                    <a
                      href={member.github}
                      className={`${theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'} transition-colors duration-200`}
                    >
                      <Github className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className={`text-3xl font-bold mb-8 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Get in Touch
          </h2>
          <p className={`text-lg mb-12 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Have questions about SkillSphere? We'd love to hear from you.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Mail, label: 'Email', value: 'hello@skillsphere.com' },
              { icon: Phone, label: 'Phone', value: '+1 (555) 123-4567' },
              { icon: MapPin, label: 'Address', value: 'San Francisco, CA' },
            ].map((contact, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4">
                  <contact.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {contact.label}
                </h3>
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {contact.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;