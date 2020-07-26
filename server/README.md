# Password Reset RESTful API
Password reset RESTful API to manage user signup, login, forgot password and password reset. 

## Requirements
1. Install a local MongoDB server or use vandor provided MongoDB instance.
2. Add your configuration in `config/config.js` file.
3. If using Gmail to send the mail then enable *Less secure app access* [Link](https://myaccount.google.com/lesssecureapps).

## Project Setup 
1. Clone the project repository from github
```
git clone https://github.com/rakeshCoursera/pwd_reset_assign.git
```
2. Go to the project folder
```
cd pwd_reset_assign
```
3. Run npm install to install all dependencies
```
npm install
```
4. Now run npm start
```
npm start
```
This will run the project while showing `Listening: http://localhost:3000` on console.

### For Development with Nodemon

```
npm run dev
```

## APIs 
### /
* `GET` : Get the version of API

### /user/signup
* *Description*: user signup API
* *Method*: POST
* *Body*: 
```
{
	"email": "test@test.com",
	"password": "Test@123",
	"mobile": "9000090000"
}
```
* *Response*: Could be one from `User already exists`, and `User created`, if all goes well else will give a error message.

### /user/login
* *Description*: user login API, to be used after signup done
* *Method*: POST
* *Body*: 
```
{
	"email": "test@test.com",
	"password": "Test@123"
}
or 
{
	"mobile": "9000090000",
	"password": "Test@123"
}
or 
{
	"email": "test@test.com",
	"password": "Test@123",
	"mobile": "9000090000"
}
```
* *Response*: Will give `Authentication successful`, if credentials are correct else will give a `Authenticaton failed`. In case of error, will give a error message.

### /user/forgot
* *Description*: user forgot password API to get the password reset token on mail
* *Method*: POST
* *Body*: 
```
{
	"email": "test@test.com",
}
```
* *Response*: Could be one from `reset password mail sent`, and `User account not exists`, if all goes well else will give a error message.

### /user/reset/token
* *Description*: user password reset API to change the password to a new password
* *Method*: POST
* *Body*: 
```
{
	"email": "test@test.com",
	"password": "Test@75"
}
```
* *Response*: Could be one from `Password reset successfully`, `Using a expired token`, `Token already used for password reset`, and `User account not exists`, if all goes well else will give a error message.

## Future Scope
1. Implement [Swagger UI](https://swagger.io/tools/swagger-ui/) for better visualization and interaction with the API’s.
2. Write unit tests with coverage report.
3. Add a UI to showcase the functionality (with React, Redux) of these APIs.
