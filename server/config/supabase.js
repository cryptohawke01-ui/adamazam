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
// For development, we'll use the anon key since we don't have a real service key
// In production, you should use the actual service role key
const adminKey = supabaseKey; // Use anon key for development
const supabaseAdmin = createClient(supabaseUrl, adminKey);

module.exports = { supabase, supabaseAdmin };
