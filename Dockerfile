FROM node:22.12.0 AS builder

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Set memory limit for build
ENV NODE_OPTIONS="--max-old-space-size=6144"

# Build the application
RUN npm run build

FROM node:22.12.0-bullseye-slim AS runner

WORKDIR /app

# Install only production dependencies
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copy built application from builder stage
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
ENV NODE_ENV=production

# Environment variables that should be set at runtime
# These will be overridden by docker-compose or deployment platform
ENV NEXT_PUBLIC_API_URL=""
ENV NEXTAUTH_URL=""
ENV NEXTAUTH_SECRET=""
ENV GOOGLE_CLIENT_ID=""
ENV GOOGLE_CLIENT_SECRET=""
ENV NEXT_PUBLIC_ONESIGNAL_APP_ID=""

CMD ["node", "server.js"]