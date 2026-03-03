'use client';

import { logout } from '@/API/auth/auth';
import { Loader2 } from 'lucide-react';
import { useEffect } from 'react';

const LogoutPage = () => {
  useEffect(() => {
    logout();
  }, []);
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        Deslogando <Loader2 className="w-4 h-4 animate-spin" />
      </h1>
    </div>
  );
};

export default LogoutPage;
