# LinkPanel

LinkPanel is a simple web application that allows you to create and manage a list of links, making it easy to organize resources for your domain or project.

## Features

- **Add Links**: Easily add new links with titles and URLs.
- **Edit Links**: Modify existing links to keep your list updated.
- **Delete Links**: Remove links that are no longer needed.

## Installation

LinkPanel is designed to be used primarily in Docker, but the Express.js webserver can be used on it's own just fine.

### Docker ([DockerHub](https://hub.docker.com/repository/docker/nickslp/linkpanel/))

#### Prerequisites

Make sure Docker and Docker Compose are installed on your system. You can download Docker from Docker's official website. Docker Compose is included with Docker Desktop on Windows and Mac, but for Linux, you may need to install it separately.



The easiest way to create a Docker container with LinkPanel is using docker-compose.yml.

#### Step 1: Create a docker-compose.yml File
In the directory where you want to set up LinkPanel, create a file named `docker-compose.yml` with the following content:

```
services:
  app:
    image: nickslp/linkpanel:latest
    ports:
      - "8080:8080"
    environment:
      - PORT=8080
      - DEBUG_MODE=true
      - PLAIN_PASSWORD=changeme
    volumes:
      - linkpanel:/home/node/app/data  # Named volume for persistent storage

volumes:
  linkpanel:
    driver: local
```

If you need to change the port, please be aware that you need to change booth the containers port and also the port in the enviroment variables.

#### Step 2: Start the Docker Compose Setup

After creating your `docker-compose.yml`, run it using  
```
docker-compose up -d
```
The `-d` flag runs the container in detached mode, allowing it to run in the background.

#### Step 3: Access LinkPanel

Open a web browser.
Go to http://localhost:8080 or your domain, depending on if you are using a reverse proxy.
You should see the LinkPanel application up and running.

#### Step 4: Manage the Docker Compose Service

To Stop the Service:
```
docker-compose down
```

To Restart the Service:
``` 
docker-compose up -d
```

View Logs:
```
docker-compose logs -f
```

#### Clean Up

If you need to remove all data and start fresh, you can delete the linkpanel volume with:
```
docker-compose down -v
```

### Outside of a Docker container

1. Clone the [repository](https://github.com/Nickslp/LinkPanel):
   ```
   git clone https://github.com/Nickslp/LinkPanel.git
   ```
2. Install the dependencies:
   ```
   npm install
   ```
3. Start the webserver:
   ```
   node ./server/server.js
   ```
