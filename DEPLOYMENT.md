# Deployment Guide

This project consists of a React frontend and a Node.js/Express backend. Here is how to deploy each part.

## Backend Deployment (e.g., Render, Heroku)
1. **Prepare Environment Variables**: Ensure `MONGODB_URI`, `JWT_SECRET`, and Cloudinary credentials are set in your hosting platform's settings.
2. **Setup .gitignore**: Verify that `.env` is NOT tracked (I've fixed this already).
3. **Build Command**: Usually `npm install`.
4. **Start Command**: `node index.js`.

## Frontend Deployment (e.g., Vercel, Netlify)
1. **API Integration**: Ensure the `src/api/axios.js` file correctly points to your production backend URL.
2. **Build Settings**: 
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. **Environment**: If using custom env vars for the frontend, add them to your Vercel/Netlify dashboard.

## Admin Panel
The admin panel is a separate Vite app. Deploy it similarly to the frontend, ensuring its API calls also point to the production backend.
