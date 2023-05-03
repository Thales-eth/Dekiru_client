# Dekiru: A Language Exchange Application (Japanese/Spanish) built using the MERN Stack

Dekiru is a language exchange application built using the MERN stack that enables users to communicate with each other via sockets and share photos. In addition, the application provides a platform for language learners to find teachers and make payments using Stripe. Dekiru's matching tool connects users with similar interests, and the proximity-based search feature helps users find language speakers near them. 

# Deployed Application

The deployed application can be found at the following link: "https://dekiru.vercel.app/". The application has been developed aesthetically for Desktop.

If you want to run this application locally, you will need to create a .env file in the root of the project and attach the environment variable "REACT_APP_API_URL". By default, we use the value "http://localhost:5005". The port 5005 is chosen in this case to start our service (API). This .env file is excluded from uploading to our .gitignore file.

To install all the dependencies used in the project, simply run the command:
```
npm install
```

# Environment Variables

You will need to create a .env file if you want to run this project locally. In order to do so you will also need two variables:

- REACT_APP_API_URL
- REACT_APP_GOOGLE_MAPS_API_KEY

The deployed client of this proyect does not contain any Google Maps api keys for obvious reasons. If you don't use such API keys, you will only be able to see the development version of maps. 

# Application Routes:

| URL path                    | Description           | Protected | 
| :--------------------------:|:---------------------:|:---------------------:|
| /                           |  Home page            | ❌ |
| /login                      |  Login page           | ❌ |
| /signup                     |  Signup page          | ❌ |
| /contact                    |  Contact              | ❌ |
| /about                      |  About us             | ❌ |
| /profile                    |  Profile Page         | ✅ |
| /match                      |  Profile Page         | ✅ |
| /profile/edit               |  Edit Profile Page    | ✅ |
| /profile/delete             |  Delete Profile Page  | ✅ |
| /users/:id                  |  User Details page    | ✅ |
| /classes                    |  Classes List         | ✅ |
| /classes/create             |  Create Class         | ✅ |
| /conversations              |  Classes List         | ✅ |
| /conversation/:id           |  One Conversation     | ✅ |
| /posts                      |  Posts List           | ✅ |
| /posts/create               |  Post Creation Form   | ✅ |
| /reviews/create/:user_id    |  Reviews Creation Form| ✅ |