
import { supabase } from "@/lib/supabase";

// Type definitions for edge function requests
export interface EmailRequest {
  to: string;
  subject: string;
  body: string;
  replyTo?: string;
}

// Helper function to send emails via Edge Function
export const sendEmail = async (emailData: EmailRequest) => {
  try {
    const { data, error } = await supabase.functions.invoke('send-email', {
      body: emailData,
    });
    
    if (error) {
      console.error('Error calling send-email function:', error);
      throw new Error(error.message || 'Failed to send email');
    }
    
    return { success: true, data };
  } catch (error) {
    console.error('Exception in sendEmail:', error);
    throw error;
  }
};

// Sample usage example
/*
import { sendEmail } from '@/utils/edgeFunctions';

// In your component:
const handleSendEmail = async () => {
  try {
    await sendEmail({
      to: 'client@example.com',
      subject: 'Your Wedding Planning Update',
      body: '<h1>Updates for your event</h1><p>New details are available...</p>',
      replyTo: 'support@weevent.app'
    });
    
    // Show success message
  } catch (error) {
    // Handle error
  }
};
*/
