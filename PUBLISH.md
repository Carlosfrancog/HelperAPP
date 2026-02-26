# Guia de Publicação no Expo.dev

## Pré-requisitos

1. Instalar EAS CLI globalmente (já instalado):
```bash
npm install --global eas-cli
```

2. Criar conta no [Expo.dev](https://expo.dev)

## Login no EAS

```bash
cd frontend
eas login
```

## Configurar o Projeto

O projeto já está configurado com:
- Project ID: `10195a78-a1b9-4bd0-9532-4fec615e2358`
- Slug: `klass`

## Publicar Update (sem build)

Para publicar atualizações OTA (Over-The-Air) sem recompilar o app:

```bash
cd frontend
eas update --auto
```

Ou especificar um branch:

```bash
eas update --branch production --message "Descrição da atualização"
```

## Build do App

### Build de Preview (para testar internamente)

```bash
cd frontend
eas build --platform android --profile preview
```

ou para iOS:

```bash
eas build --platform ios --profile preview
```

### Build de Produção

Para Android:
```bash
eas build --platform android --profile production
```

Para iOS:
```bash
eas build --platform ios --profile production
```

Para ambos:
```bash
eas build --platform all --profile production
```

## Submeter para as Lojas

### Google Play Store

```bash
eas submit --platform android
```

### Apple App Store

```bash
eas submit --platform ios
```

## Comandos Úteis

### Ver builds anteriores
```bash
eas build:list
```

### Ver updates publicados
```bash
eas update:list
```

### Configurar notificações push
```bash
eas credentials
```

## Perfis de Build (eas.json)

- **development**: Build de desenvolvimento com cliente Expo
- **preview**: Build interno para testes
- **production**: Build final para as lojas

## Notas Importantes

1. **Assets**: Adicione os ícones e splash screen em `frontend/assets/`:
   - `icon.png` (1024x1024)
   - `adaptive-icon.png` (1024x1024, Android)
   - `splash.png` (Android: 1284x2778, iOS: Custom)
   - `favicon.png` (48x48, Web)

2. **Bundle Identifiers**: 
   - iOS: `com.klass` (definido em app.json)
   - Android: `com.klass` (definido em app.json)

3. **Versioning**: Atualize a versão em `app.json` antes de cada build:
   ```json
   {
     "expo": {
       "version": "1.0.1"
     }
   }
   ```

4. **Environment Variables**: Para configurar variáveis de ambiente:
   ```bash
   eas secret:create --name API_URL --value https://api.exemplo.com
   ```

## Testando o Build

Após o build, você receberá um link para download ou QR code para instalar o app no dispositivo.

## Links Úteis

- Dashboard do Projeto: https://expo.dev/accounts/[seu-usuario]/projects/klass
- Documentação EAS: https://docs.expo.dev/eas/
- Expo Updates: https://docs.expo.dev/eas-update/introduction/
