# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## Database schema
### Database Name : shopping 
### Table list 
 Schema |      Name      | Type  |     Owner
--------+----------------+-------+---------------
 public | migrations     | table | shopping_user
 public | orders         | table | shopping_user
 public | ordersproducts | table | shopping_user
 public | products       | table | shopping_user
 public | users          | table | shopping_user


### users table 
 Column   |          Type          | Collation | Nullable |              Default

-----------+------------------------+-----------+----------+-----------------------------------
 id        | integer                |           | not null | nextval('users_id_seq'::regclass)
 firstname | character varying(100) |           |          |
 lastname  | character varying(100) |           |          |
 password  | text                   |           |          |
Indexes:
    "users_pkey" PRIMARY KEY, btree (id)
Referenced by:
    TABLE "orders" CONSTRAINT "orders_userid_fkey" FOREIGN KEY (userid) REFERENCES users(id)

### orders table 
                                    Table "public.orders"
   Column    |         Type          | Collation | Nullable |              Default
-------------+-----------------------+-----------+----------+------------------------------------
 id          | integer               |           | not null | nextval('orders_id_seq'::regclass)
 orderstatus | character varying(20) |           |          |
 userid      | integer               |           |          |
Indexes:
    "orders_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "orders_userid_fkey" FOREIGN KEY (userid) REFERENCES users(id)
Referenced by:
    TABLE "ordersproducts" CONSTRAINT "ordersproducts_orderid_fkey" FOREIGN KEY (orderid) REFERENCES orders(id)   

### products table 
                                     Table "public.products"
   Column    |          Type          | Collation | Nullable |               Default
-------------+------------------------+-----------+----------+--------------------------------------
 id          | integer                |           | not null | nextval('products_id_seq'::regclass)
 productname | character varying(200) |           |          |
 price       | numeric                |           |          |
 category    | character varying(100) |           |          |
Indexes:
    "products_pkey" PRIMARY KEY, btree (id)
Referenced by:
    TABLE "ordersproducts" CONSTRAINT "ordersproducts_productid_fkey" FOREIGN KEY (productid) REFERENCES products(id)  

### ordersproducts table 
 Column   |  Type   | Collation | Nullable |                  Default
-----------+---------+-----------+----------+--------------------------------------------
 id        | integer |           | not null | nextval('ordersproducts_id_seq'::regclass)
 orderid   | integer |           |          |
 productid | integer |           |          |
 quantity  | integer |           |          |
Indexes:
    "ordersproducts_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "ordersproducts_orderid_fkey" FOREIGN KEY (orderid) REFERENCES orders(id)
    "ordersproducts_productid_fkey" FOREIGN KEY (productid) REFERENCES products(id)


## API Endpoints
#### Products
- Index 
- Show
- Create [token required]
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required]
- Show [token required]
- Create N[token required]

#### Orders
- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

#### User
- id
- firstName
- lastName
- password

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

