# ChessBar Backend

This project is the backend application for ChessBar, a platform to organize and manage chess tournaments. The application provides a RESTful API for managing tournaments, participants, and authentication.

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Getting Started

Follow these instructions to set up and run the project on your local machine for development and testing purposes.

### Prerequisites

Ensure you have the following software installed:

- [Node.js](https://nodejs.org/en/) (version 14 or above)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)
- [MariaDB](https://mariadb.org/) or [MySQL](https://www.mysql.com/)

### Installation

1. Clone the repository:
    ```sh
   git clone https://github.com/yourusername/chessBar_back.git

2. Navigate to the project directory:
     ```sh
    cd chessBar_back

3. Install the dependencies:
   ```sh
    npm install

4. Set up your environment variables:
    Create a .env file in the root directory.
    Add the necessary environment variables (e.g., database connection string, JWT secret).
    Example .env file:
   
     ```sh
    DB_HOST=localhost
    DB_PORT=3306
    DB_USER=your_db_user
    DB_PASS=your_db_password
    DB_NAME=chessbar
    JWT_SECRET=your_jwt_secret

### Running the Application

1. To start the server, run:
   ```sh
   npm start

The server will start and listen for requests at http://localhost:5000.

### Project Structure

The project structure is as follows:

 ```sh
chessBar_back/
├── config/
│   ├── config.json
│   └── ...
├── controllers/
│   ├── tournamentController.js
│   └── ...
├── models/
│   ├── index.js
│   ├── tournament.js
│   └── ...
├── routes/
│   ├── tournamentRoutes.js
│   └── ...
├── utils/
│   ├── authGuard.js
│   └── ...
├── .env
├── app.js
├── package.json
└── README.md
 ```
```sh
config/: Configuration files for the database.
controllers/: Logic for handling requests and responses.
models/: Sequelize models for the database.
routes/: API route definitions.
utils/: Utility functions and helpers.
app.js: Entry point of the application.
```

### API Endpoints

Here are some key API endpoints provided by the backend:

```sh
GET /api/tournaments/:id: Fetch details of a specific tournament.
POST /api/tournaments: Create a new tournament.
PUT /api/tournaments/:id: Update a specific tournament.
DELETE /api/tournaments/:id: Delete a specific tournament.
POST /api/auth/login: Authenticate a user and return a token.
```
### Usage

### Authentication

The application uses token-based authentication. Ensure you have a valid token to access the admin routes.

### Creating a Tournament

To create a tournament, send a POST request to /api/tournaments with the tournament details in the request body.

Example:
```sh
curl -X POST http://localhost:5000/api/tournaments -H "Content-Type: application/json" -d '{
  "name": "Summer Chess Championship",
  "city": "New York",
  "game_day": "2024-07-01",
  "game_time": "10:00:00",
  "players": ["player1", "player2", "player3"]
}'
```
### Contributing

We welcome contributions! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch:
```sh
git checkout -b feature/chessBar_front
```
3. Make your changes and commit them:
```sh
git commit -m 'Add some feature'
```
4. Make your changes and commit them:
```sh
git push origin feature/your-feature-name
```
5. Open a pull request.

### License

This project is licensed under the MIT License - see the LICENSE file for details.

### Acknowledgements

- [Express](https://expressjs.com/)
- [Sequelize](https://sequelize.org/)
- [Node.js](https://nodejs.org/en)
- [MariaDB](https://mariadb.org/)
- [MySQL](https://www.mysql.com/)
