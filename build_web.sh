#!/bin/sh

rm -rf frontend/dist 2>/dev/null
npm run build --prefix frontend