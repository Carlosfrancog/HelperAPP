# Quick Start - Klass 🚀

## 1️⃣ Iniciar o Projeto (pela primeira vez)

### Windows:
```bash
startApp.bat
```

### Linux/Mac:
```bash
chmod +x startApp.sh
./startApp.sh
```

## 2️⃣ Testar o App

Após iniciar, você verá um QR code no terminal.

### No seu celular:
1. **Android**: Baixe o app [Expo Go](https://play.google.com/store/apps/details?id=host.exp.exponent)
2. **iOS**: Baixe o app [Expo Go](https://apps.apple.com/app/expo-go/id982107779)
3. Abra o Expo Go e escaneie o QR code
4. O app vai carregar no seu celular!

### No navegador (para web):
Pressione `w` no terminal

### No emulador:
- Android: pressione `a` (requer Android Studio)
- iOS: pressione `i` (requer Xcode - somente Mac)

## 3️⃣ Testar as funcionalidades

1. Crie uma conta na tela de registro
2. Faça login
3. Acesse e edite seu perfil
4. Adicione uma foto de avatar (URL) e bio

## 4️⃣ Parar o Projeto

### Windows:
```bash
stopApp.bat
```

### Linux/Mac:
```bash
./stopApp.sh
```

## 📝 URLs Importantes

- **Backend API**: http://localhost:3001
- **Health Check**: http://localhost:3001/health
- **Expo Dev Tools**: Aberto automaticamente no navegador

## 🔑 Credenciais Padrão do Banco

- **Host**: localhost:5432
- **Database**: klass
- **User**: postgres
- **Password**: postgres

## 🆘 Problemas Comuns

### Docker não está rodando
```bash
# Verificar se o Docker está ativo
docker ps
```

### Porta já está em uso
```bash
# Listar processos nas portas
netstat -ano | findstr :3001  # Windows
lsof -i :3001                 # Linux/Mac
```

### App não conecta ao backend
O app no celular precisa estar na mesma rede Wi-Fi que o computador.
Altere a URL da API em `frontend/services/api.js` para o IP local da sua máquina:
```javascript
baseURL: 'http://SEU_IP_LOCAL:3001/api',  // ex: 'http://192.168.1.100:3001/api'
```

### Resetar o banco de dados
```bash
docker-compose down -v
docker-compose up -d
```

## 📱 Publicar no Expo.dev

Consulte o arquivo [PUBLISH.md](PUBLISH.md) para instruções completas de publicação.

---

**Pronto!** Agora você pode desenvolver o app. Qualquer mudança no código será refletida automaticamente no app (hot reload).
