# Contexto do Projeto Klass - Estado Atual

**Data**: 26 de fevereiro de 2026
**Último Update**: Tentativas de build EAS

## 📋 Situação Atual

### ✅ O que está funcionando:
1. **Backend Docker** - Rodando corretamente em containers
   - PostgreSQL no container `klass-db`
   - API Node.js no container `klass-backend`
   - Porta 3001 exposta
   - Autenticação JWT implementada

2. **Estrutura do App React Native**
   - Expo configurado com Expo Router
   - Telas criadas: Login, Register, Profile
   - Context API para autenticação
   - AsyncStorage para persistência

3. **Git & Expo**
   - Repositório: github.com/Carlosfrancog/HelperAPP
   - EAS configurado com Project ID: `10195a78-a1b9-4bd0-9532-4fec615e2358`
   - Owner: carlosefg
   - Login EAS realizado

### ❌ Problemas Encontrados:

#### 1. Frontend não sobe no localhost
**Problema**: Ao tentar rodar `npx expo start`, o frontend não está subindo corretamente no localhost
**Possíveis causas**:
- Conflito de dependências
- Configuração do Metro bundler
- Assets faltando (icon.png, splash.png, adaptive-icon.png)

#### 2. Builds EAS falhando
**Tentativas realizadas**:
- `eas build --platform android --profile development` - FALHOU
- `eas build --platform android --profile preview` - FALHOU
- `eas build --platform android --profile development --local` - FALHOU

**Erro principal**: 
```
Gradle build failed with unknown error
```

**Builds criados**:
- Build ID: 29dc27ef-08cb-4681-946c-d9bcf25bc8f8 (development) - FAILED
- Build ID: 02be6cd0-539f-40c9-a4df-dfecd71749a0 (preview) - FAILED

#### 3. Assets faltando
- `./assets/icon.png` - NÃO EXISTE
- `./assets/splash.png` - NÃO EXISTE  
- `./assets/adaptive-icon.png` - NÃO EXISTE
- `./assets/favicon.png` - NÃO EXISTE

**Solução temporária aplicada**: Removidos do app.json para usar defaults do Expo

## 📁 Estrutura do Projeto

```
HelperAPP/ (raiz do repositório)
├── backend/
│   ├── src/
│   │   ├── config/database.js
│   │   ├── middleware/auth.js
│   │   ├── routes/auth.js
│   │   ├── routes/users.js
│   │   └── server.js
│   ├── .env (DATABASE_URL=postgresql://postgres:postgres@db:5432/klass)
│   ├── .env.example
│   ├── Dockerfile
│   ├── init.sql
│   └── package.json
├── frontend/
│   ├── app/
│   │   ├── _layout.jsx
│   │   ├── index.jsx
│   │   ├── login.jsx
│   │   ├── register.jsx
│   │   └── profile.jsx
│   ├── contexts/
│   │   └── AuthContext.jsx
│   ├── services/
│   │   ├── api.js
│   │   └── config.js (API_URL configurável)
│   ├── assets/ (VAZIO - precisa criar ícones)
│   ├── app.json (sem assets configurados)
│   ├── eas.json
│   ├── metro.config.js
│   ├── babel.config.js
│   └── package.json
├── docker-compose.yml
├── startApp.bat / startApp.sh
├── stopApp.bat / stopApp.sh
├── README.md
├── PUBLISH.md
└── QUICKSTART.md
```

## 🔧 Configurações

### package.json (frontend)
```json
{
  "name": "klass-mobile",
  "dependencies": {
    "expo": "^51.0.0",
    "expo-router": "^3.5.0",
    "react-native": "0.74.0",
    "axios": "^1.6.0",
    "expo-dev-client": "instalado",
    "expo-updates": "~0.25.0"
  }
}
```

### app.json (frontend - configuração atual)
```json
{
  "expo": {
    "name": "Klass",
    "slug": "klass",
    "version": "1.0.0",
    "scheme": "klass",
    "android": {
      "package": "com.klass"
    },
    "ios": {
      "bundleIdentifier": "com.klass"
    },
    "extra": {
      "eas": {
        "projectId": "10195a78-a1b9-4bd0-9532-4fec615e2358"
      }
    },
    "owner": "carlosefg",
    "runtimeVersion": {
      "policy": "appVersion"
    },
    "updates": {
      "url": "https://u.expo.dev/10195a78-a1b9-4bd0-9532-4fec615e2358"
    }
  }
}
```

## 🚧 Próximos Passos Necessários

### 1. URGENTE - Resolver Frontend Local
- [ ] Verificar por que `npx expo start` não está funcionando
- [ ] Checar logs de erro detalhados
- [ ] Verificar se porta 8081 (Metro bundler) está livre
- [ ] Testar com `npx expo start --clear`

### 2. Criar Assets
- [ ] Gerar icon.png (1024x1024)
- [ ] Gerar adaptive-icon.png (1024x1024)
- [ ] Gerar splash.png
- [ ] Adicionar ao `frontend/assets/`

### 3. Corrigir API URL para Mobile
**IMPORTANTE**: O arquivo `frontend/services/config.js` precisa ser configurado com o IP local da máquina.

**Linha 20**: Trocar `192.168.1.100` pelo IP real obtido com `ipconfig` (Windows) ou `ifconfig` (Mac/Linux)

### 4. Tentar Build Novamente
Após resolver o frontend local:
```bash
cd frontend
eas build --platform android --profile preview
```

## 💡 Comandos Importantes

### Iniciar Backend (Docker)
```bash
docker-compose up -d
docker-compose ps  # verificar status
docker-compose logs -f  # ver logs
```

### Testar API
```bash
curl http://localhost:3001/health
# Deve retornar: {"status":"OK"}
```

### Iniciar Frontend (quando corrigido)
```bash
cd frontend
npm start  # ou npx expo start
```

### Ver logs do Metro Bundler
```bash
cd frontend
npx expo start --clear  # limpar cache
```

### Comandos EAS
```bash
cd frontend
eas login
eas whoami  # verificar login
eas build:list  # ver builds
eas project:info  # info do projeto
```

## 🐛 Erros Conhecidos

### Axios crypto error
**Descrição**: `Unable to resolve module crypto`
**Causa**: Axios tentando usar módulos Node.js em React Native
**Solução aplicada**: 
- Downgrade para axios@1.6.0
- Adicionado metro.config.js com suporte a .cjs

### Assets não encontrados
**Descrição**: `ENOENT: no such file or directory, open 'assets/adaptive-icon.png'`
**Solução temporária**: Removidos do app.json
**Solução permanente**: Criar os assets ou usar gerador

## 📝 Notas

- O projeto foi renomeado de "HelperApp" para "Klass"
- Database: `klass` (não `helperapp`)
- Containers: `klass-db`, `klass-backend`
- Último commit: Refactor de HelperApp para Klass + configuração Expo

## 🔗 Links Úteis

- Dashboard Expo: https://expo.dev/accounts/carlosefg/projects/klass
- Logs de Build: https://expo.dev/accounts/carlosefg/projects/klass/builds
- Repositório GitHub: https://github.com/Carlosfrancog/HelperAPP

## ⚠️ Ação Imediata Necessária

**PROBLEMA CRÍTICO**: Frontend não está subindo no localhost

**Debug necessário**:
1. Executar `cd frontend && npx expo start` e capturar erro completo
2. Verificar se há conflito de porta (8081)
3. Verificar integridade do package.json
4. Testar com `npx expo start --tunnel` como alternativa
5. Considerar reinstalar node_modules: `rm -rf node_modules && npm install`

**Após resolver**:
- Testar no Expo Go (celular)
- Configurar IP correto em `services/config.js`
- Tentar build EAS novamente com assets corretos
