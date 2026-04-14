FROM node:20-bookworm-slim AS base

ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app

FROM base AS deps

COPY package.json package-lock.json ./
RUN npm ci

FROM base AS builder

ARG NEXT_PUBLIC_SERVER_URL=http://localhost:3000
ARG PAYLOAD_SECRET=build-secret
ARG PREVIEW_SECRET=build-preview-secret
ARG DATABASE_URI=postgresql://proj_unihome:proj_unihome_password@127.0.0.1:5432/proj_unihome
ARG PAYLOAD_SCHEMA_PUSH=false
ENV NEXT_PUBLIC_SERVER_URL=${NEXT_PUBLIC_SERVER_URL}
ENV PAYLOAD_SECRET=${PAYLOAD_SECRET}
ENV PREVIEW_SECRET=${PREVIEW_SECRET}
ENV DATABASE_URI=${DATABASE_URI}
ENV PAYLOAD_SCHEMA_PUSH=${PAYLOAD_SCHEMA_PUSH}

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

FROM base AS runner

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN groupadd --system --gid 1001 nodejs \
  && useradd --system --uid 1001 --gid nodejs nextjs \
  && mkdir -p /app/media \
  && chown -R nextjs:nodejs /app

COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/messages ./messages
COPY --from=builder --chown=nextjs:nodejs /app/payload.config.ts ./payload.config.ts
COPY --from=builder --chown=nextjs:nodejs /app/src ./src
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
