#!/bin/bash

echo "🚀 Iniciando Klass..."
echo ""

# Subir containers do Docker (backend + database)
echo "📦 Iniciando Docker containers (backend + PostgreSQL)..."
docker-compose up -d

# Aguardar containers iniciarem
echo "⏳ Aguardando containers iniciarem..."
sleep 5

# Verificar se os containers estão rodando
echo "✅ Verificando status dos containers..."
docker-compose ps

echo ""
echo "📱 Iniciando Expo App..."
echo ""

# Entrar na pasta frontend e instalar dependências se necessário
cd frontend

# Verificar se node_modules existe
if [ ! -d "node_modules" ]; then
    echo "📥 Instalando dependências do frontend..."
    npm install
fi

# Iniciar o Expo
echo "🌐 Iniciando Expo Development Server..."
echo ""
echo "Para testar o app:"
echo "  - Baixe o Expo Go no seu celular"
echo "  - Escaneie o QR code que aparecerá"
echo "  - Ou pressione 'w' para abrir no navegador"
echo ""
npm start
