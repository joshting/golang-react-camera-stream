#!/bin/sh

npm install --silent --prefix frontend
rm -rf frontend/dist 2>/dev/null
npm install --quiet --prefix frontend
npm run build --prefix frontend