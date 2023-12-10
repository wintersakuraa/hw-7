FROM node:18.17.0-alpine

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile

COPY . .
EXPOSE 3000

CMD node index.js
