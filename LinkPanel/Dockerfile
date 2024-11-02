FROM node:slim

WORKDIR /home/node/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose port 8080
EXPOSE 8080

# Start the application
CMD [ "node", "server/server.js" ]