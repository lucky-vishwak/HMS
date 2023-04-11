FROM node:18

WORKDIR /aarogya

COPY package*.json ./

RUN npm install


COPY . .

EXPOSE 3005

CMD ["node","server.js"]