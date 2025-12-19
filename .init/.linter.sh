#!/bin/bash
cd /home/kavia/workspace/code-generation/voiceassist-pro-225512-225522/admin_dashboard_frontend
npx eslint
ESLINT_EXIT_CODE=$?
npm run build
BUILD_EXIT_CODE=$?
if [ $ESLINT_EXIT_CODE -ne 0 ] || [ $BUILD_EXIT_CODE -ne 0 ]; then
   exit 1
fi

