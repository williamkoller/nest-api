FROM node:12-alpine3.9

RUN mkdir -p /usr/src/app/node_modules 

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN npm install 

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:dev"]