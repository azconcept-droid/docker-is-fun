# docker-is-fun
1. Download this repo to your home directory

```
git clone https://github.com/azconcept-droid/docker-is-fun.git
```
2. Run the docker installation script
```
bash ~/docker-is-fun/docker-installation-script
```
3. Add docker to sudoer group
```
sudo groupadd docker
sudo usermod -aG docker $USER
newgrp docker
```
4. Check the version of docker installed
```
docker -v
```
5. Check if any container is running or has been stopped
```
docker ps -a
```
6. Check the docker images present
```
docker images
```
> output: hello-world          latest    d2c94e258dcb   7 months ago   13.3kB  
> only one image present which was downloaded from the installation script
7. cd into the todo-app directory
```
cd ~/docker-is-fun/todo-app
```
8. Build the container to run the todo-app from the Dockerfile
```
docker build -t todo-app .
```
9. Check if the image was built
```
docker images
```
10. Run a container using the just built image
```
docker run -dp 127.0.0.1:5000:3000 todo-app
```
11. Check if the todo-app is up and running
```
docker ps
```
11. Access the app on the web browser
```
127.0.0.1:5000
```
> Note: if there is a running process using port 5000 the command will fail.  

Persist DB
===
Volume mount
---
+ create volume to mount
```
docker volume create todo-db
```
+ stop the former running container
```
docker rm -f <container id>
```
> use: *docker ps* to see the conatiner id for the todo-app  
+ Run the container and mount the volume
```
docker run -dp 127.0.0.1:5000:3000 --mount type=volume,src=todo-db,target=/etc/todos todo-app
```
+ Know where your volume is mounted on host
```
docker volume inspect todo-db
```

Bind mount
---
- cd into the todo-app directory and run this command
```
docker run -dp 127.0.0.1:3000:3000 \
    -w /app --mount type=bind,src="$(pwd)",target=/app \
    node:18-alpine \
    sh -c "yarn install && yarn run dev"
```
- You can watch the logs using docker logs <container-id>
```
docker logs -f <container-id>
```
- Type 127.0.0.1:3000 on your browser to see todo-app running.
- Change 'Add' to 'Add Item' on line 109 in file app.js using this command to open the file location
```
nano src/static/js/app.js
```
> Note: make sure you are in the todo-app directory
- Type 127.0.0.1:3000 on your browser to see the update.

Running Multiple Containers
===
There are two ways to connect multiple containers
- Assign the network when starting the container
- Connect an already running container to a network

Assign the network when starting the container
---
1. Create the network
```
docker network create todo-app
```
2. Start a MySQL container and attach it to the network. You're also going to define a few environment variables that the database will use to initialize the database.
```
docker run -d \
    --network todo-app --network-alias mysql \
    -v todo-mysql-data:/var/lib/mysql \
    -e MYSQL_ROOT_PASSWORD=secret \
    -e MYSQL_DATABASE=todos \
    mysql:8.0
```
3. To confirm you have the database up and running, connect to the database and verify that it connects.
```
docker exec -it <mysql-container-id> mysql -u root -p
```
#### Connect to mysql container with another container.
1. Start a new container using the nicolaka/netshoot image. Make sure to connect it to the same network.The nicolaka/netshoot containeriships with a lot of tools that are useful for troubleshooting or debugging networking issues.
```
docker run -it --network todo-app nicolaka/netshoot
```
2. Inside the container, you're going to use the *dig* command, which is a useful DNS tool. You're going to look up the IP address for the hostname mysql.
```
dig mysql
```
3. Run the todo-app with Mysql. Make sure that you are in the todo-app directory.
```
docker run -dp 127.0.0.1:3000:3000 \
  -w /app -v "$(pwd):/app" \
  --network todo-app \
  -e MYSQL_HOST=mysql \
  -e MYSQL_USER=root \
  -e MYSQL_PASSWORD=secret \
  -e MYSQL_DB=todos \
  node:18-alpine \
  sh -c "yarn install && yarn run dev"
```
Add some content to your app.
4. Connect to the mysql db and prove the items are there.
```
docker exec -it <mysql-container-id> mysql -p todos
```
In the mysql shell, runn the following:
mysql> select * from todo_items;
