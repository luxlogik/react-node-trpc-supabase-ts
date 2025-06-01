import { useEffect } from 'react'; 
import { useLocation } from 'react-router-dom'; 
import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';

 

export default function FeaturesPage() { 
  const location = useLocation();

  // Scroll to the hash fragment when the page loads
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

 
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      [Coming Soon...] 
      <Footer />
    </div>
  );
};
 