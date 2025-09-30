# Claude's Project Learning Notes

## Deployment Lessons Learned

### Next.js + GitHub Pages
- ✅ **CRITICAL**: Always add `basePath` and `assetPrefix` to `next.config.ts` for GitHub Pages
- ✅ **REQUIRED**: Create `.nojekyll` file in root to prevent Jekyll interference
- ✅ **BEST PRACTICE**: Use GitHub Actions workflow instead of manual deployment
- ✅ **WORKFLOW**: Simple single-job workflow works better than multi-job

### GitHub Pages Configuration
```typescript
// next.config.ts for GitHub Pages
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/repo-name',
  assetPrefix: '/repo-name',
  images: { unoptimized: true }
};
```

### GitHub Actions Workflow
```yaml
# Simple, effective workflow for Next.js static export
name: Deploy to GitHub Pages
on:
  push:
    branches: [ main ]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - uses: actions/configure-pages@v4
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./out
      - uses: actions/deploy-pages@v4
```

### Common Pitfalls to Avoid
- ❌ Don't rely on README.md being ignored - it takes precedence over index.html
- ❌ Don't forget to remove `/out/` from .gitignore for manual commits
- ❌ Don't use relative paths for assets in GitHub Pages
- ❌ Don't assume Vercel/Surge deployment will work without proper authentication

### Project Patterns That Work
- 🎯 Use TodoWrite tool proactively for complex multi-step tasks
- 🎯 Test deployment with WebFetch to verify functionality
- 🎯 Implement webhook integration for user activity tracking
- 🎯 Create sophisticated animations with GPU acceleration (`transform-gpu`)

### Technologies Used Successfully
- Next.js 15 + TypeScript + Tailwind CSS v4
- React hooks for state management
- n8n webhook integration
- Responsive design with mobile-first approach

### Project Deployment Standards - NEW APPROACH
- ✅ **Base domain**: `projects.wisesolutions.uk`
- ✅ **Subpath structure**: `projects.wisesolutions.uk/project-name/`
- ✅ **Repository pattern**: `wisesolutions-projects/project-name`
- ✅ **Single domain, multiple projects** (subpaths not subdomains)

### Standard Workflow for Subpath Projects
1. Create repository: `wisesolutions-projects/project-name`
2. Configure `next.config.ts` WITH basePath: `/project-name`
3. Add `CNAME` file with `projects.wisesolutions.uk`
4. Deploy via GitHub Actions automatically
5. Final URL: `projects.wisesolutions.uk/project-name/`

---
*Last updated: 2024-09-30 - Baby Shower Landing Page Project*
*Custom domain deployment standards established*