# 1. Build Stage
FROM node:22.12.0 AS builder
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy project files
COPY . .

# Use extra memory if needed
ENV NODE_OPTIONS="--max-old-space-size=6144"

# Build the app (uses .env.production automatically if present)
RUN npm run build

# 2. Runtime Image
FROM node:22.12.0-bullseye-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy only what's needed
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["node", "server.js"]
