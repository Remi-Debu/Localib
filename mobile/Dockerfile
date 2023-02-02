FROM node:18-alpine

WORKDIR /Localib/mobile

COPY . .

RUN npm install -g @ionic/cli
RUN npm install

CMD ["npm", "start"]