# Template para Projetos em projetos.wisesolutions.uk

## Configuração Next.js para Domínio Customizado

```typescript
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  // NO basePath/assetPrefix - usa domínio customizado
  images: {
    unoptimized: true
  }
};

export default nextConfig;
```

## GitHub Actions Workflow

```yaml
name: Deploy to Custom Domain
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
      - name: Add CNAME
        run: echo 'projetos.wisesolutions.uk' > out/CNAME
      - uses: actions/configure-pages@v4
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./out
      - uses: actions/deploy-pages@v4
```

## Estrutura de Pastas Sugerida

```
projetos.wisesolutions.uk/
├── nome-do-projeto/          ← URL final
└── outro-projeto/
```

## Arquivos Obrigatórios
- `.nojekyll` (para evitar Jekyll)
- `CNAME` com "projetos.wisesolutions.uk"
- GitHub Actions workflow

## Checklist para Novo Projeto
- [ ] Criar repositório: wisesolutions-projects/nome-do-projeto
- [ ] Configurar GitHub Pages (Settings > Pages > Source: GitHub Actions)
- [ ] Adicionar workflow de deploy
- [ ] Testar com projetos.wisesolutions.uk/nome-do-projeto