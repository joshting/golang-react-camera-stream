#!/bin/sh

mkdir build 2>/dev/null
rm -rf build/* 2>/dev/null
cp main.go go.mod go.sum build
cp -r api web build
cd build
sed -i "s|data/streams.json|/go/bin/data/streams.json|g" api/api.go
CGO_ENABLED=0 go build -ldflags="-extldflags=-static" -o app