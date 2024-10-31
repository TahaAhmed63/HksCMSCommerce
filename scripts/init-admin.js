// scripts/init-admin.js
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const readline = require('readline');

const prisma = new PrismaClient();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}

async function initializeAdmin() {
  try {
    const existingAdmin = await prisma.AdminUser.findFirst({
      where: { role: 'admin' }
    });

    if (existingAdmin) {
      console.log('An admin user already exists. Aborting initialization.');
      return;
    }

    const username = await question('Enter admin username: ')
    const email = await question('Enter admin email: ')
    const password = await question('Enter admin password: ')
    const firstName = await question('Enter admin first name: ')
    const lastName = await question('Enter admin last name: ')
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const admin = await prisma.AdminUser.create({
      data: {
        username,
        email,
        password: hashedPassword,
        first_name: firstName,
        last_name: lastName,
        role: 'admin',
        status: 'active',
      },
    });

    console.log('Admin user created successfully:', admin.email);
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await prisma.$disconnect();
    rl.close();
  }
}

initializeAdmin();

