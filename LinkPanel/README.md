# LinkPanel

This is the directory that is used for the Docker image or outside of Docker as the root of the project.

## Creating a Docker image
### To build a Docker image run: 
```
docker build -t nickslp/linkpanel:latest .
```
### Tag the Docker repo run:
```
docker tag nickslp/linkpanel:latest nickslp/linkpanel:<version>
```
### Login to Docker:
```
docker login
```
### Push the image to DockerHub:
```
docker push nickslp/linkpanel:latest
```


