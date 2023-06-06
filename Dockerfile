# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:latest as build

# Set the working directory
WORKDIR /app

# Add the source code to app
#RUN npm cache clean --force
COPY package.json ./
COPY ./ /app/

# Install all the dependencies

RUN npm install -g @angular/cli
RUN npm cache clean --force
RUN npm install
#RUN npm install

# Generate the build of the application
RUN ng version

RUN npm run build
# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:latest

# Copy the build output to replace the default nginx contents.
COPY --from=build /app/dist/smart /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Expose port 80
EXPOSE 80
