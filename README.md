# Dekiru: A Language Exchange Application (Japanese/Spanish) built using the MERN Stack

# Deployed Application

The deployed application can be found at the following link: "https://dekiru.vercel.app/". The application has been developed aesthetically for Desktop.

If you want to run this application locally, you will need to create a .env file in the root of the project and attach the environment variable "REACT_APP_API_URL". By default, we use the value "http://localhost:5005". The port 5005 is chosen in this case to start our service (API). This .env file is excluded from uploading to our .gitignore file.

To install all the dependencies used in the project, simply run the command:
```
npm install
```

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