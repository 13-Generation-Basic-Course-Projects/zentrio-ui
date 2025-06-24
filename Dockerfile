FROM node:22.12.0 AS builder

WORKDIR /app

# Copy .env file for build-time variables
COPY .env* ./

COPY package*.json ./
RUN npm install
COPY . .
# Set memory limit for build
ENV NODE_OPTIONS="--max-old-space-size=2048"
RUN npm run build

FROM node:22.12.0-bullseye-slim AS runner

# Copy .env file for runtime variables (if needed)
COPY --from=builder /app/.env* ./standalone/

COPY --from=builder /app/.next/standalone ./standalone
COPY --from=builder /app/public ./standalone/public
COPY --from=builder /app/.next/static ./standalone/.next/static

EXPOSE 3000
CMD ["node", "./standalone/server.js"]