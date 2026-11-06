#!/usr/bin/env bash
# Run from the project root. The Figma link is short-lived (about 7 days).
mkdir -p public/images
curl -f -L -o public/images/logo.svg "https://www.figma.com/api/mcp/asset/33178afc-c326-40fb-8034-d0e66da50c21.svg"
