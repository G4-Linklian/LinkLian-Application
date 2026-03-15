# Stage 1: Builder
FROM oven/bun:1 AS builder

WORKDIR /app

ARG VITE_BASE_URL
ARG VITE_BASE_PATH

ENV VITE_BASE_URL=$VITE_BASE_URL
ENV VITE_BASE_PATH=$VITE_BASE_PATH

COPY package.json bun.lockb ./

RUN bun install --frozen-lockfile

COPY . .
RUN bun run build

# Stage 2: Runner
FROM node:20-slim AS runner

WORKDIR /app
ENV NODE_ENV=production

# Install serve to run the static application
RUN npm install -g serve

# Copy the build output
COPY --from=builder /app/dist ./dist

EXPOSE 1412

CMD ["serve", "-s", "dist", "-l", "1412"]