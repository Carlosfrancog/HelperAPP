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

REM Iniciar o Expo Web
echo 🌐 Iniciando Klass Web...
echo.
echo 🚀 Abrindo aplicação no navegador...
echo.

REM Iniciar a versão web do Vite em segundo plano
start /B cmd /c "npm run dev"

REM Aguardar alguns segundos para o servidor iniciar
timeout /t 8 /nobreak > nul

REM Abrir o navegador automaticamente
start http://localhost:3000

echo.
echo ✅ Aplicação iniciada!
echo   Frontend (Web): http://localhost:3000
echo   Backend API: http://localhost:3001
echo.
echo Para parar a aplicação, execute: stopApp.bat
echo.
pause
