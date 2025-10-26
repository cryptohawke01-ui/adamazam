const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcryptjs');

// Supabase configuration
const supabaseUrl = 'https://inuzmvgfqhgptygmtcsh.supabase.co';
const adminKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImludXptdmdmcWhncHR5Z210Y3NoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0MDA5MTgsImV4cCI6MjA3Njk3NjkxOH0.co0Bm51dFmNzNghC5xJfNs6zzPgmurd-MU_irxzLFHg';

const supabase = createClient(supabaseUrl, adminKey);

async function testAuth() {
  try {
    console.log('Testing authentication...');
    
    // Get user from database
    const { data: user, error: fetchError } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', 'admin@adamazam.com')
      .single();

    console.log('User fetch result:', { user, fetchError });

    if (fetchError || !user) {
      console.log('User not found or fetch error');
      return;
    }

    // Test password verification
    const isValidPassword = await bcrypt.compare('admin123', user.password);
    console.log('Password verification result:', isValidPassword);
    
    if (isValidPassword) {
      console.log('✅ Authentication successful!');
    } else {
      console.log('❌ Authentication failed!');
    }
    
  } catch (error) {
    console.error('Error:', error);
  }
}

testAuth();
