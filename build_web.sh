#!/bin/sh

rm -rf frontend/dist 2>/dev/null
npm install --quiet --prefix frontend
npm run build --prefix frontend