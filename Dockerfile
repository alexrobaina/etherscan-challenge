# Use a node base image
FROM node:latest as build-stage

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock if you use yarn)
COPY package*.json ./

# Install dependencies
RUN yarn install

# Copy the rest of the frontend code
COPY . .

# Build the application
RUN yarn run build

# Use a lightweight node base image for the production stage
FROM node:alpine

# Set the working directory
WORKDIR /app

# Install a server to serve the static files, like serve
RUN yarn global add serve

# Copy the build directory from the build-stage to the current directory
COPY --from=build-stage /app/dist .

# Serve the static files on port 3000
CMD ["serve", "-s", ".", "-l", "3000"]

# Expose port 3000
EXPOSE 3000
