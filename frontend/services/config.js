// Configuração da API
// Para desenvolvimento local, você precisa usar o IP da sua máquina na rede local

// OPÇÃO 1: Para testar no navegador ou emulador
const LOCAL_API = 'http://localhost:3001/api';

// OPÇÃO 2: Para testar no celular físico via Expo Go
// Substitua pelo IP da sua máquina na rede local
// Windows: Execute 'ipconfig' no cmd e veja o IPv4 Address
// Mac/Linux: Execute 'ifconfig' e veja o inet address
const NETWORK_API = 'http://SEU_IP_LOCAL:3001/api'; // Ex: 'http://192.168.1.100:3001/api'

// OPÇÃO 3: Para produção (após publicar o backend)
const PRODUCTION_API = 'https://sua-api-em-producao.com/api';

// Detectar ambiente automaticamente
const getApiUrl = () => {
  // Se estiver em desenvolvimento, tente usar o IP da rede
  if (__DEV__) {
    // Para Expo, use o IP da máquina host
    // Você pode descobrir digitando 'ipconfig' (Windows) ou 'ifconfig' (Mac/Linux)
    
    // IMPORTANTE: Substitua este IP pelo seu IP local!
    const YOUR_LOCAL_IP = '192.168.1.100'; // <-- MUDE AQUI!
    
    return `http://${YOUR_LOCAL_IP}:3001/api`;
  }
  return PRODUCTION_API;
};

export const API_URL = getApiUrl();

// Para debug
console.log('🌐 API URL:', API_URL);
