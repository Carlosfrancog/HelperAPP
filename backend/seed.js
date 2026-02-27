const bcrypt = require('bcryptjs');
const db = require('./src/config/database');

async function seed() {
  try {
    console.log('🌱 Iniciando seeder...');

    // Usuários para criar
    const users = [
      { name: 'Dev', email: 'dev@klass.com.br', password: 'Klass#dev' },
      { name: 'Beta Tester 1', email: 'beta1@klass.com.br', password: 'Beta#123' },
      { name: 'Beta Tester 2', email: 'beta2@klass.com.br', password: 'Beta#123' },
      { name: 'Beta Tester 3', email: 'beta3@klass.com.br', password: 'Beta#123' },
      { name: 'Beta Tester 4', email: 'beta4@klass.com.br', password: 'Beta#123' },
      { name: 'Beta Tester 5', email: 'beta5@klass.com.br', password: 'Beta#123' },
      { name: 'Beta Tester 6', email: 'beta6@klass.com.br', password: 'Beta#123' },
      { name: 'Beta Tester 7', email: 'beta7@klass.com.br', password: 'Beta#123' },
      { name: 'Beta Tester 8', email: 'beta8@klass.com.br', password: 'Beta#123' },
      { name: 'Beta Tester 9', email: 'beta9@klass.com.br', password: 'Beta#123' },
    ];

    let created = 0;
    let existing = 0;

    for (const userData of users) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);

      // Verificar se o usuário já existe
      const userExists = await db.query(
        'SELECT * FROM users WHERE email = $1',
        [userData.email]
      );

      if (userExists.rows.length > 0) {
        console.log(`⚠️  ${userData.email} já existe`);
        existing++;
      } else {
        // Criar usuário
        const result = await db.query(
          `INSERT INTO users (name, email, password) 
           VALUES ($1, $2, $3) 
           RETURNING id, name, email`,
          [userData.name, userData.email, hashedPassword]
        );

        console.log(`✅ ${result.rows[0].email} criado (ID: ${result.rows[0].id})`);
        created++;
      }
    }

    console.log('\n📊 Resumo:');
    console.log(`   ✅ Criados: ${created}`);
    console.log(`   ⚠️  Já existiam: ${existing}`);
    console.log(`   📝 Total: ${users.length}`);

    console.log('\n📋 Credenciais:');
    console.log('   Dev:');
    console.log('     Email: dev@klass.com.br');
    console.log('     Senha: Klass#dev');
    console.log('');
    console.log('   Beta Testers (beta1 a beta9):');
    console.log('     Email: beta[1-9]@klass.com.br');
    console.log('     Senha: Beta#123');
    console.log('');

    process.exit(0);
  } catch (error) {
    console.error('❌ Erro ao executar seeder:', error);
    process.exit(1);
  }
}

seed();
