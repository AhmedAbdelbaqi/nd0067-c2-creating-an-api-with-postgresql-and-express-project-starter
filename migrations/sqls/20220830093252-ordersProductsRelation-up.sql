/* Replace with your SQL commands */
create table ordersProducts (
    id serial primary key , 
    orderid integer references orders(id), 
    productid integer references products(id),
    Quantity integer 
)