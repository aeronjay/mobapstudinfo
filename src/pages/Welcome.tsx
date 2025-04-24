import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpenIcon, ClockIcon, BellIcon, UserIcon } from 'lucide-react';
const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const features = [{
    icon: BookOpenIcon,
    title: 'Track Your Progress',
    description: 'Monitor grades, assignments, and academic performance in real-time'
  }, {
    icon: ClockIcon,
    title: 'Stay Organized',
    description: 'Access your class schedule and manage upcoming assignments'
  }, {
    icon: BellIcon,
    title: 'Never Miss Updates',
    description: 'Receive important notifications about classes and events'
  }, {
    icon: UserIcon,
    title: 'Connect with Teachers',
    description: 'Direct communication with your instructors when you need help'
  }];
  return <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Student Portal
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Your gateway to academic success
          </p>
          <button onClick={() => navigate('/login')} className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
            Get Started
          </button>
        </div>
        {/* School Mission */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8 text-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Our Mission
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Empowering students with the tools they need to excel in their
            academic journey and beyond.
          </p>
        </div>
        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {features.map((feature, index) => <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {feature.description}
              </p>
            </div>)}
        </div>
        {/* Login Link */}
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Already have an account?
          </p>
          <button onClick={() => navigate('/login')} className="text-blue-600 dark:text-blue-400 font-medium hover:underline">
            Log in to your account
          </button>
        </div>
      </div>
    </div>;
};
export default Welcome;