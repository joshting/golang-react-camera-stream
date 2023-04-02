#!/bin/sh

mkdir build 2>/dev/null
rm -rf build/* 2>/dev/null
CGO_ENABLED=0 go build -ldflags="-extldflags=-static" -o build/app