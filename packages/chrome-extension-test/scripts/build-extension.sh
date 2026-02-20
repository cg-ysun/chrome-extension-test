#!/bin/bash

# Function to load environment variables from a file
load_env_file() {
    local env_file=$1
    if [ -f "$env_file" ]; then
        while IFS='=' read -r key value || [ -n "$key" ]; do
            # Skip comments and empty lines
            [[ $key =~ ^#.*$ || -z $key ]] && continue
            # Remove quotes if present
            value="${value%\"}"
            value="${value#\"}"
            # Export the variable
            export "$key=$value"
        done < "$env_file"
        echo "Loaded environment variables from $env_file"
    else
        echo "Warning: $env_file not found, skipping..."
    fi
}

# Default to 'stage' if no environment is provided. Accepts 'stage' or 'prod'.
ENVIRONMENT=${1:-stage}

if [[ "$ENVIRONMENT" != "stage" && "$ENVIRONMENT" != "prod" && "$ENVIRONMENT" != "prod-private" ]]; then
    echo "Invalid environment: $ENVIRONMENT. Please use 'stage' or 'prod'."
    exit 1
fi

echo "Building extension for environment: $ENVIRONMENT"

# Clean extension output directory
rm -rf extension-dist

rm -rf extension-dist.zip

rm -rf ../../node_modules

# Run yarn install to load dependencies
yarn install

# Load base environment variables first, then override with environment-specific ones
load_env_file ".env"
load_env_file ".env.$ENVIRONMENT"

# Build the extension using Vite
yarn run build:extension --mode "$ENVIRONMENT"

# Zip the extension directory for distribution
zip -r extension-dist.zip extension-dist

echo "Extension built for $ENVIRONMENT and packaged in extension-dist/ directory"