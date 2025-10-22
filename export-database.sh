#!/bin/bash

# Strapi Database Export Script
# This script exports the Strapi database to a SQL file

echo "🗄️  Strapi Database Export"
echo "═══════════════════════════════════════"
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running!"
    echo "   Please start Docker and try again."
    exit 1
fi

# Check if Strapi containers are running
if ! docker-compose ps | grep -q "strapi-db"; then
    echo "❌ Strapi database container is not running!"
    echo "   Start it with: docker-compose up -d"
    exit 1
fi

# Create backup directory
BACKUP_DIR="./database-backups"
mkdir -p "$BACKUP_DIR"

# Generate filename with timestamp
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="$BACKUP_DIR/strapi_backup_$TIMESTAMP.sql"

echo "📦 Exporting database..."
echo "   Container: reflection-dental-strapi-db"
echo "   Database: strapi"
echo "   Output: $BACKUP_FILE"
echo ""

# Export database
docker-compose exec -T strapi-db pg_dump -U strapi -d strapi > "$BACKUP_FILE"

# Check if export was successful
if [ $? -eq 0 ]; then
    # Get file size
    FILE_SIZE=$(du -h "$BACKUP_FILE" | cut -f1)
    
    echo "✅ Database exported successfully!"
    echo ""
    echo "📊 Backup Details:"
    echo "   File: $BACKUP_FILE"
    echo "   Size: $FILE_SIZE"
    echo ""
    echo "📤 Share this file with your team:"
    echo "   They can import it using: ./import-database.sh $BACKUP_FILE"
    echo ""
    
    # Also create a "latest" symlink
    ln -sf "$(basename $BACKUP_FILE)" "$BACKUP_DIR/latest.sql"
    echo "💡 Quick access: $BACKUP_DIR/latest.sql"
else
    echo "❌ Database export failed!"
    echo "   Check if the database container is running:"
    echo "   docker-compose ps"
    exit 1
fi

echo ""
echo "═══════════════════════════════════════"
echo "✅ Export complete!"
