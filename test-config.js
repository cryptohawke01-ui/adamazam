require('dotenv').config();
const config = require('./config');

console.log('Environment variables:');
console.log('SUPABASE_URL:', process.env.SUPABASE_URL);
console.log('SUPABASE_ANON_KEY:', process.env.SUPABASE_ANON_KEY);
console.log('SUPABASE_SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY);
console.log('JWT_SECRET:', process.env.JWT_SECRET);

console.log('\nConfig values:');
console.log('Config supabase url:', config.supabase.url);
console.log('Config supabase anonKey:', config.supabase.anonKey);
console.log('Config jwt secret:', config.jwt.secret);
