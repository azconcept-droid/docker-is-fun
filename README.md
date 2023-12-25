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

 
