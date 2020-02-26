FROM node:current

WORKDIR /home/downote/app
COPY package*.json ./
RUN npm i

COPY . ./

CMD ["npm", "start"]
