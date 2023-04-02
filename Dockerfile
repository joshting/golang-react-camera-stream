########################
# build React frontend #
########################
FROM node:alpine AS react_builder
WORKDIR /
COPY frontend /frontend
WORKDIR /frontend
# install dependencies
RUN npm install --silent
# build React app
RUN npm run build


########################
# build GOLANG backend #
########################
FROM golang:alpine AS go_builder
# Install git.
# Git is required for fetching the dependencies.
RUN apk update && apk add --no-cache git
WORKDIR /src
COPY . .
# Get GOLANG dependencies
RUN go get -d -v
# Build GOLANG binary
RUN go build -o /build/app
COPY data /build/data


#######################################
# build final distroless docker image #
#######################################
FROM scratch

# NOTE: where the frontend and data directories are in relation
# to the GOLANG executable is very important. In this case:
# /app - executable
# /frontend/dist - the compiled frontend
# /data - directory containing the JSON

# Copy React frontend
COPY --from=react_builder /frontend/dist /frontend/dist
# Copy GOLANG executable and data
COPY --from=go_builder /build/app /app
COPY --from=go_builder /build/data /data

# Run the executable
ENTRYPOINT ["/app"]