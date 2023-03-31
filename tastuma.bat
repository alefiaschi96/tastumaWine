@echo off

start "Terminal 1" cmd /k "cd core && npm install && node .\index.js"
start "Terminal 2" cmd /k "npm start"