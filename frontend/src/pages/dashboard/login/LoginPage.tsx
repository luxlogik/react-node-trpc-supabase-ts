import type React from 'react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/lib/context/AuthContext'; 
import LoadingButton from '@/components/ui/LoadingButton'; 

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

export default function LoginPage() {
  const { t } = useTranslation(); 
  const navigate = useNavigate();
  const { signIn, resendConfirmationEmail, user, isAuthenticated } = useAuth();

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isResendingEmail, setIsResendingEmail] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false); 

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate(`/dashboard`);
    }
  }, [isAuthenticated, user, navigate]);
  
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name as keyof FormErrors]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email) {
      newErrors.email = t('auth.login.emailRequired');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('auth.login.emailInvalid');
    }
    if (!formData.password) {
      newErrors.password = t('auth.login.passwordRequired');
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
    setLoginError('');

    try {
      const result = await signIn(formData.email, formData.password);

      if (!result.success) {
        const errorMessage =
          typeof result.error === 'string'
            ? result.error
            : result.error?.message || t('auth.login.genericError');
        setLoginError(errorMessage);
      }
    } catch (error) {
      setLoginError(t('auth.login.genericError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendConfirmation = async () => {
    setIsResendingEmail(true);
    setResendSuccess(false);

    try {
      const result = await resendConfirmationEmail(formData.email);
      if (result.success) {
        setResendSuccess(true);
      } else {
      }
    } catch (error) {
      setLoginError(t('auth.login.resendError'));
    } finally {
      setIsResendingEmail(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8"
      data-testid="login-page-container"
    >
      <div
        className="max-w-md w-full space-y-8"
        data-testid="login-form-container"
      >
        <div data-testid="login-header">
          <h2
            className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white"
            data-testid="login-title"
          >
            {t('auth.login.title')}
          </h2>
        </div>

        <Card className="p-6" data-testid="login-card">
          {loginError && (
            <div
              className="mb-6 p-4 bg-red-100 text-red-700 rounded-md"
              data-testid="login-error"
            >
              {loginError}
              {loginError === t('auth.login.emailNotVerified') && (
                <div className="mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleResendConfirmation}
                    disabled={isResendingEmail || resendSuccess}
                    data-testid="resend-confirmation-button"
                  >
                    {isResendingEmail
                      ? t('auth.login.resendingConfirmation')
                      : resendSuccess
                        ? t('auth.login.resendSuccess', {
                            email: formData.email,
                          })
                        : t('auth.login.resendEmail')}
                  </Button>
                  {resendSuccess && (
                    <p
                      className="text-sm text-green-600 mt-2"
                      data-testid="resend-success"
                    >
                      {t('auth.login.checkInbox')}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          <form
            className="space-y-6"
            onSubmit={handleSubmit}
            data-testid="login-form"
          >
            <div className="space-y-2" data-testid="email-field-container">
              <Label htmlFor="email" data-testid="email-label">
                {t('auth.login.email')}
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="block w-full"
                placeholder="you@example.com"
                required
                data-testid="email-input"
                autoComplete="email"
              />
              {errors.email && (
                <p
                  className="text-sm text-red-600 mt-1"
                  data-testid="email-error"
                >
                  {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-2" data-testid="password-field-container">
              <Label htmlFor="password" data-testid="password-label">
                {t('auth.login.password')}
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="block w-full"
                placeholder="••••••••"
                required
                data-testid="password-input"
                autoComplete="current-password"
              />
              {errors.password && (
                <p
                  className="text-sm text-red-600 mt-1"
                  data-testid="password-error"
                >
                  {errors.password}
                </p>
              )}
            </div>

            <div
              className="flex items-center justify-between"
              data-testid="form-options"
            >
              <div className="text-sm" data-testid="forgot-password-container">
                <Link
                  to="/forgot-password"
                  className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                  data-testid="forgot-password-link"
                >
                  {t('auth.login.forgotPassword')}
                </Link>
              </div>
            </div>

            <div data-testid="submit-button-container">
              <LoadingButton
                type="submit"
                className="w-full"
                disabled={isSubmitting}
                loading={isSubmitting}
                data-testid="login-submit-button"
              >
                {isSubmitting ? t('common.loading') : t('auth.login.submit')}
              </LoadingButton>
            </div>
          </form>
        </Card>

        <div className="text-center mt-4" data-testid="signup-prompt">
          <p
            className="text-sm text-gray-600 dark:text-gray-400"
            data-testid="signup-text"
          >
            {t('auth.login.noAccount')}{' '}
            <Link
              to="/signup"
              className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
              data-testid="signup-link"
            >
              {t('auth.login.signup')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
