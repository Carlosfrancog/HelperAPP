@echo off
chcp 65001 > nul
cls

echo 🚀 Iniciando Klass...
echo.

REM Subir containers do Docker (backend + database)
echo 📦 Iniciando Docker containers (backend + PostgreSQL)...
docker-compose up -d

REM Aguardar containers iniciarem
echo ⏳ Aguardando containers iniciarem...
timeout /t 5 /nobreak > nul

REM Verificar se os containers estão rodando
echo ✅ Verificando status dos containers...
docker-compose ps

echo.
echo 📱 Iniciando Expo App...
echo.

REM Entrar na pasta frontend
cd frontend

REM Verificar se node_modules existe
if not exist "node_modules" (
    echo 📥 Instalando dependências do frontend...
    call npm install
)

REM Iniciar o Expo
echo 🌐 Iniciando Expo Development Server...
echo.
echo Para testar o app:
echo   - Baixe o Expo Go no seu celular
echo   - Escaneie o QR code que aparecerá
echo   - Ou pressione 'w' para abrir no navegador
echo.
call npm start
