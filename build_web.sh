#!/bin/sh

npm install --silent --prefix frontend
rm -rf frontend/dist 2>/dev/null
npm run build --prefix frontend