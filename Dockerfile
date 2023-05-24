FROM node:16.14.0-alpine3.15

# Create app directory

WORKDIR /usr/src/app

# Install app dependencies

COPY dist/ ./
COPY package*.json ./

RUN npm install

# Bundle app source

COPY . .

EXPOSE 3000

CMD ["npm", "start"]