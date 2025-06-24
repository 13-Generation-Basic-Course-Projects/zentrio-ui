# Use the same base image for both stages to reduce layer differences
FROM node:22.12.0-bullseye-slim AS builder

# Set the working directory
WORKDIR /app

# Copy package files first (for better caching)
COPY package*.json ./

# Install dependencies with optimization flags
RUN npm ci --only=production --no-audit --no-fund --prefer-offline

# Copy the rest of the application files
COPY . .

# Set Node.js memory limit and build
ENV NODE_OPTIONS="--max-old-space-size=4096"
RUN npm run build

# Production runner stage
FROM node:22.12.0-bullseye-slim AS runner

# Set working directory
WORKDIR /app

# Set production environment
ENV NODE_ENV=production

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy built application from builder stage
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to non-root user
USER nextjs

# Expose the Next.js default port
EXPOSE 3000

# Set port environment variable
ENV PORT=3000

# Start the Next.js app
CMD ["node", "server.js"]