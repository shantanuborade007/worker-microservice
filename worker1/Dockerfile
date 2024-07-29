# Base stage
FROM node:16-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm install

# Development stage
FROM base AS development
COPY . .
RUN npm run build
EXPOSE 3001
CMD ["npm", "run", "start:dev"]

# Production stage
FROM base AS production
COPY . .
RUN npm run build
EXPOSE 3001
CMD ["npm", "run", "start:prod"]
