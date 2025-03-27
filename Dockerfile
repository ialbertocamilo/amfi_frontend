FROM node:20-alpine AS build


WORKDIR /web
ENV NEXT_PUBLIC_SOCKET_URL="https://licitaciones-api.svgdev.tech"
ENV NEXT_PUBLIC_PAYPAL_CLIENT="Aeb-2z3_4M276SYVYSo_nYlraIWuZkDkuc64U9ZEZJsOodEVFDuv72K2DCYUv0meHgVX2__8JlzzcwDc"
COPY package*.json ./
RUN yarn
COPY . .
RUN yarn run build

FROM node:20-alpine AS runtime
LABEL authors="Alberto Camilo Rodriguez Vizcarra"

WORKDIR /web
COPY package*.json ./
COPY --from=build /web/.next ./.next
COPY --from=build /web/public ./public
COPY --from=build /web/node_modules ./node_modules
EXPOSE 3000
CMD ["yarn", "start"]