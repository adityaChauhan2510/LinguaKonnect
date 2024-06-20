For running api service-

# Using docker

1. docker build -t lingua-backend .
2. cp .env.example .env
3. docker run --env-file .env -p 8000:8000 lingua-backend

# Without docker

1. npm install
2. cp .env.example .env
3. npm start
