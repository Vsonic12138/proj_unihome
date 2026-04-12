import pg from 'pg';
const { Client } = pg;

async function fix() {
  const client = new Client({
    connectionString: "postgresql://proj_uinhome:proj_uinhome_password@localhost:5432/proj_uinhome?sslmode=disable"
  });
  await client.connect();
  console.log('Connected to DB');
  
  try {
     const res1 = await client.query('DELETE FROM site_settings;');
     console.log('Deleted site_settings:', res1.rowCount);
  } catch (e) { console.log(e.message); }
  
  try {
     const res2 = await client.query("DELETE FROM payload_globals WHERE global = 'siteSettings';");
     console.log('Deleted payload_globals:', res2.rowCount);
  } catch (e) { console.log(e.message); }
  
  await client.end();
  process.exit(0);
}
fix();
