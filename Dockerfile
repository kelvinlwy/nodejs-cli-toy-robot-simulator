FROM node:alpine

WORKDIR /app

COPY package.json /app

RUN npm install --slient

COPY . /app

RUN npm run test:build

CMD ["node", "app.js"]
