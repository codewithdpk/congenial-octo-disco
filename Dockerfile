FROM node:16 AS builder

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY prisma ./prisma/
COPY .env ./

# Install app dependencies
RUN npm install
RUN npm run migrate:dev

COPY . .


# Uncomment below 2 lines for development purposes
EXPOSE 3000
CMD [ "npm", "run", "start:dev" ]

# Uncomment all the below lines when deploying to production
# RUN npm run build

# FROM node:16

# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/package*.json ./
# COPY --from=builder /app/dist ./dist

# EXPOSE 3000
# CMD [ "npm", "run", "start:prod" ]