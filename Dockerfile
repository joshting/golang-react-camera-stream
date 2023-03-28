########################
# build React frontend #
########################
FROM node:alpine AS react_builder
WORKDIR /
COPY frontend .
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
WORKDIR WORKDIR $GOPATH/src/main/app
COPY . .
# Replace data path with full path in the container
RUN sed -i "s|data/streams.json|/go/bin/data/streams.json|g" api/api.go
# Get GOLANG dependencies
RUN go get -d -v
# Build GOLANG binary
RUN go build -o /go/bin/app
COPY data /go/bin/data


#######################################
# build final distroless docker image #
#######################################
FROM scratch

# Copy React frontend
COPY --from=react_builder /frontend /go/bin/frontend
# Copy GOLANG executable and data
COPY --from=go_builder /go/bin/ /go/bin
WORKDIR /go/bin/
# Run the executable
ENTRYPOINT ["/go/bin/app"]