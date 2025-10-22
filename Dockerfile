FROM node:18-alpine

# Set working directory
WORKDIR /srv/app

# Install system dependencies including netcat for DB health check
RUN apk update && apk add --no-cache \
    build-base \
    gcc \
    autoconf \
    automake \
    zlib-dev \
    libpng-dev \
    vips-dev \
    git \
    python3 \
    make \
    g++ \
    netcat-openbsd

# Copy entrypoint script
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Expose Strapi port
EXPOSE 1337

# Set entrypoint
ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]

# Start command - use node to run strapi directly from node_modules
CMD ["sh", "-c", "node node_modules/@strapi/strapi/bin/strapi.js develop"]
