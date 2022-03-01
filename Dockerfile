FROM node:17-alpine3.14

#Create app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package.json ./
RUN npm install 

# Bundle app source
COPY ./src/ .gitignore ./

EXPOSE 3000

CMD ["npm","start"]
