FROM node:22-alpine

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install

EXPOSE 8080

CMD [ "node", "server.js" ]