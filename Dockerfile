# Use an official Node.js runtime as the base image
FROM node:18 as build

#Create new directory
#RUN mkdir /opt/angular

# Copy dist folder to app directory
#COPY ./dist/admin-app /app

# Set the working directory in the container
#WORKDIR /app
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install Angular CLI
RUN npm install -g @angular/cli

# Install project dependencies
RUN npm install --force or --legacy-peer-deps

# Copy the rest of the application's source code to the container
COPY . .

# Build the Angular appRUN npm run build# start the app
#CMD ["npm", "start"]

# Use a smaller production image for the final image
FROM nginx:alpine

# Copy the built app from the previous stage to the Nginx folder
COPY src/nginx/etc/conf.d/default.conf /etc/nginx/conf/default.conf
COPY --from=build /usr/src/app/dist/admin-app /usr/share/nginx/html

#Expose port 80 for Nginx
#EXPOSE 80

# Start Nginx when the container starts
#CMD ["nginx", "-g", "daemon off;"]

