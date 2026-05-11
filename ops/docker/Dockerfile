FROM node:20-bookworm-slim AS base

ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app

FROM base AS deps

COPY package.json package-lock.json ./
RUN npm ci

FROM base AS builder

ARG NEXT_PUBLIC_SERVER_URL
ARG NEXT_PUBLIC_TURNSTILE_SITE_KEY
ARG DATABASE_URI=postgresql://build:build@127.0.0.1:5432/build
ARG PAYLOAD_SCHEMA_PUSH=false
ARG BUILD_SKIP_PAYLOAD=true
ENV NEXT_PUBLIC_SERVER_URL=${NEXT_PUBLIC_SERVER_URL}
ENV NEXT_PUBLIC_TURNSTILE_SITE_KEY=${NEXT_PUBLIC_TURNSTILE_SITE_KEY}
ENV DATABASE_URI=${DATABASE_URI}
ENV PAYLOAD_SCHEMA_PUSH=${PAYLOAD_SCHEMA_PUSH}
ENV BUILD_SKIP_PAYLOAD=${BUILD_SKIP_PAYLOAD}

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN PAYLOAD_SECRET=build-secret PREVIEW_SECRET=build-preview-secret npm run build

FROM base AS runner

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN groupadd --system --gid 1001 nodejs \
  && useradd --system --uid 1001 --gid nodejs nextjs \
  && mkdir -p /app/media \
  && chown -R nextjs:nodejs /app

COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
RUN rm -f /app/.env && rm -rf /app/src

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
