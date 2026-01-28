## BACKEND DEV PROJECT

## PROJECT PURPOSE: 

Welcome to my first API! Built for managing tasks with user authentication and authorization.

This RESTFUL API is the engine that powers the entire application for TASKMASTER by
~ Handling user accounts
~ Project management
~ Achieving individual tasks. 

This project was designed to synthesize the skills I've learned over the last few modules.

## Features
- Secure user authentication with JWT tokens
- Password hashing using bcrypt
- User registration and login
- Full CRUD operations for projects
- Full CRUD operations for tasks
- Nested task routes (tasks belong to projects)
- Ownership-based authorization
- Users can only access their own data
- MongoDB database with Mongoose ODM
- RESTful API design
- Environment-based configuration
- Modular code structure


## WHAT ARE THE SECURITY FEATURES?
- Passwords hashed with bcrypt before storage
- JWT tokens required for all protected routes
- Users can only access their own projects and tasks
- Authorization checks verify ownership before allowing operations

## API Endpoints

### Authentication (Public)
- `POST /api/users/register` - Create new user
- `POST /api/users/login` - Login and receive JWT token

### Projects (Protected)
- `POST /api/projects` - Create new project
- `GET /api/projects` - Get all user's projects
- `GET /api/projects/:id` - Get single project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Tasks (Protected)
- `POST /api/projects/:projectId/tasks` - Create task in project
- `GET /api/projects/:projectId/tasks` - Get all tasks in project
- `PUT /api/tasks/:taskId` - Update task
- `DELETE /api/tasks/:taskId` - Delete task

All protected routes require: `Authorization: Bearer <token>`


## Technologies Used

### Backend
- Node.js v25.4.0
- Express.js - Server framework
- MongoDB - Database
- Mongoose - Database modeling

### Security
- bcrypt - Password hashing
- jsonwebtoken - JWT authentication
- dotenv - Environment configuration

### Development Tools
- npm - Package manager
- nodemon - Development auto-restart
- VS Code - Code editor
- Postman/curl - API testing