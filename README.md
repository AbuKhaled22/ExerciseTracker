# Exercise Tracker

This web application allows users to track their exercises and view their exercise logs. It provides a simple interface for creating new users and adding exercises.

## Features

### 1. Create a New User

- **Endpoint:** `POST /api/users`
- **Form:** Allows users to enter a username and create a new user.

### 2. Add Exercises

- **Endpoint:** `POST /api/users/:_id/exercises`
- **Form:** Enables users to add exercises with details such as description, duration, and date.

### 3. View User's Exercise Log

- **Endpoint:** `GET /api/users/:_id/logs?[from][&to][&limit]`
- **Parameters:**
  - `[from]`, `[to]`: Optional date parameters (yyyy-mm-dd).
  - `[limit]`: Optional limit for the number of logs.

## Usage

1. **Create a New User:**
   - Enter a username in the provided input field.
   - Click the "Submit" button.

2. **Add Exercises:**
   - Enter the user's ID (`:_id`) in the corresponding input field.
   - Provide exercise details such as description, duration, and date.
   - Click the "Submit" button.

3. **View Exercise Log:**
   - Use the GET request with parameters for filtering:
     - `GET /api/users/:_id/logs?[from][&to][&limit]`
   - Replace `:id` with the actual user ID.
   - Optional parameters:
     - `from`, `to`: Specify date range (yyyy-mm-dd).
     - `limit`: Limit the number of logs.

## How to Run

1. Clone the repository.
2. install mongodb 
3. add your security access on mongodb in (.env) file
4. if you use vs code on terminal write npm start
5. Open a new window on the browser after it show you the port number.

## Contributing

Feel free to contribute to enhance the features or fix any issues. Create a pull request or raise an issue for discussion.

## copy right

this project from free code camp but the java script it's my own work.
