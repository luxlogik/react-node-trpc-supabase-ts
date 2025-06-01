import type React from 'react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/context/AuthContext';

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export default function SignupPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isAuthenticated, signUp } = useAuth();

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signupError, setSignupError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name as keyof FormErrors]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name) {
      newErrors.name = t('auth.signup.nameRequired');
    }

    if (!formData.email) {
      newErrors.email = t('auth.signup.emailRequired');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('auth.signup.emailInvalid');
    }

    if (!formData.password) {
      newErrors.password = t('auth.signup.passwordRequired');
    } else if (formData.password.length < 8) {
      newErrors.password = t('auth.signup.passwordLength');
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = t('auth.signup.confirmPasswordRequired');
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t('auth.signup.passwordsDoNotMatch');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSignupError('');

    try {
      const result = await signUp({
        email: formData.email,
        password: formData.password,
        full_name: formData.name,
      });
      if (result.success) { 
        navigate('/login', {
          state: {
            fromSignup: true,
            email: formData.email,
          },
        });
      } else {
        const errorMessage =
          typeof result.error === 'string'
            ? result.error
            : result.error?.message || t('auth.signup.genericError');
        setSignupError(errorMessage);
      }
    } catch (error) {
      console.log('>> signupPage error::: :', error);
      setSignupError(t('auth.signup.genericError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8"
      data-testid="signup-page-container"
    >
      <div
        className="max-w-md w-full space-y-8"
        data-testid="signup-form-container"
      >
        <div data-testid="signup-header">
          <h2
            className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white"
            data-testid="signup-title"
          >
            {t('auth.signup.title')}
          </h2>
          <p
            className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400"
            data-testid="signup-description"
          >
            {t('auth.signup.description', 'Create your account to get started')}
          </p>
        </div>

        <Card className="p-6" data-testid="signup-card">
          {signupError && (
            <div
              className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-md"
              data-testid="signup-error"
            >
              {signupError}
            </div>
          )}

          <form
            className="space-y-6"
            onSubmit={handleSubmit}
            data-testid="signup-form"
          >
            <div className="space-y-2" data-testid="name-field-container">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                data-testid="name-label"
              >
                {t('auth.signup.name')}
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder={t('auth.signup.namePlaceholder', 'John Doe')}
                className={errors.name ? 'border-red-500' : ''}
                aria-invalid={errors.name ? 'true' : 'false'}
                required
                data-testid="name-input"
                autoComplete="name"
              />
              {errors.name && (
                <p
                  className="text-sm text-red-600 dark:text-red-400"
                  data-testid="name-error"
                >
                  {errors.name}
                </p>
              )}
            </div>

            <div className="space-y-2" data-testid="email-field-container">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                data-testid="email-label"
              >
                {t('auth.signup.email')}
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t(
                  'auth.signup.emailPlaceholder',
                  'you@example.com'
                )}
                className={errors.email ? 'border-red-500' : ''}
                aria-invalid={errors.email ? 'true' : 'false'}
                required
                data-testid="email-input"
                autoComplete="email"
              />
              {errors.email && (
                <p
                  className="text-sm text-red-600 dark:text-red-400"
                  data-testid="email-error"
                >
                  {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-2" data-testid="password-field-container">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                data-testid="password-label"
              >
                {t('auth.signup.password')}
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder={t('auth.signup.passwordPlaceholder', '••••••••')}
                className={errors.password ? 'border-red-500' : ''}
                aria-invalid={errors.password ? 'true' : 'false'}
                required
                data-testid="password-input"
                autoComplete="new-password"
              />
              {errors.password && (
                <p
                  className="text-sm text-red-600 dark:text-red-400"
                  data-testid="password-error"
                >
                  {errors.password}
                </p>
              )}
            </div>

            <div
              className="space-y-2"
              data-testid="confirm-password-field-container"
            >
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                data-testid="confirm-password-label"
              >
                {t('auth.signup.confirmPassword')}
              </label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder={t(
                  'auth.signup.confirmPasswordPlaceholder',
                  '••••••••'
                )}
                className={errors.confirmPassword ? 'border-red-500' : ''}
                aria-invalid={errors.confirmPassword ? 'true' : 'false'}
                required
                data-testid="confirm-password-input"
                autoComplete="new-password"
              />
              {errors.confirmPassword && (
                <p
                  className="text-sm text-red-600 dark:text-red-400"
                  data-testid="confirm-password-error"
                >
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <div data-testid="submit-button-container">
              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
                data-testid="signup-submit-button"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    {t('common.loading')}
                  </span>
                ) : (
                  t('auth.signup.submit')
                )}
              </Button>
            </div>
          </form>
        </Card>

        <div className="text-center mt-4" data-testid="login-prompt">
          <p
            className="text-sm text-gray-600 dark:text-gray-400"
            data-testid="login-text"
          >
            {t('auth.signup.haveAccount')}{' '}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
              data-testid="login-link"
            >
              {t('auth.signup.login')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
