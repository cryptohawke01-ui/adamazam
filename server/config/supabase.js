const { createClient } = require('@supabase/supabase-js');
const config = require('../config');

const supabaseUrl = process.env.SUPABASE_URL || config.supabase.url;
const supabaseKey = process.env.SUPABASE_ANON_KEY || config.supabase.anonKey;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || config.supabase.serviceKey;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

// Client for general operations
const supabase = createClient(supabaseUrl, supabaseKey);

// Admin client for operations requiring service role key
// Use anon key if service key is not available (for development)
const adminKey = supabaseServiceKey && supabaseServiceKey !== 'REPLACE_WITH_REAL_SERVICE_ROLE_KEY' 
  ? supabaseServiceKey 
  : supabaseKey;
const supabaseAdmin = createClient(supabaseUrl, adminKey);

module.exports = { supabase, supabaseAdmin };
