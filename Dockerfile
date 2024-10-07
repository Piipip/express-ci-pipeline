FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Create a non-root user and switch to it
RUN adduser --disabled-password --gecos '' appuser && \
    chown -R appuser:appuser /usr/src/app
USER appuser

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY --chown=appuser:appuser package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY --chown=appuser:appuser . .

EXPOSE 8080
CMD [ "node", "server.js" ]