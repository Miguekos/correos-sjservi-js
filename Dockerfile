FROM node:10

COPY ["package.json", "/usr/local/nodeapps/"]
WORKDIR /usr/local/nodeapps
RUN mkdir -p /usr/local/nodeapps/server/storage
RUN npm install
RUN npm install pm2 -g
RUN pm2 install pm2-logrotate
RUN pm2 set pm2-logrotate:rotateInterval '0 0 */1 * *'
RUN pm2 set pm2-logrotate:dateFormat 'YYYY-MM-DD'
COPY [".", "."]
RUN ls

EXPOSE 6041