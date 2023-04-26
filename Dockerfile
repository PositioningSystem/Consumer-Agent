FROM node:15-alpine
COPY . /consumer-agent
RUN cd /consumer-agent && npm install
CMD cd /consumer-agent && node src/Receive.js