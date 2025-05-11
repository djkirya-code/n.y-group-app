
"use client";

import { useEffect, useState } from 'react'; // Added useState
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext';

interface UseAuthRedirectOptions {
  redirectTo: string;
  condition: 'authenticated' | 'unauthenticated';
}

export function useAuthRedirect({ redirectTo, condition }: UseAuthRedirectOptions) {
  const { isAuthenticated, loading: authLoading } = useAuthContext();
  const router = useRouter();
  // Add a local loading state to track if redirection has been initiated by this hook
  const [isRedirecting, setIsRedirecting] = useState(false);


  useEffect(() => {
    // Only proceed if auth state is resolved and no redirection is currently in progress
    if (!authLoading && !isRedirecting) {
      let shouldRedirect = false;
      if (condition === 'authenticated' && isAuthenticated) {
        shouldRedirect = true;
      } else if (condition === 'unauthenticated' && !isAuthenticated) {
        shouldRedirect = true;
      }

      if (shouldRedirect) {
        setIsRedirecting(true); // Mark that redirection is being initiated
        router.push(redirectTo);
      }
    }
  }, [isAuthenticated, authLoading, router, redirectTo, condition, isRedirecting]);

  // The hook's loading state now reflects both auth loading and redirection initiation
  return { loading: authLoading || isRedirecting, isAuthenticated };
}

