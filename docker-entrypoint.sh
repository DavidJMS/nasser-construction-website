#!/bin/sh
set -e

node ace migration:run
node ace db:seed
exec node bin/server.js
