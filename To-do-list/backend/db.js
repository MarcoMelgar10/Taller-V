const { Pool } = require("pg");
const pool = new Pool({
  connectionString: "postgresql://neondb_owner:npg_ZDp3dbgRMY5C@ep-raspy-darkness-adf1yrln-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require"
});

module.exports = pool;