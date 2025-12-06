# CMaNGOS Account Dashboard

This project consists of a Nest.js backend and a React frontend for managing CMaNGOS accounts.

## Project Structure

- `server/`: Nest.js backend application.
- `client/`: React + Vite frontend application.

## Prerequisites

- Node.js (v18+)
- MySQL Database (running CMaNGOS `realmd` or `auth` database)

## Setup

### Backend

1. Navigate to the server directory:

   ```bash
   cd server
   ```

2. Install dependencies (already done):

   ```bash
   npm install
   ```

3. Configure environment variables:
   Edit `.env` and set your database credentials:

   ```env
   DB_HOST=localhost
   DB_PORT=3306
   DB_USERNAME=mangos
   DB_PASSWORD=mangos
   DB_DATABASE=realmd
   ```

4. Start the server:

   ```bash
   npm run start:dev
   ```

   The API will be available at `http://localhost:3000`.

### Frontend

1. Navigate to the client directory:

   ```bash
   cd client
   ```

2. Install dependencies (already done):

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`.

## Features

- **Account Creation:** Users can register new accounts. The backend handles SHA1 password hashing compatible with CMaNGOS.
- **Expansion Selection:** Users can select their desired expansion (Classic, TBC, WotLK, etc.).
