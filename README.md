# Storefront Backend Project

## Getting Started

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and run `yarn` in your terminal at the project root.

## Required Technologies
Your application must make use of the following libraries:
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

## Steps to Completion

### 1. Plan to Meet Requirements

In this repo there is a `REQUIREMENTS.md` document which outlines what this API needs to supply for the frontend, as well as the agreed upon data shapes to be passed between front and backend. This is much like a document you might come across in real life when building or extending an API. 

Your first task is to read the requirements and update the document with the following:
- Determine the RESTful route for each endpoint listed. Add the RESTful route and HTTP verb to the document so that the frontend developer can begin to build their fetch requests.    
**Example**: A SHOW route: 'blogs/:id' [GET] 

- Design the Postgres database tables based off the data shape requirements. Add to the requirements document the database tables and columns being sure to mark foreign keys.   
**Example**: You can format this however you like but these types of information should be provided
Table: Books (id:varchar, title:varchar, author:varchar, published_year:varchar, publisher_id:string[foreign key to publishers table], pages:number)

**NOTE** It is important to remember that there might not be a one to one ratio between data shapes and database tables. Data shapes only outline the structure of objects being passed between frontend and API, the database may need multiple tables to store a single shape. 

### 2.  DB Creation and Migrations

Now that you have the structure of the databse outlined, it is time to create the database and migrations. Add the npm packages dotenv and db-migrate that we used in the course and setup your Postgres database. If you get stuck, you can always revisit the database lesson for a reminder. 

You must also ensure that any sensitive information is hashed with bcrypt. If any passwords are found in plain text in your application it will not pass.

### 3. Models

Create the models for each database table. The methods in each model should map to the endpoints in `REQUIREMENTS.md`. Remember that these models should all have test suites and mocks.

### 4. Express Handlers

Set up the Express handlers to route incoming requests to the correct model method. Make sure that the endpoints you create match up with the enpoints listed in `REQUIREMENTS.md`. Endpoints must have tests and be CORS enabled. 

### 5. JWTs

Add JWT functionality as shown in the course. Make sure that JWTs are required for the routes listed in `REQUIUREMENTS.md`.

### 6. QA and `README.md`

Before submitting, make sure that your project is complete with a `README.md`. Your `README.md` must include instructions for setting up and running your project including how you setup, run, and connect to your database. 

Before submitting your project, spin it up and test each endpoint. If each one responds with data that matches the data shapes from the `REQUIREMENTS.md`, it is ready for submission!

## Instruction to create .env file 
1. create file with extention .env in project directory 
2. add the variables in file as below 
----- .env file variables -------
POSTGRES_HOST = "localhost"
POSTGRES_DB = "shopping"
POSTGRES_USER = "shopping_user"
POSTGRES_PASSWORD = "password123"
POSTGRES_PORT = 5432
PASSWORDPEPPER = "hash#"
SALTROUNDS = 10
TOKENSECRET = "jsontoken"
ENV = dev

# Test DataBase 
TEST_DATABASE = "shopping_test"
TEST_USER = "shopping_user_test"
TEST_PASSWORD = 123
----- End .env file variables -------

# Express Server Port : 3000 
# Pg Database Port : 5432


## Step1
## SQL Database creation 
in postgres command terminal 
create database shopping ;
create user shopping_user with password 'password123';
grant all privileges on database shopping to shopping_user;
alter database shopping owner to shopping_user; 

## Step 2 do the migration 
db-migrate up 



## Step 3 start the server 
npm run watch 
create uesrs 
http://localhost:3000/user
[body] 
{
"firstname" : "Ahmed",
"lastname" : "Elsadek",
"password" : 2020
}


### start jasmine test 
## step 1 test Database
create database shopping_test ;
create user shopping_user_test with password '123';
grant all privileges on database shopping_test to shopping_user_test;
alter database shopping_test owner to shopping_user_test; 

## step 2 
npm run test [windows] script: set ENV=test
npm run test [linux] >> change the script in package.json to ENV=test

[note] 
## Token always in the {Headers.Authorization} ##### Token check 

#####                 User Routes 
### app.get("/users" , index); >> show all users [token] 
Example : http://localhost:3000/users [get]

### app.get("/user/:id" , show) >> show single user data [token]
Example : http://localhost:3000/user/4 [get] 


### app.post("/user" , usercheck ,create); >> create new user N[token] - can't create user with the same first and last name 
Example : http://localhost:3000/user [post]
[Body]
{
    "firstname" : "Said",
    "lastname" : "Ahmed",
    "password" : "uinkk"
}

### app.get("/signin" , usercheck, checkpassword ,signin); >> get the token by signing in 
Example : http://localhost:3000/user/signin 
[Body]
{
    "firstname" : "Said",
    "lastname" : "Ahmed",
    "password" : "uinkk"
}


app.post("/user/:id/modify"  , edit) >> edit the user [token]
Example : http://localhost:3000/user/1/modify 
[Body]
{
    "firstname" : "Said",
    "lastname" : "Ahmed",
    "password" : "uinkk"
}
[token] [headers.Authorization]


######                 order Routes
app.post("/order/:userid" , create); >> create order using userid [token]
Example : http://localhost:3000/order/2

app.get("/order/:userid" , Getorder); >> get the complete orders of the usere [token]
Example : http://localhost:3000/order/2
[orderstatus] (active or complete) - get the user orders which are active or complete >> [default] complete 
[body]
{
    "status" : "active"
}

app.post("/orderclose", orderUserCheck,Closeorder); >> close the order [token]
Example : http://localhost:3000/orderclose
[body]

{
    "userid" : 2 ,
    "orderid" : 3
}

### Products Routes
app.get("/products" , index); >> get all products N[token]
Example : http://localhost:3000/products

app.post("/product", create); >> create new product N[token]
Example : http://localhost:3000/product
[body]
{
    "productname" :"Product C" , 
    "price" : 5000 ,
    "category" : "Cat.2"   
}


app.get("/product/:id" , show); >> show product data N[token]
Example : http://localhost:3000/product/1

app.get("/productcat" , GetProductsbyCat);  >> get product by catergory N[token]
Example : http://localhost:3000/productcat?category=Cat.1

in the [dashboardHandler.ts]
app.get("/PopularProduct" , GetPopularProduct); N[token]
Example : http://localhost:3000/PopularProduct




