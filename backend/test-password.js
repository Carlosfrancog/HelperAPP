const bcrypt = require('bcryptjs');
const db = require('./src/config/database');

async function test() {
  try {
    const password = 'Klass#dev';
    
    // Buscar o hash do banco
    const result = await db.query('SELECT password FROM users WHERE email = $1', ['dev@klass.com.br']);
    
    if (result.rows.length === 0) {
      console.log('❌ Usuário não encontrado');
      process.exit(1);
    }
    
    const storedHash = result.rows[0].password;
    
    console.log('🔍 Informações:');
    console.log('   Senha testada:', password);
    console.log('   Hash do banco:', storedHash.substring(0, 30) + '...');
    console.log('   Tamanho do hash:', storedHash.length);
    
    // Testar comparação
    const isValid = await bcrypt.compare(password, storedHash);
    console.log('   Resultado:', isValid ? '✅ VÁLIDO' : '❌ INVÁLIDO');
    
    // Criar novo hash para comparar
    const newHash = await bcrypt.hash(password, 10);
    console.log('\n🔑 Novo hash criado:', newHash.substring(0, 30) + '...');
    
    const testNew = await bcrypt.compare(password, newHash);
    console.log('   Teste com novo hash:', testNew ? '✅ VÁLIDO' : '❌ INVÁLIDO');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Erro:', error);
    process.exit(1);
  }
}

test();
