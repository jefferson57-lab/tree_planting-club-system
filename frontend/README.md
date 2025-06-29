# Tree Planting Club System

A full-stack web application for managing tree planting clubs, events, memberships, and reviews. Built with Flask (Python) for the backend and React for the frontend.

## Features

- User registration, login, and profile management
- Create, view, edit, and delete clubs
- Join clubs as a member or organizer
- Create, view, edit, and delete events for clubs
- Submit and view reviews for events
- Role-based membership management
- JWT-based authentication
- PostgreSQL database with Flask-Migrate migrations

## Technologies Used

- **Backend:** Flask, Flask-SQLAlchemy, Flask-Marshmallow, Flask-Migrate, Flask-JWT-Extended, PostgreSQL
- **Frontend:** React, React Router, Formik, Yup, Bootstrap

## Getting Started

### Prerequisites

- Python 3.8+
- Node.js and npm
- PostgreSQL

### Backend Setup

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd tree_planting-club-system
   ```

2. **Set up a virtual environment and install dependencies:**
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   pip install -r backend/requirements.txt
   ```

3. **Configure the database:**
   - Create a PostgreSQL database and user:
     ```sql
     CREATE DATABASE treeplanting;
     CREATE USER treeuser WITH PASSWORD 'treepass';
     GRANT ALL PRIVILEGES ON DATABASE treeplanting TO treeuser;
     ```
   - The default connection string is set in `backend/config.py`. Adjust if needed.

4. **Run database migrations:**
   ```bash
   export FLASK_APP=backend.app:create_app
   flask db upgrade
   ```

5. **(Optional) Seed the database:**
   ```bash
   python seed.py
   ```

6. **Start the backend server:**
   ```bash
   flask run
   ```
   The API will be available at `http://localhost:5000/api/`.

### Frontend Setup

1. **Install frontend dependencies:**
   ```bash
   cd frontend
   npm install
   ```

2. **Start the frontend development server:**
   ```bash
   npm start
   ```
   The app will be available at `http://localhost:3000/`.

   The frontend is configured to proxy API requests to the backend.

## Project Structure

```
tree_planting-club-system/
├── backend/
│   ├── app.py
│   ├── models.py
│   ├── routes/
│   ├── schemas.py
│   ├── extensions.py
│   ├── config.py
│   ├── requirements.txt
│   └── ...
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
├── migrations/
├── seed.py
└── README.md
```

## API Overview

- `/api/auth/signup` - Register a new user
- `/api/auth/login` - Login and receive JWT token
- `/api/clubs/` - CRUD operations for clubs
- `/api/events/` - CRUD operations for events
- `/api/memberships/` - Manage club memberships
- `/api/reviews/` - Manage event reviews
- `/api/auth/users/<id>` - Get or update user profile

## Environment Variables

- Backend database URI can be set via the `DATABASE_URL` environment variable.
- JWT secret key is set in `backend/app.py` (`JWT_SECRET_KEY`).

## Running Tests

Backend tests can be added using `unittest` or `pytest`.

## License

This project is for educational