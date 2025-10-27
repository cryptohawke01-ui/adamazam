# Vercel Deployment Guide for Adam Azam Website

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Your code should be pushed to GitHub
3. **Supabase Project**: Make sure your Supabase project is set up and running

## Step-by-Step Deployment

### 1. Prepare Your Repository

Make sure all your code is committed and pushed to GitHub:

```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### 2. Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will automatically detect it's a Node.js project

### 3. Configure Build Settings

Vercel should automatically detect your configuration from `vercel.json`, but verify:

- **Framework Preset**: Other
- **Root Directory**: Leave as root (.)
- **Build Command**: `npm run build`
- **Output Directory**: `client/build`
- **Install Command**: `npm install`

### 4. Set Environment Variables

In the Vercel dashboard, go to Settings > Environment Variables and add:

#### Server Variables:
```
NODE_ENV=production
PORT=5000
CLIENT_URL=https://your-project-name.vercel.app
SUPABASE_URL=https://inuzmvgfqhgptygmtcsh.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImludXptdmdmcWhncHR5Z210Y3NoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0MDA5MTgsImV4cCI6MjA3Njk3NjkxOH0.co0Bm51dFmNzNghC5xJfNs6zzPgmurd-MU_irxzLFHg
SUPABASE_SERVICE_ROLE_KEY=your_actual_service_role_key
JWT_SECRET=adamazam_super_secret_jwt_key_2024_very_long_and_secure
```

#### Client Variables:
```
REACT_APP_API_URL=/api
```

### 5. Deploy

1. Click "Deploy" in Vercel
2. Wait for the build to complete
3. Your site will be available at `https://your-project-name.vercel.app`

### 6. Update CORS Settings

After deployment, update your `CLIENT_URL` environment variable in Vercel with your actual domain.

## Project Structure

Your project is configured as:
- **Frontend**: React app in `/client` directory
- **Backend**: Express.js API in `/server` directory
- **Routing**: API calls go to `/api/*`, everything else serves the React app

## Troubleshooting

### Common Issues:

1. **Build Fails**: Check that all dependencies are in `package.json`
2. **API Not Working**: Verify environment variables are set correctly
3. **CORS Errors**: Make sure `CLIENT_URL` matches your Vercel domain
4. **Database Connection**: Verify Supabase credentials are correct

### Checking Logs:

1. Go to Vercel dashboard
2. Click on your project
3. Go to "Functions" tab to see server logs
4. Go to "Deployments" tab to see build logs

## Post-Deployment

1. Test all functionality
2. Update any hardcoded URLs
3. Set up custom domain (optional)
4. Configure monitoring and analytics

## Security Notes

- Never commit `.env` files to Git
- Use strong, unique secrets for production
- Regularly rotate API keys
- Monitor your Supabase usage
