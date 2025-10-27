# Vercel Environment Variables Configuration

## Required Environment Variables for Vercel Deployment

### Server Environment Variables (Add these in Vercel Dashboard > Settings > Environment Variables)

```
NODE_ENV=production
PORT=5000
CLIENT_URL=https://your-domain.vercel.app

# Supabase Configuration
SUPABASE_URL=https://inuzmvgfqhgptygmtcsh.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImludXptdmdmcWhncHR5Z210Y3NoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0MDA5MTgsImV4cCI6MjA3Njk3NjkxOH0.co0Bm51dFmNzNghC5xJfNs6zzPgmurd-MU_irxzLFHg
SUPABASE_SERVICE_ROLE_KEY=your_actual_service_role_key_here

# JWT Secret (use a strong random string)
JWT_SECRET=adamazam_super_secret_jwt_key_2024_very_long_and_secure
```

### Client Environment Variables

```
REACT_APP_API_URL=/api
```

## How to Add Environment Variables in Vercel:

1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings > Environment Variables
4. Add each variable with its value
5. Make sure to set them for Production, Preview, and Development environments

## Important Notes:

- Replace `your_actual_service_role_key_here` with your real Supabase service role key
- The `CLIENT_URL` should be your actual Vercel domain after deployment
- Make sure all sensitive keys are properly secured
- The JWT_SECRET should be a strong, random string for production
