# GOLANG + REACT + DOCKER

## Build the app

### Build the React frontend
Run the script [build_web.sh](build_web.sh) or run in the terminal the following.  Omit the --prefix web/frontend if you change directory to _web/frontend_.
```
npm run build --prefix web/frontend
```
### Run the GOLANG backend
Run main.go directly
```
go run main.go
```
OR build the executable binary and run it.
```
go build -o app
./app
```

## Build the Docker image
To build the Docker image, run:
```
docker build --tag video-wall:latest
```
NOTE: The image tag _video-wall:latest_ is used in the [docker-compose.yaml](docker-compose.yaml).

Then run the app in the Docker container:
```
docker-compose up -d
```