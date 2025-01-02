# Table of Contents
1. [Project Purpose](#project-purpose)
2. [Clarifications](#clarifications)
3. [Configuration](#configuration)

## Project Purpose
This repository is part of the 'Sports Shop' project, hosted at the repository [https://github.com/lele589/sports-shop.git](https://github.com/lele589/sports-shop.git). All related information can be found in the documentation there.

## Clarifications

### Endpoints
The endpoints have been created with a Use Case approach, responding to the needs of the current frontend.

- `findProductDetails`: Retrieves the details of a product filtered by its ID. The domain service currently only supports filtering by ID, but it could be extended to accommodate other types of filters.
- `createProduct`: This endpoint is intended for future use in the admin panel. Currently, it is used to perform a POST request to add an initial example product.

### Migrations
Currently, migrations handle the database initialization and can be managed through scripts.

### Seeds
Seeds are currently used to temporarily populate the dependencies table until an endpoint that supports this functionality is available.

## Configuration
To configure the project from scratch, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/lele589/sports-shop-api.git
   cd sports-shop-api
   ```

2. Setup the project:
   ```bash
   npm run setup
   ```

3. Create a .env file at the root of the project and add the following line:
   ```
   PORT=3000
   FRONTEND_URL=http://localhost:5174
   ```

4. Start server
   ```bash
   npm start
   ```

4. Ensure to follow the setup steps for the Frontend repository: [Sports Shop](https://github.com/lele589/sports-shop).

> [!NOTE]  
>If you want to have example data:
>- Make a POST request with the example JSON provided in the `requests.http` file (you can use the REST Client extension for VS Code to simplify this process).
>- Run the seeds to populate the dependencies table: `npm run seed:run`
>- Restart the server.





