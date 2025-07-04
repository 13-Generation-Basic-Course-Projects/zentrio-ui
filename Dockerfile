# 1. Build Stage
FROM node:18-alpine AS builder
WORKDIR /app

# Copy only what's needed for install first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Set environment explicitly
ENV NODE_ENV=production

# Use .env.production for build-time if needed (for static env usage only)
# Note: Next.js replaces `process.env.XYZ` at build time for static files/pages
COPY .env.production .env.production

# Build the Next.js app
RUN npm run build

# 2. Runtime Stage
FROM node:18-alpine AS runner
WORKDIR /app

# Set environment for production
ENV NODE_ENV=production
ENV PORT=3000

# Install only production dependencies (optional)
# COPY package*.json ./
# RUN npm install --omit=dev

# Copy the built output from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.env.production ./.env

# Optional: clean permissions
RUN addgroup -g 1001 -S nextjs && adduser -S nextjs -u 1001 -G nextjs
USER nextjs

EXPOSE 3000

# ❗ Start using built output correctly
CMD ["node", ".next/standalone/server.js"]
