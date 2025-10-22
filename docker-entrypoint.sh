#!/bin/sh
set -e

echo "================================================"
echo "Strapi Docker Entrypoint"
echo "================================================"

# Wait for database to be ready
echo "Waiting for database to be ready..."
until nc -z "${DATABASE_HOST:-strapi-db}" "${DATABASE_PORT:-5432}"; do
  echo "Database is unavailable - sleeping"
  sleep 2
done
echo "Database is ready!"

# Always ensure dependencies are installed
echo "Installing/verifying dependencies..."
npm install

# Start Strapi (it will build automatically on first run in develop mode)
echo "================================================"
echo "Starting Strapi..."
echo "================================================"
exec "$@"
