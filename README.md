# saas-boilerplate

Use next.js, tailwind, postgres and next-auth to build an app.

### Quickstart

Install dependencies
```
npm install
```

Set up `.env`

```
npx prisma db push
npx prisma generate
npm run dev
```

### Example .env

I recommend using Vercel Postgres for the postgres instance.

```
# Set up a new vercel postgres instance and copy details here:
POSTGRES_URL=""
POSTGRES_PRISMA_URL=""
POSTGRES_URL_NON_POOLING=""
POSTGRES_USER=""
POSTGRES_HOST=""
POSTGRES_PASSWORD=""
POSTGRES_DATABASE=""

# Set up google auth and copy details here:
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# Generate a random string and copy here:
NEXTAUTH_SECRET=""
```