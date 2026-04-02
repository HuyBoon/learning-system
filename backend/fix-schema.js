const { Client } = require('pg');
require('dotenv').config();

async function fixSchema() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('Connected to database');

    console.log('Adding thumbnail column to Course table...');
    await client.query(`ALTER TABLE "Course" ADD COLUMN IF NOT EXISTS "thumbnail" TEXT`);
    console.log('Column added successfully.');

  } catch (err) {
    console.error('Error fixing schema:', err);
  } finally {
    await client.end();
  }
}

fixSchema();
