# Comandos para Push do Novo Repositório

Após criar o repositório `wisesolutions-projects/cha-de-bebe` no GitHub, execute:

```bash
# Adicionar novo remote
git remote add custom https://github.com/wisesolutions-projects/cha-de-bebe.git

# Fazer push dos arquivos configurados para domínio customizado
git add next.config.custom.ts CNAME .github/workflows/deploy-custom-domain.yml
git commit -m "Configure project for projetos.wisesolutions.uk domain

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>"

git push custom main

# Configurar GitHub Pages (via interface web):
# 1. Settings > Pages
# 2. Source: GitHub Actions
# 3. Aguardar deploy
```

## Resultado Final
- **URL**: projetos.wisesolutions.uk/cha-de-bebe/
- **Deploy**: Automático via GitHub Actions
- **CNAME**: Configurado para domínio customizado