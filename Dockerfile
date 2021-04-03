FROM node:14

RUN mkdir /app

WORKDIR /app

COPY . ./

RUN npm install
RUN npm run build

EXPOSE 3020

CMD [ "node", "build/index.js" ]
