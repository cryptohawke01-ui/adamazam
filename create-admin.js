const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcryptjs');

// Supabase configuration
const supabaseUrl = 'https://inuzmvgfqhgptygmtcsh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImludXptdmdmcWhncHR5Z210Y3NoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTQwMDkxOCwiZXhwIjoyMDc2OTc2OTE4fQ.REPLACE_WITH_REAL_SERVICE_ROLE_KEY';

// Use anon key if service key is not available
const adminKey = supabaseKey === 'REPLACE_WITH_REAL_SERVICE_ROLE_KEY' 
  ? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImludXptdmdmcWhncHR5Z210Y3NoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0MDA5MTgsImV4cCI6MjA3Njk3NjkxOH0.co0Bm51dFmNzNghC5xJfNs6zzPgmurd-MU_irxzLFHg'
  : supabaseKey;

const supabase = createClient(supabaseUrl, adminKey);

async function createAdminUser() {
  try {
    console.log('Creating admin user...');
    
    // Hash the password
    const hashedPassword = await bcrypt.hash('admin123', 12);
    
    // Create admin user
    const { data, error } = await supabase
      .from('admin_users')
      .insert([
        {
          email: 'admin@adamazam.com',
          password: hashedPassword,
          name: 'Admin User',
          role: 'admin'
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Error creating admin user:', error);
      return;
    }

    console.log('Admin user created successfully!');
    console.log('Email: admin@adamazam.com');
    console.log('Password: admin123');
    console.log('User ID:', data.id);
    
  } catch (error) {
    console.error('Error:', error);
  }
}

createAdminUser();
