FROM node:14

RUN mkdir /app

WORKDIR /app

COPY . ./

RUN npm install
RUN npm run build

EXPOSE 3030

CMD [ "node", "build/index.js" ]
