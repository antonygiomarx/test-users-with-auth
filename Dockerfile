FROM node:20-alpine3.16 as builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build



FROM node:20-alpine3.16  as production

ARG NODE_ENV=production

ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --only=production

COPY . .

COPY --from=builder /app/dist ./dist

CMD ["node", "dist/src/index"]
