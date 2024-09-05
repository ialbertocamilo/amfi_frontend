FROM node:20-alpine AS build


WORKDIR /web
ENV NEXT_PUBLIC_SOCKET_URL="http://ec2-3-93-158-212.compute-1.amazonaws.com:3000"
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