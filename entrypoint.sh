#!/bin/bash
set -e

if [ -z "$ADMIN_PASSWORD" ]; then
  echo "Error: ADMIN_PASSWORD environment variable is not set."
  exit 1
fi

# Generate hash using bcryptjs
export ADMIN_PASSWORD_HASH=$(node -e "console.log(require('bcryptjs').hashSync(process.env.ADMIN_PASSWORD, 12))")

echo "Starting app with hashed admin password..."
exec "$@"
