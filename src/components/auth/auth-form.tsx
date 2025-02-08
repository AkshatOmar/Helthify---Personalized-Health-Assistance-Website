import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AuthFormProps {
  type: 'login' | 'signup';
}

export function AuthForm({ type }: AuthFormProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (type === 'signup' && !formData.name) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (type === 'signup' && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // TODO: Implement authentication logic
      console.log('Form submitted:', formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg"
      >
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {type === 'login' ? 'Sign in to your account' : 'Create your account'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {type === 'login' ? (
              <>
                Don't have an account?{' '}
                <button
                  onClick={() => navigate('/signup')}
                  className="font-medium text-primary hover:text-primary/80"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  onClick={() => navigate('/login')}
                  className="font-medium text-primary hover:text-primary/80"
                >
                  Sign in
                </button>
              </>
            )}
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {type === 'signup' && (
              <div>
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className={`appearance-none relative block w-full pl-10 pr-3 py-2 border ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    } rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm`}
                    placeholder="Full name"
                  />
                </div>
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                )}
              </div>
            )}
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`appearance-none relative block w-full pl-10 pr-3 py-2 border ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  } rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm`}
                  placeholder="Email address"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`appearance-none relative block w-full pl-10 pr-3 py-2 border ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  } rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm`}
                  placeholder="Password"
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>
            {type === 'signup' && (
              <div>
                <label htmlFor="confirmPassword" className="sr-only">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`appearance-none relative block w-full pl-10 pr-3 py-2 border ${
                      errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                    } rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm`}
                    placeholder="Confirm password"
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            )}
          </div>

          {type === 'login' && (
            <div className="flex items-center justify-end">
              <button
                type="button"
                className="text-sm font-medium text-primary hover:text-primary/80"
              >
                Forgot your password?
              </button>
            </div>
          )}

          <Button
            type="submit"
            size="lg"
            className="w-full group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white"
          >
            {type === 'login' ? 'Sign in' : 'Sign up'}
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </form>
      </motion.div>
    </div>
  );
}