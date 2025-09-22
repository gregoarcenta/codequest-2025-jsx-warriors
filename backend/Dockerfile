FROM node:22-alpine3.22 AS dev
WORKDIR /app
COPY package.json ./
RUN npm install
CMD [ "npm","run","start:dev" ]


FROM node:22-alpine3.22 AS dev-deps
WORKDIR /app
COPY package.json package.json
RUN npm install --frozen-lockfile


FROM node:22-alpine3.22 AS builder
WORKDIR /app
COPY --from=dev-deps /app/node_modules ./node_modules
COPY . .
# RUN npm run test
RUN npm run build

FROM node:22-alpine3.22 AS prod-deps
WORKDIR /app
COPY package.json package.json
RUN npm install --prod --frozen-lockfile


FROM node:22-alpine3.22 AS prod
WORKDIR /app
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD [ "node","dist/main.js"]
