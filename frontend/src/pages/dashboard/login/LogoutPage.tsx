import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useAuth } from '@/lib/context/AuthContext';
import WaveLoader from '@/components/ui/loaders/wave-loader';

export default function LogoutPage() {
  const navigate = useNavigate(); 
  const { signOut } = useAuth();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await signOut();  
      } catch (error) {
        console.error('Logout failed:', error);
        // Still redirect to login even if there's an error
      }
      navigate('/login');
    };

    performLogout();
  }, []);
 
  return (
    <div className="flex items-center justify-center h-screen">
      <WaveLoader />
      <p className="text-muted-foreground">Logging out...</p>
    </div>
  );
}
