# Postgresql container

1. Start container
    ```
    docker compose up -d
    ```

2. To login to container
    ```
    docker exec -it postgresql bash
    ```

3. Login to posgres database
    ```
    psql -U postgres
    ```