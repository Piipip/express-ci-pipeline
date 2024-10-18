# Use the official Node.js 14 image as a parent image
FROM node:14-alpine AS build

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy the rest of your app's source code
COPY . .

# Build your app
RUN npm run build

# Start a new stage for a smaller production image
FROM node:14-alpine

# Set the working directory
WORKDIR /usr/src/app

# Create a non-root user and switch to it
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Copy only the built artifacts and production dependencies from the previous stage
COPY --chown=appuser:appgroup package*.json ./
COPY --from=build --chown=appuser:appgroup /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/ ./

# Expose the port the app runs on
EXPOSE 3000

# Command to run the app
CMD ["node", "index.js"]