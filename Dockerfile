# Stage 1: Build the Angular SSR app
FROM node:18 AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build:ssr

# Stage 2: Run the SSR Node.js server
FROM node:18-alpine
WORKDIR /app
COPY --from=build /app/dist /app/dist
COPY --from=build /app/node_modules /app/node_modules
EXPOSE 4000
CMD ["node", "dist/server/main.js"]
