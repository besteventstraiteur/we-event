
import React from 'react';
import { useSearchParams, Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useGuest } from '@/hooks/useGuest';
import GuestDashboard from './GuestDashboard';

const GuestAccess = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const { guest, isLoading } = useGuest(token);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-vip-gold" />
      </div>
    );
  }

  if (!guest) {
    return <Navigate to="/404" replace />;
  }

  return <GuestDashboard guest={guest} />;
};

export default GuestAccess;
