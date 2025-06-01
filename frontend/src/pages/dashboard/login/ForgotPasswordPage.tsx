import type React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { useAuth } from '@/lib/context/AuthContext';
interface FormData {
  email: string;
}

interface FormErrors {
  email?: string;
}

export default function ForgotPasswordPage() {
  const { t } = useTranslation();

  const [formData, setFormData] = useState<FormData>({
    email: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [requestError, setRequestError] = useState('');
  const { resetPassword } = useAuth();
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
      newErrors.email = t('auth.forgotPassword.emailRequired');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('auth.forgotPassword.emailInvalid');
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
    setRequestError('');

    try {
      const result = await resetPassword(
        formData.email,
        window.location.origin
      );

      if (result.success) {
        setIsSubmitted(true);
      } else {
        const errorMessage =
          typeof result.error === 'string'
            ? result.error
            : result.error?.message || t('auth.forgotPassword.genericError');
        setRequestError(errorMessage);
      }
    } catch (error) {
      setRequestError(t('auth.forgotPassword.genericError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8"
      data-testid="forgot-password-container"
    >
      <div
        className="max-w-md w-full space-y-8"
        data-testid="forgot-password-content"
      >
        <div data-testid="forgot-password-header">
          <h2
            className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white"
            data-testid="forgot-password-title"
          >
            {t('auth.forgotPassword.title')}
          </h2>
        </div>

        <Card data-testid="forgot-password-card">
          <CardHeader data-testid="card-header">
            <CardTitle data-testid="card-title">
              {t('auth.forgotPassword.title')}
            </CardTitle>
            <CardDescription data-testid="card-description">
              {t('auth.forgotPassword.description')}
            </CardDescription>
          </CardHeader>

          <CardContent data-testid="card-content">
            {isSubmitted ? (
              <div
                className="text-center py-6 space-y-4"
                data-testid="success-message"
              >
                <CheckCircle
                  className="mx-auto h-12 w-12 text-green-500"
                  data-testid="success-icon"
                />
                <h3
                  className="text-lg font-medium text-gray-900 dark:text-white"
                  data-testid="success-title"
                >
                  {t('auth.forgotPassword.checkEmail')}
                </h3>
                <p
                  className="text-sm text-gray-500 dark:text-gray-400"
                  data-testid="success-description"
                >
                  {t('auth.forgotPassword.emailSent', {
                    email: formData.email,
                  })}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} data-testid="forgot-password-form">
                {requestError && (
                  <div
                    className="mb-6 p-4 bg-red-100 text-red-700 rounded-md"
                    data-testid="request-error"
                  >
                    {requestError}
                  </div>
                )}

                <div className="space-y-2" data-testid="email-field-container">
                  <Label htmlFor="email" data-testid="email-label">
                    {t('auth.forgotPassword.email')}
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

                <div className="mt-6" data-testid="submit-button-container">
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                    onClick={handleSubmit}
                    data-testid="submit-button"
                  >
                    {isSubmitting
                      ? t('common.loading')
                      : t('auth.forgotPassword.submit')}
                  </Button>
                </div>
              </form>
            )}
          </CardContent>

          <CardFooter
            className="flex justify-center border-t pt-6"
            data-testid="card-footer"
          >
            <Link
              to="/login"
              className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
              data-testid="back-to-login-link"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('auth.forgotPassword.backToLogin')}
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
