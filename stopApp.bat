@echo off
chcp 65001 > nul
cls

echo 🛑 Parando Klass...
echo.

REM Parar containers do Docker
echo 📦 Parando Docker containers...
docker-compose down

echo.
echo ✅ Aplicação parada com sucesso!
echo.
echo ℹ️  Para iniciar novamente, execute: startApp.bat
pause
