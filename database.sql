-- Database name: tododb

CREATE TABLE todo_table (
    id serial PRIMARY KEY,
    item character varying(80),
    duedate date,
    description text,
    complete text,
);
