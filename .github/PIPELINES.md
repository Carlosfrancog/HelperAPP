# Configuração GitHub Actions - EAS Deploy

Este repositório está configurado com pipelines CI/CD automáticas para Expo/EAS.

## 🚀 Pipelines Configuradas

### 1. **EAS Update Automático** (`eas-deploy.yml`)

**Quando roda:**
- ✅ Automaticamente em **todo push** na branch `main`

**O que faz:**
1. **Update**: Publica update OTA no Expo automaticamente
2. **Build** (condicional): Faz build Android se o commit contiver `[build]` ou `[android]`

**Exemplo de uso:**
```bash
# Update automático
git commit -m "feat: Nova tela de configurações"
git push

# Update + Build
git commit -m "feat: Nova feature [build]"
git push
```

### 2. **Build Manual** (`eas-build-manual.yml`)

**Quando roda:**
- ✅ Manualmente via GitHub Actions

**Como usar:**
1. Vá em: `Actions` → `EAS Build Manual` → `Run workflow`
2. Escolha:
   - **Platform**: android, ios, ou all
   - **Profile**: development, preview, ou production
3. Clique em `Run workflow`

## 🔑 Configuração Necessária (IMPORTANTE!)

### 1. Obter Token do Expo

```bash
# No seu terminal local
eas login
expo whoami  # confirmar login
eas token:create
```

Copie o token gerado.

### 2. Adicionar Secret no GitHub

1. Vá em: **Settings** → **Secrets and variables** → **Actions**
2. Clique em **New repository secret**
3. Nome: `EXPO_TOKEN`
4. Valor: Cole o token que você copiou
5. Clique em **Add secret**

## 📋 Como Usar

### Update Automático (OTA)

Simplesmente faça push:

```bash
git add .
git commit -m "fix: Correção de bugs"
git push
```

A pipeline irá automaticamente:
1. Instalar dependências
2. Publicar update no Expo
3. Usuários receberão a atualização automaticamente

### Build Automático

Inclua `[build]` ou `[android]` na mensagem do commit:

```bash
git commit -m "feat: Nova versão completa [build]"
git push
```

Isso irá:
1. Fazer o update OTA
2. Iniciar build do APK Android (perfil preview)

### Build Manual

1. Acesse: `https://github.com/Carlosfrancog/HelperAPP/actions`
2. Clique em **EAS Build Manual**
3. Clique em **Run workflow**
4. Selecione plataforma e perfil
5. Clique em **Run workflow**

## 📊 Monitorar Pipelines

### Ver status das pipelines
- GitHub: `https://github.com/Carlosfrancog/HelperAPP/actions`
- Expo: `https://expo.dev/accounts/carlosefg/projects/klass`

### Ver logs
- Clique no workflow em execução
- Expanda os steps para ver logs detalhados

## 🎯 Perfis de Build

| Perfil | Descrição | Quando usar |
|--------|-----------|-------------|
| **development** | Build com dev tools | Desenvolvimento local |
| **preview** | APK instalável | Testes internos |
| **production** | Build otimizado | Publicação nas lojas |

## 💡 Dicas

### Mensagens de Commit

- **Update apenas**: `git commit -m "fix: correção de bug"`
- **Update + Build**: `git commit -m "feat: nova feature [build]"`
- **Build Android**: `git commit -m "chore: release [android]"`

### Cache de Dependências

As pipelines usam cache do npm para acelerar:
- Primeira execução: ~2-3 minutos
- Execuções seguintes: ~30-60 segundos

### Branches

Por padrão, as pipelines rodam apenas em `main`. Para adicionar outras branches:

```yaml
on:
  push:
    branches:
      - main
      - develop  # adicione aqui
```

## ⚠️ Troubleshooting

### "EXPO_TOKEN not found"
- Verifique se adicionou o secret no GitHub
- Nome deve ser exatamente `EXPO_TOKEN`

### Build falha
- Veja os logs detalhados no GitHub Actions
- Verifique se o projeto builda localmente: `eas build --platform android --profile preview`

### Update falha
- Verifique se o projeto exporta: `npx expo export`
- Veja logs em `https://expo.dev/accounts/carlosefg/projects/klass`

## 🔗 Links Úteis

- **GitHub Actions**: https://github.com/Carlosfrancog/HelperAPP/actions
- **Expo Dashboard**: https://expo.dev/accounts/carlosefg/projects/klass
- **Expo Docs**: https://docs.expo.dev/eas/
- **GitHub Actions Docs**: https://docs.github.com/actions

## 📝 Próximos Passos

1. [ ] Adicionar `EXPO_TOKEN` nos secrets do GitHub
2. [ ] Fazer primeiro push para testar update automático
3. [ ] Testar build manual via Actions
4. [ ] Configurar notificações de build (opcional)
