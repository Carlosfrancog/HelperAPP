# Estratégia de Branching - Klass

## 🌿 Estrutura de Branches

### `main` - Branch Protegida
- **Propósito**: Código em produção
- **Proteção**: Ativa
- **Push Direto**: ❌ Não permitido
- **Merge**: Apenas via Pull Request da branch `development`

### `development` - Branch de Desenvolvimento
- **Propósito**: Código em desenvolvimento ativo
- **Push Direto**: ✅ Permitido
- **Base**: Para novas features e correções

## 📋 Workflow

### Para Desenvolvimento Normal
```bash
# 1. Certifique-se de estar na branch development
git checkout development

# 2. Faça suas alterações
# ... editar arquivos ...

# 3. Commit
git add .
git commit -m "feat: descrição da feature"

# 4. Push
git push origin development
```

### Para Enviar para Produção
```bash
# 1. Na branch development, certifique-se que tudo está commitado
git push origin development

# 2. Vá para o GitHub
# 3. Crie um Pull Request de development -> main
# 4. Revise as mudanças
# 5. Merge o PR
```

## 🔒 Configuração de Proteção no GitHub

Para proteger a branch `main`, siga estes passos no GitHub:

1. Acesse: `Settings` → `Branches`
2. Em "Branch protection rules", clique em `Add rule`
3. Configure:
   - **Branch name pattern**: `main`
   - ✅ `Require a pull request before merging`
   - ✅ `Require approvals` (opcional, se trabalhar em equipe)
   - ✅ `Do not allow bypassing the above settings`
4. Clique em `Create` ou `Save changes`

## 🚀 Comandos Úteis

```bash
# Ver branch atual
git branch

# Trocar de branch
git checkout development
git checkout main

# Ver status
git status

# Ver histórico
git log --oneline

# Atualizar branch local com remota
git pull origin development
```

## 📝 Convenção de Commits

Use commits semânticos:
- `feat:` - Nova funcionalidade
- `fix:` - Correção de bug
- `docs:` - Documentação
- `style:` - Formatação
- `refactor:` - Refatoração de código
- `test:` - Testes
- `chore:` - Tarefas gerais (build, config, etc)

**Exemplo:**
```bash
git commit -m "feat: adicionar página de perfil do usuário"
git commit -m "fix: corrigir validação de email no login"
```
