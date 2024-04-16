# Use an official Node.js Alpine Linux runtime as a base image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the application files to the working directory
COPY . .

# Expose the port on which your app runs
EXPOSE 3000

RUN ./node_modules/.bin/truffle migrate --network dev

WORKDIR /usr/src/app/appfrontend

RUN npm install --production



# Install Truffle globally
# RUN npm install -g truffle

# Install Ganache globally
# RUN npm install -g ganache-cli

# Run Truffle migrations
# RUN npm run ganache &


# Change directory to appfrontend
# WORKDIR /usr/src/app/appfrontend

# Install dependencies for appfrontend
# RUN npm i


# WORKDIR /usr/src/app
# RUN ./node_modules/.bin/truffle migrate --network dev

# WORKDIR /usr/src/app/appfrontend
# Start appfrontend
CMD ["npm", "start"]
