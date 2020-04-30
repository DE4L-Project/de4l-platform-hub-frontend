#!/usr/bin/env bash
echo "Initializing container..."

CONFIG_URL_ESCAPED=$(sed 's/[&/\]/\\&/g' <<<"$CONFIG_URL")

# Recreate config on each start
rm -f $HTML_DIR/config.json
cp /tmp/config.template.json $HTML_DIR/config.json

echo "Setting config..."

sed -i "s/@@DEFINE_CONFIG_URL@@/$CONFIG_URL_ESCAPED/g" $HTML_DIR/config.json

echo "Starting nginx..."

nginx -g "daemon off;"
