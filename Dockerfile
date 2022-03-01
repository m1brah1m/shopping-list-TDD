FROM node:17-alpine3.14

RUN mkdir /home/node/app
#Create app directory
WORKDIR /home/node/app

# Install dependencies
COPY package.json ./
RUN npm install 

# Bundle app source
COPY ./src/  ./src/

EXPOSE 3000

CMD ["npm","start"]
