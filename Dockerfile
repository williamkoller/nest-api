FROM node:12-alpine3.9

WORKDIR /usr/src/app

COPY ./package*.json ./
COPY ./package-lock*.json ./
COPY ./yarn.lock .

RUN npm install 

COPY . .

CMD ["npm", "run", "start:dev"]