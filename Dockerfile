# Builder stage
FROM node:20-bullseye-slim AS builder
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies with modern flags
RUN npm install --omit=dev --no-audit --no-fund
# Note: Removed --prefer-offline to ensure dependencies are fetched if needed
# Copy application files
COPY . .

# Set conservative memory limit for build
ENV NODE_OPTIONS="--max-old-space-size=512"
RUN npm run build

# Runner stage
FROM node:20-bullseye-slim AS runner
WORKDIR /app

# Set production environment
ENV NODE_ENV=production

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy built artifacts
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000
ENV PORT=3000

# Start app
CMD ["node", "server.js"]