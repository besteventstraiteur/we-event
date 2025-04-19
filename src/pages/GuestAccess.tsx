
import React from 'react';
import { useSearchParams, Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useGuest } from '@/hooks/useGuest';

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

  // Instead of passing the guest prop directly, we'll use the URL parameter
  return <Navigate to={`/guest/${guest.id}`} replace />;
};

export default GuestAccess;
