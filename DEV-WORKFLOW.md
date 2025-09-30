# Development Workflow

## Quick Start for Development

### 1. Start Local Development Server
```bash
npm run dev
```
- Opens at: `http://localhost:3000`
- No basePath prefix needed in development
- Hot reload enabled - changes appear instantly

### 2. Make Your Changes
- Edit files in `app/` directory
- Check results in browser at `localhost:3000`
- Test on mobile viewport (DevTools → Toggle Device Toolbar)

### 3. Build and Test
```bash
npm run build
```
- Catches TypeScript errors
- Validates configuration
- Generates static export in `out/` folder

### 4. Deploy (Only When Approved)
```bash
git add .
git commit -m "Your commit message"
git push custom main
```
- GitHub Actions automatically deploys
- Wait 1-2 minutes for deployment
- Check: `projects.wisesolutions.uk/cha-de-bebe-mari/`

## Important Notes

- ✅ **Always develop locally first** - Don't push untested changes
- ✅ **Test mobile responsiveness** - Most users access on mobile
- ✅ **Check z-index layering** - Ensure decorations stay behind content
- ✅ **Verify build succeeds** - Run `npm run build` before pushing
- ⚠️ **Different domains** - Local uses `localhost:3000`, production uses custom domain with basePath

## Troubleshooting

**Changes not showing locally?**
- Hard refresh: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
- Check terminal for errors
- Restart dev server

**Build failing?**
- Check TypeScript errors in output
- Verify all imports are correct
- Check for syntax errors

**Deployed site not updating?**
- Check GitHub Actions tab for workflow status
- Wait 2-3 minutes for CDN cache
- Hard refresh browser cache
