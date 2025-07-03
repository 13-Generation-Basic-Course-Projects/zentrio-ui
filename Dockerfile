# 1. Build Stage
FROM node:18-alpine AS builder
WORKDIR /app

# Copy env and install deps
COPY .env.production .env
COPY package*.json ./
RUN npm install

# Copy app and build
COPY . .
RUN npm run build

# 2. Runtime Stage
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy necessary files
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/.env .env

EXPOSE 3000
CMD ["node", "server.js"]
