FROM docker.1ms.run/library/node:20-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm && pnpm install

COPY src ./src
COPY tsconfig.json ./tsconfig.json
COPY drizzle.config.json ./drizzle.config.json

EXPOSE 3001

CMD ["sh", "-c", "npx drizzle-kit push && npx tsx src/db/seed.ts && npx tsx src/server.ts"]
