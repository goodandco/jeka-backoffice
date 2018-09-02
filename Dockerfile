FROM node:8

WORKDIR /usr/src/backoffice

COPY . .

RUN npm install

RUN npm run build:prod

CMD [ "npm", "start" ]
