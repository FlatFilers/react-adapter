FROM node:12.15

# where package will live
WORKDIR /app/package
COPY package*.json /app/package/
RUN npm install
RUN chown node:node /app/package/

# install CRA
WORKDIR /app
RUN npx create-react-app sandbox
RUN chown node:node /app/sandbox


