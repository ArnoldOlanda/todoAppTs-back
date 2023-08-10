FROM node:18


# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY ["package.json", "tsconfig.json", ".env", "./"]

#copy source code
COPY ./src ./src


RUN npm install
RUN npm run build
# If you are building your code for production
# RUN npm ci --omit=dev

# Bundle app source
COPY . .

#EXPOSE 4000
CMD npm run dev