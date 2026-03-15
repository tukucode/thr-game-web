FROM docker.io/library/node:22.13.1-bookworm-slim AS base

WORKDIR /app

# Install useful utilities
RUN apt-get update -qq && \
  apt-get install --no-install-recommends -y \
  bash \
  vim \
  tmux \
  htop \
  curl \
  wget \
  telnet \
  dumb-init

ENV NODE_ENV="production"

# --- Build Stage ---
FROM base AS build

# Copy package config and install dependencies using npm
COPY package.json package-lock.json ./
# For building Vite, we need devDependencies temporarily
RUN npm ci --include=dev

# Copy the rest of the file and build the Vue SPA
COPY . .
RUN npm run build

# --- Production Stage ---
FROM base

# Cleanup apt caches from the base stage
RUN rm -rf /var/lib/apt/lists /var/cache/apt/archives

# Install a simple static file server
RUN npm install -g serve

# Copy the built files (dist) from the build stage
COPY --from=build /app/dist /app/dist

EXPOSE 3001

# Use dumb-init and serve the static files, routing traffic back to index.html (-s flag)
ENTRYPOINT ["/usr/bin/dumb-init", "--", "serve", "-s", "/app/dist", "-l", "3001"]
