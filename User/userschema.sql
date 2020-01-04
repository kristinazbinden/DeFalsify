drop table if exists user;
drop table if exists topic;

create table user(
	id serial primary key,
	name varchar(255) not null,
    regisetered boolean
);

create table topic(
	id serial primary key,
	description varchar(255) not null,
);
