#!/bin/sh
set -e

node ace migration:run --force

# Run seeds only on first boot (flag file lives in the named volume)
SEED_FLAG=/app/storage/uploads/.seeded
if [ ! -f "$SEED_FLAG" ]; then
  node ace db:seed
  touch "$SEED_FLAG"
fi

exec node bin/server.js
