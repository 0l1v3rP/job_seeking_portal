# Fetching the latest node image on alpine linux
FROM node:alpine AS development

# Declaring env
ENV NODE_ENV development

# Setting up the work directory
WORKDIR /App

# Installing dependencies
COPY ./package.json ./
RUN npm install
RUN npm install react-router-dom 
# Copying all the files in our project
COPY . .

# Starting our application
CMD npm start