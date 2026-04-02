const { Client } = require('pg');
require('dotenv').config();

async function debug() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('Connected to database');

    // Check tables
    const tablesRes = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    console.log('Tables:', tablesRes.rows.map(r => r.table_name));

    // Check columns for Course
    if (tablesRes.rows.some(r => r.table_name.toLowerCase() === 'course')) {
      const columnsRes = await client.query(`
        SELECT column_name, data_type 
        FROM information_schema.columns 
        WHERE table_name = 'course' OR table_name = 'Course'
      `);
      console.log('Course Columns:', columnsRes.rows.map(r => `${r.column_name} (${r.data_type})`));
    }

    if (tablesRes.rows.some(r => r.table_name === 'User')) {
      const uColumnsRes = await client.query(`
        SELECT column_name, data_type 
        FROM information_schema.columns 
        WHERE table_name = 'User'
      `);
      console.log('User Columns:', uColumnsRes.rows.map(r => `${r.column_name} (${r.data_type})`));
    }

    // Check Users
    const usersRes = await client.query(`SELECT count(*) FROM "User"`);
    console.log('User count:', usersRes.rows[0].count);
    
    if (usersRes.rows[0].count > 0) {
      const sampleUsers = await client.query(`SELECT id, email, password, role FROM "User"`);
      console.log('Users Data:');
      sampleUsers.rows.forEach(u => {
        console.log(`- ${u.email}: ${u.password.substring(0, 10)}... (role: ${u.role})`);
      });
    }

  } catch (err) {
    console.error('Error debugging database:', err);
  } finally {
    await client.end();
  }
}

debug();
