#!/bin/bash

echo "Starting Task Board Application"

echo "Starting Python backend"
cd backend
pip install -r requirements.txt > /dev/null 2>&1
python main.py &
BACKEND_PID=$!

sleep 3

echo "Starting React frontend"
cd ../frontend
npm install > /dev/null 2>&1
npm run dev -- --host 0.0.0.0

trap "kill $BACKEND_PID" EXIT
