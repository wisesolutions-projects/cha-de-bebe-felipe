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
- 🎯 **Z-index layering**: Always set decorative elements (balloons, clouds) to lower z-index than content
  - Decorations container: `z-0`
  - Content: `z-20`
  - Prevents visual overlap on mobile devices

### Technologies Used Successfully
- Next.js 15 + TypeScript + Tailwind CSS v4
- React hooks for state management
- n8n webhook integration
- Responsive design with mobile-first approach

### Project Deployment Standards - FINAL APPROACH ✅
- ✅ **Main portal**: `wisesolutions-projects/projects.wisesolutions.uk`
- ✅ **Portal URL**: `projects.wisesolutions.uk` (lista todos os projetos)
- ✅ **Subpath structure**: `projects.wisesolutions.uk/project-name/`
- ✅ **Individual repos**: `wisesolutions-projects/project-name`
- ✅ **URL preservation**: Iframe technique keeps custom domain URL

### Multi-Repository Architecture
```
projects.wisesolutions.uk/                    ← Main portal
├── cha-de-bebe-mari/                        ← Iframe wrapper
├── portfolio/                               ← Future project
└── dashboard/                               ← Future project

wisesolutions-projects.github.io/
├── cha-de-bebe/                            ← Actual Next.js app
├── portfolio/                              ← Future project
└── dashboard/                              ← Future project
```

### Standard Workflow for New Projects
1. **Individual Project**:
   - Create repo: `wisesolutions-projects/project-name`
   - Configure `next.config.ts` WITH `basePath: '/project-name'`
   - Deploy to: `wisesolutions-projects.github.io/project-name/`

2. **Portal Integration**:
   - Add folder in portal: `projects.wisesolutions.uk/project-name/`
   - Create iframe wrapper pointing to GitHub Pages
   - Update main portal page with new project card
   - Final URL: `projects.wisesolutions.uk/project-name/`

### Iframe Wrapper Template
```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Project Name</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body { height: 100%; overflow: hidden; }
        iframe { width: 100vw; height: 100vh; border: none; display: block; }
        .loading { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); }
        .loading.hidden { display: none; }
    </style>
</head>
<body>
    <div class="loading" id="loading">🚀 Loading Project...</div>
    <iframe
        src="https://wisesolutions-projects.github.io/project-name/"
        onload="document.getElementById('loading').classList.add('hidden')">
    </iframe>
</body>
</html>
```

### GitHub Pages Critical Configuration
- ❌ **NEVER use legacy build**: Always set `build_type: "workflow"`
- ✅ **Check API**: `GET /repos/owner/repo/pages` to verify config
- ✅ **Fix via API**: `PUT /repos/owner/repo/pages` with `{"build_type": "workflow"}`
- ✅ **Main repo CNAME**: `projects.wisesolutions.uk`
- ✅ **Sub repos NO CNAME**: Use default GitHub Pages domain

### Cache Busting Techniques (When GitHub Pages Won't Update)
1. **File rename**: Change file/folder names completely
2. **API configuration**: Switch build_type to force rebuild
3. **Force push**: Multiple commits with different content
4. **New paths**: Use fresh URLs without existing cache

### Advanced Troubleshooting
- 🔍 **Check raw files**: `https://raw.githubusercontent.com/owner/repo/main/file.html`
- 🔍 **Verify API config**: Check `build_type` and `source` settings
- 🔍 **Monitor workflows**: GitHub Actions tab for deployment status
- 🔍 **Test new paths**: Use completely different URLs to bypass cache

### URL Preservation Strategies
1. **❌ Direct redirect**: Changes URL in browser
2. **❌ Meta refresh**: Changes URL in browser
3. **✅ Iframe wrapper**: Preserves custom domain URL
4. **✅ JavaScript proxy**: Advanced but complex

### Working Example - Baby Shower Project
- **Main app**: `wisesolutions-projects.github.io/cha-de-bebe/`
- **Portal integration**: `projects.wisesolutions.uk/cha-de-bebe-mari/`
- **User experience**: URL stays on custom domain
- **Technical solution**: Iframe with loading animation

### Development Workflow Best Practices
- ✅ **Local development FIRST**: Always use `npm run dev` to test changes locally
- ✅ **Test on localhost**: Verify all functionality at `http://localhost:3000`
- ✅ **Build locally**: Run `npm run build` to catch errors before deployment
- ✅ **Deploy only when approved**: Push to GitHub only after changes are confirmed working
- ✅ **Auto-deployment**: GitHub Actions handles deployment automatically on push
- 🎯 **Dual config approach**:
  - Development: No basePath needed for localhost
  - Production: basePath configured in next.config.ts
  - Next.js handles this automatically based on environment

### CSS and Styling Lessons
- ✅ **Font loading**: Google Fonts via `@import` in globals.css works reliably
- ✅ **Custom classes**: Define font classes AFTER Tailwind to prevent override
- ✅ **Z-index hierarchy**: Establish clear layering system:
  - `z-0`: Background decorations
  - `z-5`: Secondary decorative elements
  - `z-10`: Tertiary elements
  - `z-20`: Main content
  - `z-50`: Overlays (modals, confetti)
- ✅ **Mobile-first**: Test on mobile viewport early and often
- ✅ **Responsive design**: Use Tailwind breakpoints (md:, lg:) consistently

### Common Issues & Solutions
**Problem**: Decorative elements overlap text on mobile
- **Solution**: Proper z-index hierarchy with content at higher z-index than decorations

**Problem**: Custom fonts not loading
- **Solution**: Import in globals.css AFTER Tailwind, use `!important` in custom class

**Problem**: Changes not showing on deployed site
- **Solution**: Check GitHub Actions workflow status, wait 1-2 minutes for CDN cache

---
*Last updated: 2025-09-30 - Baby Shower Project COMPLETED*
*Multi-repository architecture with URL preservation ESTABLISHED*
*Development workflow and styling best practices DOCUMENTED*