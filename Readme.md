# Frontend:

## component design:

### Body

NavBar
Route: / => feed
Route: /login => loginPage
Route: /connections => feed
Route: /profile => profile

## Project-flow:

1. create a vite+react application
2. remove unnecessary code
3. install tailwindCSS, daisyUI
4. separate component for navbar...
5. install react router dom ( npm i react-router-dom)
6. Create a browser router > Routes > Route / Body > children routes.
7. Create an Outlet in body component
   it will render all the child component of body in app.js
8. Create a Footer
9. login page
10. install axios
11. CORS ERROR: install cors in backend => add middleware to app.js with configuration origin, credentials: true
12. whenever we are making API call, pass axios => {withCredentials: true}
13. install @reduxjs/toolkit and react-redux
14. create a store (confihureStore) and then provide it to application on root level (using Provider) => createSlice =>addReducer to store
15. added redux dev tools in chrome
16. login, and checked if data is coming properly in store.
17. Navbar should update as user login
    (no picture of user or username on navbar initially, and updatea accordingly to user name )
18. refactor code and added constant file
