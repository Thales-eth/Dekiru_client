# Dekiru: Una aplicación de intercambio linguístico (Japonés/Español) creada usando el Stack MERN

# Aplicación desplegada

La aplicación desplegada se puede encontrar en el siguiente enlace: "####". A nivel estético, la aplicación ha sido desarrollada para Desktop. 

Si quiere correrse esta aplicación en local, será necesario crear un archivo .env en la raíz del proyecto y adjuntar la variable de entorno "REACT_APP_API_URL". Por defecto, nos servimos del valor "http://localhost:5005". El puerto 5005 es el elegido en este caso para levantar nuestro servicio (API). Este archivo .env se excluye de subida en nuestro archivo .gitignore.

Para instalar todas las dependencias utilizadas en el proyecto, simplemente se ha de ejecutar el comando:
```
npm install
```

# Rutas de la aplicación:

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