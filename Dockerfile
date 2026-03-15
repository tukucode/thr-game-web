FROM docker.io/library/node:22.13.1-bookworm-slim AS base

WORKDIR /app

# Install useful utilities
RUN apt-get update -qq && \
  apt-get install --no-install-recommends -y \
  bash \
  curl \
  wget \
  dumb-init && \
  rm -rf /var/lib/apt/lists/*

# --- Build Stage ---
FROM base AS build

# Copy package config and install dependencies
COPY package.json package-lock.json ./

# Install ALL dependencies (including devDependencies) for the build
# We use --legacy-peer-deps because Vite 8 is very new and some plugins
# (like vite-plugin-pwa) might not have updated their peerDependency ranges yet.
RUN npm ci --legacy-peer-deps

# Copy the rest of the file and build the Vue SPA
COPY . .
RUN npm run build

# --- Production Stage ---
FROM base

# Set production environment
ENV NODE_ENV="production"

# Install a simple static file server
RUN npm install -g serve

# Copy the built files (dist) from the build stage
COPY --from=build /app/dist /app/dist

EXPOSE 3001

# Use dumb-init and serve the static files, routing traffic back to index.html (-s flag)
ENTRYPOINT ["/usr/bin/dumb-init", "--", "serve", "-s", "/app/dist", "-l", "3001"]
