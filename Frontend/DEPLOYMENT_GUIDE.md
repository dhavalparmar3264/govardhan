# Hostinger Deployment Guide for Govardhan Thal (GoDaddy Domain)

## Steps to Deploy to Hostinger with GoDaddy Domain

### 1. Build the Production Version
Run this command in the Frontend directory:
```bash
npm run build:prod
```
This will create a `dist` folder with all the production files.

### 2. Files to Upload to Hostinger
Upload the **entire contents** of the `dist` folder to your Hostinger public_html directory.

### 3. Important Files Included
- `index.html` - Main entry point
- `assets/` - All CSS, JS, and other assets
- `.htaccess` - For proper routing and performance
- All images from `public/images/`

### 4. Hostinger File Manager Steps
1. Login to your Hostinger control panel
2. Go to File Manager
3. Navigate to `public_html` folder
4. Delete any existing files (if this is a fresh deployment)
5. Upload all contents from the `dist` folder
6. Make sure `.htaccess` file is uploaded (it might be hidden)

### 5. GoDaddy DNS Configuration (IMPORTANT)
Since your domain is with GoDaddy, you need to point it to Hostinger:

#### Get Hostinger Nameservers:
1. Login to Hostinger control panel
2. Go to "Domains" section
3. Find your domain or add it
4. Note down the nameservers (usually something like):
   - `ns1.dns-parking.com`
   - `ns2.dns-parking.com`

#### Update GoDaddy DNS:
1. Login to your GoDaddy account
2. Go to "My Products" → "Domains"
3. Click "Manage" next to `govardhanthal.com`
4. Go to "DNS" tab
5. Update nameservers to Hostinger's nameservers
6. **OR** keep GoDaddy nameservers and add these DNS records:
   - **A Record**: `@` → Hostinger IP address
   - **CNAME Record**: `www` → `@`
   - **A Record**: `*` → Hostinger IP address (for subdomains)

### 6. Domain Configuration
- Your domain `govardhanthal.com` will point to Hostinger's servers
- The `.htaccess` file will handle client-side routing
- DNS propagation can take 24-48 hours

### 7. Backend API Setup
Make sure your backend API is also deployed and accessible at:
`https://govardhanthal.com/api`

### 7. Testing
After upload, test:
- Homepage loads correctly
- All routes work (Menu, About, Contact, etc.)
- Images load properly
- Mobile responsiveness

### 8. Performance Optimization
The build includes:
- Code splitting for better loading
- Asset compression
- Browser caching headers
- Gzip compression

### Troubleshooting
- If routes don't work, ensure `.htaccess` is uploaded
- If images don't load, check file paths in `public/images/`
- If API calls fail, verify backend is running at the correct URL

## Build Commands
- `npm run build` - Standard build
- `npm run build:prod` - Production optimized build
- `npm run preview` - Preview production build locally
