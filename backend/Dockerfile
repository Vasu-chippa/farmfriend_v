FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY backend/package*.json ./
RUN npm ci --only=production

# Copy source
COPY backend/ ./

ENV NODE_ENV=production

EXPOSE 5000

CMD ["node", "server.js"]
