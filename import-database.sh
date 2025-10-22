#!/bin/bash

# Strapi Database Import Script
# This script imports a Strapi database from a SQL backup file

echo "📥 Strapi Database Import"
echo "═══════════════════════════════════════"
echo ""

# Check if backup file is provided
if [ -z "$1" ]; then
    echo "❌ No backup file specified!"
    echo ""
    echo "Usage: ./import-database.sh <backup-file.sql>"
    echo ""
    echo "Available backups:"
    if [ -d "./database-backups" ]; then
        ls -lh ./database-backups/*.sql 2>/dev/null || echo "   (none found)"
    else
        echo "   (no backup directory found)"
    fi
    exit 1
fi

BACKUP_FILE="$1"

# Check if file exists
if [ ! -f "$BACKUP_FILE" ]; then
    echo "❌ Backup file not found: $BACKUP_FILE"
    exit 1
fi

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running!"
    echo "   Please start Docker and try again."
    exit 1
fi

# Check if Strapi containers are running
if ! docker-compose ps | grep -q "strapi-db"; then
    echo "⚠️  Strapi database container is not running!"
    echo "   Starting containers..."
    docker-compose up -d
    
    echo "   Waiting for database to be ready..."
    sleep 10
fi

echo "📦 Import Details:"
echo "   File: $BACKUP_FILE"
echo "   Size: $(du -h "$BACKUP_FILE" | cut -f1)"
echo "   Database: strapi"
echo ""

# Warning
echo "⚠️  WARNING: This will REPLACE ALL existing data!"
read -p "   Are you sure you want to continue? (yes/no): " confirm

if [ "$confirm" != "yes" ]; then
    echo "❌ Import cancelled."
    exit 0
fi

echo ""
echo "🗑️  Dropping existing database..."
docker-compose exec -T strapi-db psql -U strapi -d postgres -c "DROP DATABASE IF EXISTS strapi;"

echo "📝 Creating fresh database..."
docker-compose exec -T strapi-db psql -U strapi -d postgres -c "CREATE DATABASE strapi;"

echo "📥 Importing backup..."
cat "$BACKUP_FILE" | docker-compose exec -T strapi-db psql -U strapi -d strapi

# Check if import was successful
if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Database imported successfully!"
    echo ""
    echo "🔄 Restarting Strapi..."
    docker-compose restart strapi
    
    echo ""
    echo "⏳ Waiting for Strapi to start (30 seconds)..."
    sleep 30
    
    echo ""
    echo "✅ Import complete!"
    echo ""
    echo "📝 Next steps:"
    echo "   1. Access Strapi admin: http://localhost:1337/admin"
    echo "   2. Login with your credentials"
    echo "   3. If you don't have credentials, create a new admin account"
    echo ""
else
    echo ""
    echo "❌ Database import failed!"
    echo "   Check the error messages above."
    exit 1
fi

echo "═══════════════════════════════════════"
