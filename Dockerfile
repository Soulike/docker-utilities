# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

FROM node:lts-alpine AS base
RUN corepack enable \
    && corepack prepare --activate pnpm@latest

FROM base AS deps
WORKDIR /docker-utilities
COPY . .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm config set store-dir /pnpm/store && \
    pnpm install --prefer-offline --frozen-lockfile

# Build vultr-ddns
FROM deps AS vultr-ddns-builder
RUN pnpm --filter "./apps/vultr-ddns" build && \
    pnpm --filter "./apps/vultr-ddns" deploy --prod /vultr-ddns


FROM base AS vultr-ddns
COPY --from=vultr-ddns-builder /vultr-ddns /vultr-ddns
WORKDIR /vultr-ddns
CMD pnpm start

