# FileShareExpress 

FileShareXpress is a file-sharing application built using the Express.js framework. The app allows users to securely upload, share, and download files. It features user authentication and authorization, integrates email notifications, and supports Google authentication. The project covers various key technologies including Node.js, Express.js, MongoDB, Multer for file uploads, and Nodemailer for sending email notifications.

## Features
- User authentication (signup, login, logout) using JWT
- Google authentication for easy login
- Secure file upload and storage using Multer
- File sharing via unique download links
- File download functionality
- Email notifications for file sharing using Nodemailer
- Expiry management for shared file links
  
## Technologies Used
- Backend: Node.js, Express.js
- Authentication: Passport.js, JWT (JSON Web Tokens), Google OAuth
- Database: MongoDB (via Mongoose)
- File Upload: Multer
- UUID Generation: uuid library
- Encryption: Bcrypt for password hashing
- Email Sending: Nodemailer (for email notifications)
- Logging: Morgan
- Templating: EJS (Embedded JavaScript)

## Usage
- Home Page: Displays options to upload files and manage your files.
- Signup/Login: Users can register or log in to access the file-sharing features.
- File Upload: Authenticated users can upload files and get a shareable link.
- File Download: Anyone with the link can download the shared file.
- Logout: Users can log out to end their session.
- Google Authentication: Users can log in using their Google accounts for easier access.
  
## API Endpoints
### Authentication Routes
- GET /auth/login: Render the login page.
- POST /auth/login: Handle login logic, authenticate users, set JWT in cookies.
- GET /auth/signup: Render the signup page.
- POST /auth/signup: Handle signup logic, create new user, set JWT in cookies.
- GET /auth/logout: Clear the JWT cookie and log out the user.
- GET /auth/google: Initiates Google OAuth authentication.
- GET /auth/google/callback: Handles Google OAuth callback.
  
### File Routes
- POST /files: Upload a new file (requires authentication).
- POST /files/send: Send an email with the file's download link (requires authentication).
  
### Download Routes
- GET /files/:uuid Render the file download page (requires authentication).
- GET /files/download/:uuid Download the file associated with the UUID (requires authentication).

### View Routes
- GET /files/:uuid: Render a page showing details of the file and provide a download link.

### Environment Variables
- PORT: The port on which the server runs (e.g., 3000).
- MONGO_URI: The connection string for your MongoDB database.
- JWT_SECRET: A secret key for signing JWTs.
- APP_BASE_URL: The base URL of your application (e.g., http://localhost:3000).
- MAIL_USER: The email address used to send notifications.
- GOOGLE_CLIENT_ID: The client ID for Google OAuth authentication.
- GOOGLE_CLIENT_SECRET: The client secret for Google OAuth authentication.
