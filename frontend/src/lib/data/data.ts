 
import { User } from '@/shared/types';

interface GlobalSingleton {
  userId: Optional<string>; 
  currentUser: Optional<User>;  
}

export const globalSingleton: GlobalSingleton = {
  userId: undefined, 
  currentUser: undefined,  
};

export const initializeGlobalSingleton = (
  userResponse: User,  
) => {
  globalSingleton.userId = userResponse.id; 
  globalSingleton.currentUser = userResponse; 
};
 