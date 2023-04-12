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

## Build the Docker image using Docker Containers
To build the Docker image, run:
```
docker build --tag video-wall:latest .
```
NOTE: The image tag _video-wall:latest_ is used in the [docker-compose.yaml](docker-compose.yaml).

Then run the app in the Docker container:
```
docker-compose up -d
```

## Build the Docker image manually
Firstly, build the frontend code and the GOLANG executable (statically linked).  This can be done by referring to or running the scripts [build_web.sh](build_web.sh) and [build_go.sh](build_go.sh)
```
./build_web.sh
./build_go.sh
```
Then, build the docker image using [Dockerfile_Precompiled](Dockerfile_Precompiled).
```
docker build --tag video-wall:latest -f Dockerfile_Precompiled .
```
Then run the app as per normal:
```
docker-compose up -d
```

## Getting the video feed
Run the example in [https://github.com/joshting/python-cv2-webcam-stream](https://github.com/joshting/python-cv2-webcam-stream)