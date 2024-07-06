# TodoApp_Using_Redux

This is a simple CRUD (Create, Read, Update, Delete) application built using React, Redux, React Router, and Axios. The application allows users to create, read, update, and delete user information.

Table of Contents
Getting Started
Available Scripts
Folder Structure
Dependencies
Redux Slice
Components
Styling
Testing
Getting Started
To get started with the application, follow these steps:

Clone the repository:

sh
Copy code
git clone https://github.com/your-repo/react-redux-crud.git
cd react-redux-crud
Install dependencies:

sh
Copy code
npm install
Start the development server:

sh
Copy code
npm start
The application will be available at http://localhost:3000.

Available Scripts
In the project directory, you can run:

npm start: Runs the app in the development mode.
npm test: Launches the test runner in the interactive watch mode.
npm run build: Builds the app for production to the build folder.
npm run eject: Ejects the app from the create-react-app configuration.
Folder Structure
java
Copy code
my-app/
├── public/
├── src/
│   ├── app/
│   │   ├── store.js
│   ├── components/
│   │   ├── Create.js
│   │   ├── Read.js
│   │   ├── Update.js
│   ├── features/
│   │   ├── crudSlice.js
│   ├── App.js
│   ├── index.js
│   ├── App.css
│   ├── index.css
├── package.json
├── README.md
Dependencies
react: JavaScript library for building user interfaces.
react-dom: Entry point to the DOM and server renderers for React.
react-redux: Official React bindings for Redux.
react-router-dom: DOM bindings for React Router.
@reduxjs/toolkit: The official, recommended way to write Redux logic.
axios: Promise-based HTTP client for the browser and Node.js.
bootstrap: Front-end framework for faster and easier web development.
Redux Slice
The crudSlice.js file defines a slice of the Redux state for CRUD operations. It includes asynchronous thunks for fetching, creating, updating, and deleting users using Axios for HTTP requests.

javascript
Copy code
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = 'https://666ece08f1e1da2be521333d.mockapi.io/Crud-Operation';

// Thunks for async actions
export const fetchUsers = createAsyncThunk('crud/fetchUsers', async () => {
  const response = await axios.get(apiUrl);
  return response.data;
});

export const createUser = createAsyncThunk('crud/createUser', async (user) => {
  const response = await axios.post(apiUrl, user);
  return response.data;
});

export const deleteUser = createAsyncThunk('crud/deleteUser', async (id) => {
  await axios.delete(`${apiUrl}/${id}`);
  return id;
});

export const updateUser = createAsyncThunk('crud/updateUser', async ({ id, user }) => {
  const response = await axios.put(`${apiUrl}/${id}`, user);
  return response.data;
});

const crudSlice = createSlice({
  name: 'crud',
  initialState: {
    users: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(user => user.id !== action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(user => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      });
  },
});

export default crudSlice.reducer;
Components
Create.js
The Create component allows users to create a new user. It uses the createUser thunk to dispatch the create action.

Read.js
The Read component displays a list of users. It fetches the users from the API using the fetchUsers thunk and allows users to delete or edit a user.

Update.js
The Update component allows users to update an existing user's information. It uses the updateUser thunk to dispatch the update action.

Styling
The application uses Bootstrap for styling. The custom styles are defined in the App.css and index.css files.

Testing
The application includes a basic test for rendering the App component using React Testing Library.

javascript
Copy code
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
To run the tests, use the following command:

sh
Copy code
npm test
This is a basic overview of the React Redux CRUD application. You can further enhance the application by adding more features, improving the UI, and writing additional tests. Happy coding!
