FROM node:12-alpine

WORKDIR /usr/app

COPY ./package.json ./
COPY ./ ./

RUN npm install
RUN npm install express


CMD ["npm", "start"]