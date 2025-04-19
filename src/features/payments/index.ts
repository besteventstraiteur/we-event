
import { lazy } from 'react';

// Lazy load payment components
export const PaymentForm = lazy(() => 
  import("@/components/payment/PaymentForm" /* webpackChunkName: "payment-form" */)
);

export const GiftFundManager = lazy(() => 
  import("@/components/payment/GiftFundManager" /* webpackChunkName: "gift-fund" */)
);
