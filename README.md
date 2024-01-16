# Etherscan challenge

This is the documentation for setting up and running the full stack application, which includes separate backend and frontend repositories. Follow the instructions below to get started.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed [Docker](https://docs.docker.com/get-docker/) and Docker Compose on your machine.
- You have basic knowledge of Docker and containerization.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Setup

1. Clone the backend repository:

```
git clone https://github.com/alexrobaina/etherscan-backend.git
```

2. Clone the Frontend repository:

```
git clone https://github.com/alexrobaina/etherscan-challenge.git
```

3 - Make sure both cloned repositories are in the same parent directory. Your directory structure should look like this:

parent-directory/
├── backend/
└── frontend/

##Running the Application

1 - Create a docker-compose.yml

parent-directory/
├── backend/
└── frontend/
└── docker-compose.yml

2 - In docker-compose.yml file copy and paste this code:
In the docker file you need to add the following API KEYS: 

- ETHERSCAN_API_KEY=
- API_LAYER_KEY=

```
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - '3011:3011'
    environment:
      - DATABASE_URL=postgres://securitize:1234@db:5432/securitize
      - ETHERSCAN_API_KEY=
      - API_LAYER_KEY=
    depends_on:
      - db

  frontend:
    build: ./frontend
    ports:
      - '3000:3000'
    depends_on:
      - backend

  db:
    image: postgres
    volumes:
      - pgdata:/var/lib/postgresql/data
    environment:
      POSTGRES_USER: securitize
      POSTGRES_PASSWORD: 1234
      POSTGRES_DB: securitize
    ports:
      - '5432:5432'

volumes:
  pgdata:
```

Running the Application
1 - Navigate to the parent directory where your docker-compose.yml is located and run the following command to build and start your containers in detached mode:

```
docker-compose up --build -d
```

2 - Once the containers are up, apply the Prisma migrations to set up your database schema:

```
docker-compose exec backend npx prisma migrate deploy --schema=/usr/src/app/dist/database/prisma/schema.prisma
```

3 - Access the application:

Backend is available at http://localhost:3011
Frontend is available at http://localhost:3000

```
docker-compose up --build
```

This will rebuild the images and restart the containers.

Thanks You
