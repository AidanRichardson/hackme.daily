# --------------------
# 1. Builder Image
# --------------------
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build Next.js (TS compilation + Tailwind processing)
RUN npm run build

# --------------------
# 2. Runner Image
# --------------------
FROM node:20-alpine AS runner
WORKDIR /app

# Copy only production files
COPY --from=builder /app/package*.json ./
RUN npm install --omit=dev

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/postcss.config.mjs ./
COPY --from=builder /app/tsconfig.json ./
COPY --from=builder /app/lib ./lib

ENV NODE_ENV=production
EXPOSE 3000

CMD ["npm", "start"]
