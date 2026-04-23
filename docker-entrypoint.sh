#!/bin/sh
set -e

node ace migration:run
exec node bin/server.js
