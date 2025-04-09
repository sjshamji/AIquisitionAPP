# Stage 1: Dependencies
FROM node:18-alpine AS deps
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci

# Stage 2: Builder
FROM node:18-alpine AS builder
WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set environment variables for build time
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

# Set Firebase environment variables with placeholder values for build time
ENV NEXT_PUBLIC_FIREBASE_API_KEY="placeholder"
ENV NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="placeholder"
ENV NEXT_PUBLIC_FIREBASE_PROJECT_ID="placeholder"
ENV NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="placeholder"
ENV NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="placeholder"
ENV NEXT_PUBLIC_FIREBASE_APP_ID="placeholder"
ENV OPENAI_API_KEY="placeholder"

# Build the application
RUN npm run build

# Stage 3: Runner
FROM node:18-alpine AS runner
WORKDIR /app

# Set environment variables
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Set proper permissions
RUN chown -R nextjs:nodejs /app

# Switch to non-root user
USER nextjs

# Expose the port the app runs on
EXPOSE 3000

# Set the command to run the app
CMD ["node", "server.js"] 