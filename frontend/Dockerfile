# Use an official Node runtime as a base image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on (adjust as needed)
EXPOSE 3000

# Command to run your application with nodemon for automatic updates
CMD ["npm", "run", "dev"]
