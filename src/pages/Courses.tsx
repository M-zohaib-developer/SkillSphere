import React, { useState } from 'react';
import { Search, Filter, Clock, Star, Users, ChevronDown } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Courses: React.FC = () => {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'programming', label: 'Programming' },
    { value: 'design', label: 'Design' },
    { value: 'business', label: 'Business' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'data-science', label: 'Data Science' },
  ];

  const difficulties = [
    { value: 'all', label: 'All Levels' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
  ];

  const courses = [
    {
      id: 1,
      title: 'Complete React Developer Course',
      instructor: 'Sarah Chen',
      category: 'programming',
      difficulty: 'intermediate',
      duration: '32 hours',
      students: 12500,
      rating: 4.9,
      price: '$89',
      image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Master React from basics to advanced topics including hooks, context, and modern patterns.',
    },
    {
      id: 2,
      title: 'UI/UX Design Fundamentals',
      instructor: 'Mike Johnson',
      category: 'design',
      difficulty: 'beginner',
      duration: '24 hours',
      students: 8900,
      rating: 4.7,
      price: '$79',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Learn the fundamentals of user experience and interface design with hands-on projects.',
    },
    {
      id: 3,
      title: 'Machine Learning with Python',
      instructor: 'Dr. Emily Rodriguez',
      category: 'data-science',
      difficulty: 'advanced',
      duration: '48 hours',
      students: 15600,
      rating: 4.8,
      price: '$129',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Dive deep into machine learning algorithms and implement them using Python and scikit-learn.',
    },
    {
      id: 4,
      title: 'Digital Marketing Mastery',
      instructor: 'Alex Thompson',
      category: 'marketing',
      difficulty: 'intermediate',
      duration: '28 hours',
      students: 9200,
      rating: 4.6,
      price: '$99',
      image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Master digital marketing strategies including SEO, social media, and paid advertising.',
    },
    {
      id: 5,
      title: 'Node.js & Express Development',
      instructor: 'James Wilson',
      category: 'programming',
      difficulty: 'intermediate',
      duration: '36 hours',
      students: 7800,
      rating: 4.7,
      price: '$94',
      image: 'https://images.pexels.com/photos/574077/pexels-photo-574077.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Build scalable backend applications with Node.js, Express, and MongoDB.',
    },
    {
      id: 6,
      title: 'Business Strategy & Planning',
      instructor: 'Lisa Chen',
      category: 'business',
      difficulty: 'beginner',
      duration: '20 hours',
      students: 5400,
      rating: 4.5,
      price: '$69',
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Learn essential business strategy concepts and create effective business plans.',
    },
    {
      id: 7,
      title: 'Advanced CSS & Animations',
      instructor: 'David Kim',
      category: 'design',
      difficulty: 'advanced',
      duration: '25 hours',
      students: 6700,
      rating: 4.8,
      price: '$84',
      image: 'https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Master advanced CSS techniques, animations, and modern layout systems.',
    },
    {
      id: 8,
      title: 'Data Visualization with D3.js',
      instructor: 'Rachel Martinez',
      category: 'data-science',
      difficulty: 'intermediate',
      duration: '30 hours',
      students: 4200,
      rating: 4.6,
      price: '$109',
      image: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Create stunning interactive data visualizations using D3.js and modern web technologies.',
    },
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || course.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400';
      case 'intermediate': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'advanced': return 'text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-200`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Explore Courses
          </h1>
          <p className={`mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Discover new skills and advance your career with our expert-led courses
          </p>
        </div>

        {/* Search and Filters */}
        <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg shadow-sm border p-6 mb-8`}>
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className={`absolute left-3 top-3 h-5 w-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-400'}`} />
                <input
                  type="text"
                  placeholder="Search courses or instructors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-10 pr-3 py-3 border ${
                    theme === 'dark' 
                      ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' 
                      : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
                  } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200`}
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={`px-4 py-3 border ${
                  theme === 'dark' 
                    ? 'border-gray-600 bg-gray-700 text-white' 
                    : 'border-gray-300 bg-white text-gray-900'
                } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200`}
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>

              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className={`px-4 py-3 border ${
                  theme === 'dark' 
                    ? 'border-gray-600 bg-gray-700 text-white' 
                    : 'border-gray-300 bg-white text-gray-900'
                } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200`}
              >
                {difficulties.map(difficulty => (
                  <option key={difficulty.value} value={difficulty.value}>
                    {difficulty.label}
                  </option>
                ))}
              </select>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center space-x-2 px-4 py-3 border ${
                  theme === 'dark' 
                    ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                } rounded-md transition-colors duration-200 lg:hidden`}
              >
                <Filter className="h-4 w-4" />
                <span>Filters</span>
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Showing {filteredCourses.length} of {courses.length} courses
          </p>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg shadow-sm border hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 cursor-pointer group`}
            >
              {/* Course Image */}
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                />
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(course.difficulty)}`}>
                    {course.difficulty.charAt(0).toUpperCase() + course.difficulty.slice(1)}
                  </span>
                </div>
              </div>

              {/* Course Content */}
              <div className="p-6">
                <h3 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'} group-hover:text-blue-600 transition-colors duration-200`}>
                  {course.title}
                </h3>
                
                <p className={`text-sm mb-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  by {course.instructor}
                </p>

                <p className={`text-sm mb-4 line-clamp-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {course.description}
                </p>

                {/* Course Stats */}
                <div className="flex items-center justify-between mb-4 text-sm">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        {course.duration}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        {course.students.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {course.rating}
                    </span>
                  </div>
                </div>

                {/* Price and Enroll */}
                <div className="flex items-center justify-between">
                  <span className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {course.price}
                  </span>
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200">
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <div className={`text-gray-400 mb-4`}>
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className={`text-lg font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              No courses found
            </h3>
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Try adjusting your search criteria or browse all courses.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;