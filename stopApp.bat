@echo off
chcp 65001 > nul
cls

echo 🛑 Parando Klass...
echo.

REM Parar processos Node.js (frontend)
echo 🔴 Parando processos do frontend...
taskkill /F /IM node.exe /T 2>nul
if %errorlevel% == 0 (
    echo ✅ Processos Node.js encerrados
) else (
    echo ℹ️  Nenhum processo Node.js ativo
)

echo.

REM Parar containers do Docker
echo 📦 Parando Docker containers...
docker-compose down

echo.
echo ✅ Aplicação parada com sucesso!
echo.
echo ℹ️  Para iniciar novamente, execute: startApp.bat
pause
