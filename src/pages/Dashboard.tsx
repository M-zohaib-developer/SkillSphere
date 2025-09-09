import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Trophy, Target, ArrowRight, Clock, Star, TrendingUp } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { theme } = useTheme();

  const recentCourses = [
    {
      id: 1,
      title: 'Advanced React Development',
      progress: 75,
      instructor: 'Sarah Chen',
      thumbnail: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=300',
      duration: '12 hours',
      rating: 4.8,
    },
    {
      id: 2,
      title: 'UI/UX Design Fundamentals',
      progress: 45,
      instructor: 'Mike Johnson',
      thumbnail: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=300',
      duration: '8 hours',
      rating: 4.7,
    },
    {
      id: 3,
      title: 'Machine Learning Basics',
      progress: 20,
      instructor: 'Dr. Emily Rodriguez',
      thumbnail: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=300',
      duration: '15 hours',
      rating: 4.9,
    },
  ];

  const quickActions = [
    {
      title: 'Browse Courses',
      description: 'Explore our extensive course library',
      icon: BookOpen,
      link: '/courses',
      color: 'from-blue-500 to-purple-600',
    },
    {
      title: 'My Projects',
      description: 'View and manage your projects',
      icon: Target,
      link: '/projects',
      color: 'from-green-500 to-teal-600',
    },
    {
      title: 'Community',
      description: 'Connect with fellow learners',
      icon: Users,
      link: '/community',
      color: 'from-pink-500 to-rose-600',
    },
    {
      title: 'Achievements',
      description: 'Track your learning progress',
      icon: Trophy,
      link: '/profile',
      color: 'from-yellow-500 to-orange-600',
    },
  ];

  const stats = [
    { label: 'Courses Enrolled', value: '12', icon: BookOpen, color: 'text-blue-600' },
    { label: 'Hours Learned', value: '156', icon: Clock, color: 'text-green-600' },
    { label: 'Certificates', value: '8', icon: Trophy, color: 'text-yellow-600' },
    { label: 'Projects', value: '5', icon: Target, color: 'text-purple-600' },
  ];

  const profileCompletion = 85;

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-200`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Welcome back, {user?.name}! 👋
          </h1>
          <p className={`mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Ready to continue your learning journey?
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-200`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {stat.label}
                  </p>
                  <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {stat.value}
                  </p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Continue Learning */}
            <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg shadow-sm border p-6`}>
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Continue Learning
                </h2>
                <Link
                  to="/courses"
                  className="text-blue-600 hover:text-blue-500 font-medium text-sm flex items-center transition-colors duration-200"
                >
                  View all
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>

              <div className="space-y-4">
                {recentCourses.map((course) => (
                  <div
                    key={course.id}
                    className={`flex items-center space-x-4 p-4 rounded-lg border ${
                      theme === 'dark' 
                        ? 'border-gray-600 hover:bg-gray-700' 
                        : 'border-gray-200 hover:bg-gray-50'
                    } transition-colors duration-200 cursor-pointer`}
                  >
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {course.title}
                      </h3>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        by {course.instructor}
                      </p>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex-1">
                          <div className={`h-2 ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                            <div
                              className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
                              style={{ width: `${course.progress}%` }}
                            />
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{course.progress}% complete</p>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Clock className="h-4 w-4" />
                          <span>{course.duration}</span>
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span>{course.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg shadow-sm border p-6`}>
              <h2 className={`text-xl font-semibold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickActions.map((action, index) => (
                  <Link
                    key={index}
                    to={action.link}
                    className={`p-4 rounded-lg border ${
                      theme === 'dark' 
                        ? 'border-gray-600 hover:border-gray-500' 
                        : 'border-gray-200 hover:border-gray-300'
                    } hover:shadow-md transform hover:-translate-y-1 transition-all duration-200 group`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${action.color}`}>
                        <action.icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          {action.title}
                        </h3>
                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          {action.description}
                        </p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors duration-200" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Profile Completion */}
            <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg shadow-sm border p-6`}>
              <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Profile Completion
              </h3>
              <div className="relative pt-1">
                <div className={`h-3 ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-teal-600"
                    style={{ width: `${profileCompletion}%` }}
                  />
                </div>
                <p className={`text-sm mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {profileCompletion}% Complete
                </p>
              </div>
              <Link
                to="/profile"
                className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-500 font-medium text-sm transition-colors duration-200"
              >
                Complete Profile
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>

            {/* Recent Activity */}
            <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg shadow-sm border p-6`}>
              <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Recent Activity
              </h3>
              <div className="space-y-3">
                {[
                  { action: 'Completed lesson', course: 'React Hooks', time: '2 hours ago' },
                  { action: 'Started project', course: 'Portfolio Website', time: '1 day ago' },
                  { action: 'Earned certificate', course: 'JavaScript Basics', time: '3 days ago' },
                ].map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2" />
                    <div>
                      <p className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {activity.action}: <span className="font-medium">{activity.course}</span>
                      </p>
                      <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Learning Streak */}
            <div className={`${theme === 'dark' ? 'bg-gradient-to-br from-orange-900 to-red-900' : 'bg-gradient-to-br from-orange-500 to-red-600'} rounded-lg p-6 text-white`}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Learning Streak</h3>
                  <p className="text-2xl font-bold">12 Days</p>
                  <p className="text-sm opacity-90">Keep it up!</p>
                </div>
                <TrendingUp className="h-8 w-8 opacity-80" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;