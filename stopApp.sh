#!/bin/bash

echo "🛑 Parando Klass..."
echo ""

# Parar containers do Docker
echo "📦 Parando Docker containers..."
docker-compose down

echo ""
echo "✅ Aplicação parada com sucesso!"
echo ""
echo "ℹ️  Para iniciar novamente, execute: ./startApp.sh"
