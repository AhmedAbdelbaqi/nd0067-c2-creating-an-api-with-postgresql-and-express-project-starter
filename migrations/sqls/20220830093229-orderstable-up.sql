/* Replace with your SQL commands */
create table orders (id serial primary key , 
orderstatus varchar(20), 
userid integer references users(id)
)