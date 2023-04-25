FROM node:16-alpine3.17 as builder

WORKDIR /app
COPY package*.json .npmrc /app/
RUN yarn install

COPY . /app
RUN yarn run build
RUN rm -rf node_modules

RUN yarn install --production

FROM node:16-alpine3.17
WORKDIR /app
COPY --from=builder /app/node_modules node_modules
COPY --from=builder /app/dist dist
COPY --from=builder /app/README.md ./README.md
COPY --from=builder /app/package.json ./package.json

CMD ["yarn", "run", "start"]