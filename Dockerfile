FROM node:20.8.0

RUN npm install --global yarn --force

WORKDIR /usr/apps/node/codeforreal-lms

COPY package.json yarn.lock server/package.json server/yarn.lock client/package.json client/yarn.lock ./

RUN yarn --frozen-lockfile

COPY . .

EXPOSE 9000

WORKDIR /usr/apps/node/codeforreal-lms/server

CMD ["yarn", "dev"]