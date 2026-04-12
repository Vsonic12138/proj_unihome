import 'dotenv/config';
import { Client } from 'pg';

async function main() {
  const client = new Client({
    connectionString: process.env.DATABASE_URI,
  });

  await client.connect();
  const res = await client.query('SELECT current_database(), current_schema(), inet_server_addr(), version();');
  console.log("=== Next.js DB Connection Info ===");
  console.log(res.rows[0]);

  const tablesRes = await client.query(`
    SELECT table_schema, table_name 
    FROM information_schema.tables 
    WHERE table_schema NOT IN ('information_schema', 'pg_catalog') 
    ORDER BY table_schema, table_name;
  `);
  console.log("\n=== Tables ===");
  tablesRes.rows.forEach(r => console.log(`${r.table_schema}.${r.table_name}`));

  await client.end();
}

main().catch(console.error);
