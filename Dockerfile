# 1. Use official Node.js image as the base
FROM node:18-alpine AS builder

# 2. Set working directory
WORKDIR /app

# 3. Copy package.json and package-lock.json
COPY package*.json ./

# 4. Install dependencies
RUN npm ci

# 5. Copy the rest of the application code
COPY . .

# 6. Build the Next.js app
RUN npm run build

# 7. Use a smaller image for the final stage
FROM node:18-alpine AS runner

WORKDIR /app

# 8. Copy only necessary files from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/app ./app
COPY --from=builder /app/components ./components
COPY --from=builder /app/assets ./assets
COPY --from=builder /app/constant ./constant
COPY --from=builder /app/context ./context
COPY --from=builder /app/data ./data
COPY --from=builder /app/hooks ./hooks
COPY --from=builder /app/lib ./lib
COPY --from=builder /app/routes ./routes
COPY --from=builder /app/service ./service
COPY --from=builder /app/styles ./styles
COPY --from=builder /app/utils ./utils

# 9. Expose port (default for Next.js)
EXPOSE 3000

# 10. Start the Next.js app
CMD ["npm", "start"]