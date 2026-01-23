# SETUP & DEPLOYMENT GUIDE

## 🚀 Quick Start

### Local Development

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open browser
# http://localhost:3000
```

## 🔧 Configuration

### Environment Variables

Create `.env.local`:

```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
NEXT_PUBLIC_TRANSLATION_API=libre

# Optional: For premium APIs
TRANSLATION_API_KEY=your_key_here
DEEPL_API_KEY=your_key_here
GOOGLE_TRANSLATE_API_KEY=your_key_here
```

### API Providers

#### LibreTranslate (Default - Free)
- Free and open-source
- No API key required
- Rate limits: ~5 requests/min on public server
- **No setup needed** - works out of the box

#### DeepL (Optional - Premium)
1. Sign up at https://www.deepl.com/pro
2. Get your API key
3. Add to `.env.local`:
```env
DEEPL_API_KEY=your_key_here
```

#### Google Translate (Optional)
1. Set up Google Cloud Project
2. Enable Translate API
3. Create service account credentials
4. Add to `.env.local`:
```env
GOOGLE_TRANSLATE_API_KEY=your_key_here
```

## 🏗️ Build & Deploy

### Build for Production

```bash
# Build optimized bundle
npm run build

# Start production server
npm start
```

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts and confirm deployment
```

### Deploy to Other Platforms

#### Netlify
1. Push code to GitHub
2. Connect repository to Netlify
3. Set build command: `npm run build`
4. Set output directory: `.next`
5. Add environment variables in Netlify dashboard

#### Docker (Self-hosted)

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

Build and run:

```bash
docker build -t mianlingotranslate .
docker run -p 3000:3000 mianlingotranslate
```

#### AWS (EC2)

1. Launch EC2 instance (t3.micro free tier)
2. SSH into instance
3. Install Node.js 18+
4. Clone repository
5. Install dependencies
6. Build application
7. Use PM2 to keep it running:

```bash
npm install -g pm2
pm2 start npm --name "mianlingotranslate" -- start
pm2 startup
pm2 save
```

8. Set up reverse proxy with Nginx
9. Configure SSL with Let's Encrypt

## 📊 Performance Optimization

### Current Metrics
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Bundle Size**: ~150KB (gzipped)

### Further Optimizations

1. **Image Optimization**: Use Next.js Image component
2. **Code Splitting**: Already enabled in Next.js
3. **Caching**: Configure ISR for static pages
4. **Database**: Add PostgreSQL for history if scaling
5. **CDN**: Use Cloudflare for edge caching

## 🔐 Security Checklist

- [ ] Remove debug code
- [ ] Set secure environment variables
- [ ] Enable HTTPS in production
- [ ] Set security headers:
  - Content-Security-Policy
  - X-Frame-Options
  - X-Content-Type-Options
- [ ] Add rate limiting to API
- [ ] Implement CORS properly
- [ ] Use helmet.js for security headers
- [ ] Regular dependency updates: `npm audit fix`
- [ ] Monitor with Sentry for error tracking

### Next.js Security Headers

Add to `next.config.js`:

```javascript
async headers() {
  return [
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff'
        },
        {
          key: 'X-Frame-Options',
          value: 'DENY'
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block'
        }
      ]
    }
  ]
}
```

## 📈 Monitoring & Analytics

### Recommended Services

1. **Error Tracking**: Sentry
2. **Analytics**: Vercel Analytics or PostHog
3. **Performance**: New Relic or DataDog
4. **Uptime**: UptimeRobot or StatusPage

### Setup Sentry

```bash
npm install --save @sentry/nextjs
```

Initialize in `app/layout.tsx`:

```typescript
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
});
```

## 🧪 Testing

### Unit Tests

```bash
npm install --save-dev jest @testing-library/react

# Run tests
npm test
```

### E2E Tests

```bash
npm install --save-dev cypress

# Run Cypress
npx cypress open
```

## 📋 Maintenance

### Regular Tasks

- **Weekly**: Check for dependency updates
- **Monthly**: Review analytics and error logs
- **Quarterly**: Security audit and performance review
- **Yearly**: Plan major upgrades

### Update Dependencies

```bash
# Check for updates
npm outdated

# Update all packages
npm update

# Update major versions
npm install -g npm-check-updates
ncu -u
npm install
```

## 🐛 Troubleshooting

### Common Issues

**Build fails with "Module not found"**
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

**API calls failing**
- Check `.env.local` configuration
- Verify LibreTranslate is accessible
- Check browser console for CORS errors

**Dark mode not working**
- Clear browser localStorage
- Check that `dark` class is applied to `html`
- Verify Tailwind darkMode is set to 'class'

**Translations not saving**
- Check LocalStorage is enabled
- Verify not in private/incognito mode
- Check browser console for storage quota errors

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vercel Deployment](https://vercel.com/docs)
- [LibreTranslate API](https://github.com/LibreTranslate/LibreTranslate)

## 🆘 Getting Help

- Check [GitHub Issues](https://github.com/MultiMian/MianLingoTranslate/issues)
- Read [Documentation](./README.md)
- Ask in [Discussions](https://github.com/MultiMian/MianLingoTranslate/discussions)

---

**Happy deploying! 🚀**
