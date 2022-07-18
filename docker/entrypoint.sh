#!/usr/bin/env bash
echo "Initializing container..."

CONFIG_URL_ESCAPED=$(sed 's/[&/\]/\\&/g' <<<"$CONFIG_URL")

mkdir -p $HTML_DIR/assets/

# Recreate config on each start
rm -f $HTML_DIR/assetsconfig.json
cp /tmp/init-properties.template.json $HTML_DIR/assets/init-properties.json

echo "Setting config..."

sed -i "s/@@DEFINE_CONFIG_URL@@/$CONFIG_URL_ESCAPED/g" $HTML_DIR/assets/init-properties.json

echo "Starting nginx..."

nginx -g "daemon off;"
