#!/bin/bash
NC='\033[0m' # No Color
BLUE='\033[0;34m'

cd /app/sandbox/ || return
printf "\n${BLUE}[$(pwd)]${NC}: Unlink React:\n"
npm unlink ./node_modules/react

# build package dist, link React dep to same one the app will use
# read: https://reactjs.org/warnings/invalid-hook-call-warning.html
cd /app/package/ || return
printf "\n${BLUE}[$(pwd)]${NC}: Creating package bundle & linking React versions:\n"
printf "${BLUE}[$(pwd)]${NC}: https://reactjs.org/warnings/invalid-hook-call-warning.html\n"
npm run build && npm link ../sandbox/node_modules/react

cd /app/sandbox/ || return
printf "\n${BLUE}[$(pwd)]${NC}: Linking package to the sandbox\n"
# link package to sandbox
npm link ../package
printf "\n${BLUE}[$(pwd)]${NC}: Starting sandbox\n"
# start sandbox
npm run start
