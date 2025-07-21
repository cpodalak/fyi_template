# Usage Guide

How to customize, deploy, and maintain your site.

## 🎨 Customization

### Personal Information
Update these files with your details:
- `src/pages/index.astro` - Homepage content
- `src/pages/resume.astro` - Professional experience
- `src/components/Header.astro` - Navigation and name
- `src/components/Footer.astro` - Social links
- `package.json` - Author and repository info

### Content
- **Articles**: Add Markdown files to `src/content/articles/`
- **Projects**: Add Markdown files to `src/content/projects/`

### Notion Integration (Optional)
1. Create a Notion database
2. Get API key from [Notion Developers](https://developers.notion.com/)
3. Add to `.env`:
   ```
   NOTION_API_KEY=your_api_key
   NOTION_DATABASE_ID=your_database_id
   ```

## 🚀 Deployment

### Automatic (Recommended)
Push to `main` branch → Site deploys automatically to GitHub Pages

```bash
git add .
git commit -m "Update content"
git push origin main
```

### Manual/Emergency
Go to **Actions** → **Fast Deploy** → **Run workflow**

## 🌐 Custom Domain (Optional)

1. **Add domain in GitHub:**
   - **Settings** → **Pages** → **Custom domain**
   - Enter your domain (e.g., `example.com`)

2. **Update workflow:**
   ```yaml
   # In .github/workflows/ci-cd.yml, uncomment:
   cname: yourdomain.com
   ```

3. **Configure DNS:**
   ```
   # A records for apex domain (example.com)
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153

   # CNAME for subdomain (www.example.com)
   yourusername.github.io
   ```

## 🔍 Monitoring

- **Site**: `https://yourusername.github.io/repository-name`
- **Actions**: GitHub repository → **Actions** tab
- **Issues**: Use GitHub Issues for bug reports

## 🆘 Troubleshooting

**Site not updating?**
1. Check GitHub Actions for errors
2. Clear browser cache
3. Wait ~10 minutes for GitHub's CDN

**Build failing?**
1. Check Actions logs
2. Run `npm run validate` locally
3. Fix errors and push again
