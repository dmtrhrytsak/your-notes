import { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';

import { auth } from 'services/firebase.service';

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);
        setHasLoaded(true);
      },
      (error) => {
        console.warn(error.message);
      }
    );

    return unsubscribe;
  }, []);

  return { user, hasLoaded };
};

export default useAuth;
