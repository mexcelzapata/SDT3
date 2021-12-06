create table product (
	id serial primary key,
	name varchar(255) not null,
	price float not null,
    stock int not null
);