# Frontend:

## component design:

### Body

NavBar
Route: / => feed
Route: /login => loginPage
Route: /connections => feed
Route: /profile => profile

## Project-flow (frontend):

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
19. we should not be able to access other routes without login
20. if token is not present, redirect to login page
21. logout
22. get the feed , and add it in store.
23. built usercard on feed

# Deployment

1. sign-up on AWS
2. Launch the instance
3. open WSL, copy the .pem file in root
   - cp raghav-secret.pem ~/
   - cd ~/
4. Run this command, if necessary, to ensure your key is not publicly viewable.
   chmod 400 "raghav-secret.pem"
5. run: ssh -i "raghav-secret.pem" ubuntu@ec2-32-192-40-250.compute-1.amazonaws.com
6. install nodejs: curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
7. activate NVM:
   After installing, your terminal needs to "see" the new command. You can either restart your terminal or run this to activate it immediately: source ~/.bashrc
8. nvm install --lts (long term support version of ndoe)
9. verify:
   - node -v
   - npm -v
10. git clone
11. update all system dependencies:
    - run sudo apt update
12. install nginx
    - run sudo apt install nginx
13. start nginx
    - sudo systemctl start nginx
    - sudo systemctl enable nginx
14. install build
   - npm run build  
15. vite not found... install dependencies


14. copy code from dist folder to /var/www/html/
    sudo scp -r dist/* /var/www/html/
15. Enable port 80

### Backend:

1.  install dependencies
    - npm i
2.
