# Use the official Node.js 18 image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app's source code
COPY . .

# Set environment variables (optional, you can also use a .env file)
ENV PORT=4005

# Expose the port the app runs on
EXPOSE 4005

# Run the app
CMD ["npm", "run", "dev"]