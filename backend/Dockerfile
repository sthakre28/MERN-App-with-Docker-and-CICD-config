
# 1. Use Node.js base image
FROM node:22-alpine

# 2. Set working directory
WORKDIR /app

# 3. Copy dependency files
COPY package*.json ./

# 4. Install production dependencies
RUN npm ci --omit=dev

# 5. Copy backend source code
COPY src ./src

# 6. Set environment
ENV NODE_ENV=production

# 7. Expose backend port
EXPOSE 5000

# 8. Start application
CMD ["npm", "start"]
