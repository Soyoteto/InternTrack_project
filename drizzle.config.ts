import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const config = {
  schema: './src/db/schema.ts',
  out: './drizzle',
  driver: 'turso',
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  },
};
export default config;