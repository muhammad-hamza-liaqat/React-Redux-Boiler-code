# Stage 1: Build React (Vite) app
FROM node:20-alpine AS build

WORKDIR /app

# Copy dependencies and install (including dev dependencies for build)
COPY package*.json ./
RUN npm ci

# Copy source code and environment file
COPY . .

# Build the app
RUN npm run build

# Stage 2: Serve with Distroless Nginx
FROM gcr.io/distroless/nginx:nonroot

# Copy built app to nginx html dir
COPY --from=build /app/dist /usr/share/nginx/html

# ✅ Copy custom nginx.conf for SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 8080 (Distroless Nginx default)
EXPOSE 8080

# No CMD needed — distroless nginx runs automatically
