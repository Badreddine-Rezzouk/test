# How to install Mysql on your local machine

1. Update .env file by adding user & root DB passwords
2. Install docker on your machine
3. Execute `docker network create mysql57`
4. Execute `docker volume create mysql57`
5. Execute `docker compose -f stack.local.yml up -d`
6. Execute `docker ps` and check if the container is running
7. Enjoy
