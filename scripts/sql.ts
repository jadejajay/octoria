//basic sql commands for the database
export const show_databases = {
  // Show Databases:
  // -- Show all databases
  // SHOW DATABASES;
  // -- Select a specific database
  // USE database_name;
};
export const create_database = {
  // Create Database:
  // CREATE DATABASE database_name;
};
export const drop_database = {
  // Drop Database:
  // DROP DATABASE database_name;
};
export const show_tables = {
  // Show Tables:
  // SHOW TABLES;
};
export const create_table = {
  // Create Table:
  // CREATE TABLE table_name (
  //   column1 datatype,
  //   column2 datatype,
  //   column3 datatype
  // );
};
export const all_data_types = {
  // All Data Types:
  // -- Numeric Data Types:
  // -- int, bigint, smallint, tinyint, decimal, numeric, float, real
  // -- Date and Time Data Types:
  // -- date, time, datetime, timestamp, year
  // -- String Data Types:
  // -- char, varchar, binary, varbinary, blob, text, enum, set
};
export const use_cases_of_all_data_types = {
  // Use Cases of All Data Types:
  // -- int: Used for whole numbers
  // -- bigint: Used for whole numbers that are larger than int
  // -- smallint: Used for whole numbers that are smaller than int
  // -- tinyint: Used for whole numbers that are smaller than smallint
  // -- decimal: Used for monetary values
  // -- numeric: Used for monetary values
  // -- float: Used for scientific values
  // -- real: Used for scientific values
  // -- date: Used for date values
  // -- time: Used for time values
  // -- datetime: Used for date and time values
  // -- timestamp: Used for date and time values
  // -- year: Used for year values
  // -- char: Used for strings with a fixed length
  // -- varchar: Used for strings with a variable length
  // -- binary: Used for binary data
  // -- varbinary: Used for binary data with a variable length
  // -- blob: Used for binary data with a variable length
  // -- text: Used for long text data
  // -- enum: Used for specifying only one value out of a list of possible values
  // -- set: Used for specifying zero or more values out of a list of possible values
};
export const example_of_all_data_types = {
  // Example of All Data Types: (MySQL)
  // -- int:
  // whole_number int NOT NULL; // -- format: 0 to 4294967295
  // -- bigint:
  // large_number bigint NOT NULL; // -- format: 0 to 18446744073709551615
  // -- smallint:
  // small_number smallint NOT NULL; // -- format: 0 to 255
  // -- tinyint:
  // tiny_number tinyint NOT NULL; // -- format: 0 to 255
  // -- decimal:
  // scientific_decimal_number decimal(10,2) NOT NULL; // -- format: 0.00
  // -- numeric:
  // scientific_numeric_number numeric(10,2) NOT NULL; // -- same as decimal
  // -- float:
  // scientific_float_number float NOT NULL; // -- format: 0.0000000000
  // -- real:
  // scientific_real_number real NOT NULL; // -- format: 0.0000000000
  // -- date:
  // date_only date NOT NULL; // -- format: YYYY-MM-DD
  // -- time:
  // time_only time NOT NULL; // -- format: HH:MM:SS
  // -- datetime:
  // date_and_time datetime NOT NULL; // -- format: YYYY-MM-DD HH:MM:SS
  // -- timestamp:
  // date_and_time timestamp NOT NULL; // -- format: YYYY-MM-DD HH:MM:SS
  // -- year:
  // year_only year NOT NULL; // -- format: YYYY
  // -- char:
  // fixed_length_string char(10) NOT NULL; // -- format: 0000000000
  // -- varchar:
  // variable_length_string varchar(10) NOT NULL; // -- format: 0x0000000000
  // -- binary:
  // fixed_length_binary binary(10) NOT NULL; // -- format: 0x0000000000
  // -- varbinary:
  // variable_length_binary varbinary(10) NOT NULL; // -- format: 0x0000000000
  // -- blob:
  // variable_length_binary blob NOT NULL; // -- format: 0x0000000000
  // -- text:
  // long_text text NOT NULL; // -- format: 0x0000000000
  // -- enum:
  // one_of_many_values enum('value1', 'value2', 'value3') NOT NULL; // -- format: value1
  // -- set:
  // zero_or_more_values set('value1', 'value2', 'value3') NOT NULL; // -- format: value1,value2
  // -- auto_increment:
  // auto_increment_column int NOT NULL AUTO_INCREMENT, // -- format: 0 to 4294967295
  // usage to create a primary key which auto increments for each new record added to the table (MySQL)
  // -- primary_key:
  // primary_key_column int NOT NULL PRIMARY KEY, // -- format: 0 to 4294967295
  // usage to uniquely identify each record in a table (MySQL)
  // -- foreign_key:
  // foreign_key_column int NOT NULL, // -- format: 0 to 4294967295
  // FOREIGN KEY (foreign_key_column) REFERENCES table_name(column_name)
  // usage to assign a foreign key to a column in a table which references the primary key of another table (MySQL)
  // -- unique_key:
  // unique_key_column int NOT NULL UNIQUE, // -- format: 0 to 4294967295
  // usage to uniquely identify each record in a table (MySQL)
  // -- not_null:
  // not_null_column int NOT NULL, // -- format: 0 to 4294967295
  // usage to ensure that a column cannot contain any NULL value (MySQL)
  // -- default:
  // default_column int NOT NULL DEFAULT 0, // -- format: 0 to 4294967295
  // usage to specify a default value for a column (MySQL)
  // -- index:
  // index_column int NOT NULL, // -- format: 0 to 4294967295
  // INDEX (index_column)
  // usage to create an index on a table (MySQL)
  // -- fulltext:
  // fulltext_column text NOT NULL, // -- format: 0x0000000000
  // FULLTEXT (fulltext_column)
  // usage to create a full text search index on a table like the one used by Google for example searches (MySQL)
  // -- spatial:
  // spatial_column geometry NOT NULL, // -- format: 0x0000000000
  // SPATIAL (spatial_column)
  // usage to create a spatial index on a table which is used for spatial searches like the ones used by Google Maps for example this is used to find locations based on their latitude and longitude (MySQL)
  // -- check:
  // check_column int NOT NULL, // -- format: 0 to 4294967295
  // CHECK (check_column > 0)
  // usage to specify a condition for the column (MySQL)
  // -- view:
  // CREATE VIEW view_name AS
  // SELECT column_name(s)
  // FROM table_name
  // WHERE condition;
  // usage to create a view which is a virtual table based on the result-set of an SQL statement (MySQL)
  // -- trigger:
  // CREATE TRIGGER trigger_name trigger_time trigger_event ON table_name FOR EACH ROW trigger_body;
  // usage to create a trigger which is a set of actions that are run automatically when a specified change operation (INSERT, UPDATE, DELETE) is performed on a specified table (MySQL)
  // for example: CREATE TRIGGER trigger_name BEFORE INSERT ON table_name FOR EACH ROW SET NEW.column_name = value;
  //            : CREATE TRIGGER trigger_name AFTER INSERT ON table_name FOR EACH ROW SET NEW.column_name = value;
  //            : CREATE TRIGGER trigger_name BEFORE UPDATE ON table_name FOR EACH ROW SET NEW.column_name = value;
  //            : CREATE TRIGGER trigger_name AFTER UPDATE ON table_name FOR EACH ROW SET NEW.column_name = value;
  //            : CREATE TRIGGER trigger_name BEFORE DELETE ON table_name FOR EACH ROW SET NEW.column_name = value;
  //            : CREATE TRIGGER trigger_name AFTER DELETE ON table_name FOR EACH ROW SET NEW.column_name = value;
  //            : CREATE TRIGGER trigger_name BEFORE INSERT ON table_name FOR EACH ROW BEGIN SET NEW.column_name = value; SET NEW.column_name = value; END;
  // -- stored_procedure:
  // CREATE PROCEDURE procedure_name
  // AS
  // sql_statement
  // GO;
  // usage to create a stored procedure which is a prepared SQL code that you can save, so the code can be reused over and over again (MySQL)
  // -- comment:
  // -- This is a comment
  // /* This is a comment */
  // -- wildcard:
  // SELECT column_name(s)
  // FROM table_name
  // WHERE column_name LIKE pattern;
  // -- in_operator:
  // SELECT column_name(s)
  // FROM table_name
  // WHERE column_name IN (value1, value2, ...);
  // -- between_operator:
  // SELECT column_name(s)
  // FROM table_name
  // WHERE column_name BETWEEN value1 AND value2;
  // -- aliases:
  // SELECT column_name AS alias_name
  // FROM table_name;
  // -- joins:
  // SELECT column_name(s)
  // FROM table_name1
  // INNER JOIN table_name2 ON table_name1.column_name = table_name2.column_name;
  // -- inner_join:
  // SELECT column_name(s)
  // FROM table_name1
  // INNER JOIN table_name2 ON table_name1.column_name = table_name2.column_name;
  // -- left_join:
  // SELECT column_name(s)
  // FROM table_name1
  // LEFT JOIN table_name2 ON table_name1.column_name = table_name2.column_name;
  // -- right_join:
  // SELECT column_name(s)
  // FROM table_name1
  // RIGHT JOIN table_name2 ON table_name1.column_name = table_name2.column_name;
  // -- full_join:
  // SELECT column_name(s)
  // FROM table_name1
  // FULL JOIN table_name2 ON table_name1.column_name = table_name2.column_name;
  // -- self_join:
  // SELECT column_name(s)
  // FROM table_name1 T1, table_name2 T2
  // WHERE condition;
  // -- union_join:
  // SELECT column_name(s) FROM table_name1
  // UNION JOIN
  // SELECT column_name(s) FROM table_name2;
  // -- case_statement:
  // SELECT column_name,
  // CASE
  // WHEN condition THEN 'Result_1'
  // WHEN condition THEN 'Result_2'
  // WHEN condition THEN 'Result_3'
  // ELSE 'Result_4'
  // END
  // FROM table_name;
  // -- exists_operator:
  // SELECT column_name(s)
  // FROM table_name
  // WHERE EXISTS
  // (SELECT column_name FROM table_name WHERE condition);
  // -- any_operator:
  // SELECT column_name(s)
  // FROM table_name
  // WHERE column_name operator ANY
  // (SELECT column_name FROM table_name WHERE condition);
  // -- all_operator:
  // SELECT column_name(s)
  // FROM table_name
  // WHERE column_name operator ALL
  // (SELECT column_name FROM table_name WHERE condition);
  // -- select_into:
  // SELECT column1, column2 INTO new_table_name [IN externaldatabase] FROM old_tablename WHERE condition;
  // -- insert_into:
  // INSERT INTO table_name (column1, column2, column3) VALUES (value1, value2, value3);
  // -- insert_into_select:
  // INSERT INTO table_name (column1, column2, column3)
  // SELECT column1, column2, column3 FROM table_name WHERE condition;
};
export const drop_table = {
  // Drop Table:
  // DROP TABLE table_name;
};
export const alter_table = {
  // Alter Table:
  // ALTER TABLE table_name ADD column_name datatype;
  // ALTER TABLE table_name DROP COLUMN column_name;
  // ALTER TABLE table_name MODIFY COLUMN column_name datatype;
  // ALTER TABLE table_name RENAME COLUMN old_name to new_name;
};
export const insert_into = {
  // Insert Into:
  // INSERT INTO table_name (column1, column2, column3) VALUES (value1, value2, value3);
};
export const update = {
  // Update:
  // UPDATE table_name SET column1 = value1, column2 = value2 WHERE condition;
};
export const delete_from = {
  // Delete From:
  // DELETE FROM table_name WHERE condition;
};
export const select = {
  // Select:
  // SELECT column1, column2 FROM table_name;
  // SELECT * FROM table_name;
};
export const select_distinct = {
  // Select Distinct:
  // SELECT DISTINCT column1, column2 FROM table_name;
};
export const where = {
  // Where:
  // SELECT column1, column2 FROM table_name WHERE condition;
  // SELECT * FROM table_name WHERE condition1 AND condition2;
  // SELECT * FROM table_name WHERE condition1 OR condition2;
  // SELECT * FROM table_name WHERE NOT condition;
};
export const order_by = {
  // Order By:
  // SELECT * FROM table_name ORDER BY column1 ASC, column2 DESC;
};
export const insert_into_select = {
  // Insert Into Select:
  // INSERT INTO table_name (column1, column2, column3)
  // SELECT column1, column2, column3 FROM table_name WHERE condition;
};
export const join = {
  // Join:
  // SELECT column_name(s)
  // FROM table1
  // INNER JOIN table2 ON table1.column_name = table2.column_name;
  // LEFT JOIN table2 ON table1.column_name = table2.column_name;
  // RIGHT JOIN table2 ON table1.column_name = table2.column_name;
  // FULL JOIN table2 ON table1.column_name = table2.column_name;
};
export const union = {
  // Union:
  // SELECT column_name(s) FROM table1
  // UNION
  // SELECT column_name(s) FROM table2;
};
export const group_by = {
  // Group By:
  // SELECT COUNT(column_name) FROM table_name WHERE condition GROUP BY column_name;
};
export const having = {
  // Having:
  // SELECT COUNT(column_name) FROM table_name WHERE condition GROUP BY column_name HAVING (arithematic function condition);
};
export const exists = {
  // Exists:
  // SELECT column_name(s) FROM table_name WHERE EXISTS
  // (SELECT column_name FROM table_name WHERE condition);
};
export const any = {
  // Any:
  // SELECT column_name(s) FROM table_name WHERE column_name operator ANY
  // (SELECT column_name FROM table_name WHERE condition);
};
export const all = {
  // All:
  // SELECT column_name(s) FROM table_name WHERE column_name operator ALL
  // (SELECT column_name FROM table_name WHERE condition);
};
export const select_into = {
  // Select Into:
  // SELECT column1, column2 INTO new_table_name [IN externaldatabase] FROM old_tablename WHERE condition;
};
export const Case = {
  // Case:
  // SELECT column_name,
  // CASE
  // WHEN condition THEN 'Result_1'
  // WHEN condition THEN 'Result_2'
  // WHEN condition THEN 'Result_3'
  // ELSE 'Result_4'
  // END
  // FROM table_name;
};
export const auto_increment = {
  // Auto Increment:
  // CREATE TABLE Persons (
  //   ID int NOT NULL AUTO_INCREMENT,
  //   LastName varchar(255) NOT NULL,
  //   FirstName varchar(255),
  //   Age int,
  //   PRIMARY KEY (ID)
  // );
};
export const dates = {
  // Dates:
  // SELECT column_name(s) FROM table_name WHERE column_name BETWEEN date1 AND date2;
  // SELECT column_name(s) FROM table_name WHERE column_name NOT BETWEEN date1 AND date2;
  // SELECT column_name(s) FROM table_name WHERE column_name IN (date1, date2, ...);
  // SELECT column_name(s) FROM table_name WHERE column_name NOT IN (date1, date2, ...);
};
export const date_format = {
  // Date Format:
  // SELECT column_name, FORMAT(column_name, 'format') FROM table_name;
};
export const date_add = {
  // Date Add:
  // SELECT column_name, DATE_ADD(column_name, INTERVAL 15 DAY) FROM table_name;
};
export const date_sub = {
  // Date Sub:
  // SELECT column_name, DATE_SUB(column_name, INTERVAL 15 DAY) FROM table_name;
};
export const views = {
  // Views:
  // CREATE VIEW view_name AS
  // SELECT column_name(s)
  // FROM table_name
  // WHERE condition;
};
export const triggers = {
  // Triggers:
  // CREATE TRIGGER trigger_name trigger_time trigger_event ON table_name FOR EACH ROW trigger_body;
  // examples:
  // CREATE TRIGGER my_trigger BEFORE INSERT ON my_table FOR EACH ROW SET NEW.column_name = value;
  // with real values: CREATE TRIGGER my_trigger BEFORE INSERT ON my_table FOR EACH ROW SET NEW.name = 'John';
  // with timing : CREATE TRIGGER my_trigger BEFORE INSERT ON my_table FOR EACH ROW BEGIN SET NEW.name = 'John'; SET NEW.age = 20; END;
  // with trigger time and event: CREATE TRIGGER my_trigger BEFORE INSERT ON my_table FOR EACH ROW BEGIN SET NEW.name = 'John'; SET NEW.age = 20; END;
};
export const stored_procedures = {
  // Stored Procedures:
  // CREATE PROCEDURE procedure_name
  // AS
  // sql_statement
  // GO;
};
export const comments = {
  // Comments:
  // -- This is a comment
  // /* This is a comment */
};
export const wildcards = {
  // Wildcards:
  // SELECT column_name(s)
  // FROM table_name
  // WHERE column_name LIKE pattern;
};
export const in_operator = {
  // IN Operator:
  // SELECT column_name(s)
  // FROM table_name
  // WHERE column_name IN (value1, value2, ...);
};
export const between_operator = {
  // BETWEEN Operator:
  // SELECT column_name(s)
  // FROM table_name
  // WHERE column_name BETWEEN value1 AND value2;
};
export const aliases = {
  // Aliases:
  // SELECT column_name AS alias_name
  // FROM table_name;
};
export const joins = {
  // Joins:
  // SELECT column_name(s)
  // FROM table_name1
  // INNER JOIN table_name2 ON table_name1.column_name = table_name2.column_name;
};
export const example_data_for_joins = {
  // Example Data for Joins:
  // -- table1
  // id name
  // 1  John
  // 2  Bob
  // 3  Bill
  // -- table2
  // id age
  // 1  20
  // 2  21
  // 3  22
  // -- table3
  // id work
  // 1  Developer
  // 2  Designer
  // 3  Manager
  // result of inner join:
  // id name age work
  // 1  John 20  Developer
  // 2  Bob  21  Designer
  // 3  Bill 22  Manager
  // result of left join:
  // id name age work
  // 1  John 20  Developer
  // 2  Bob  21  Designer
  // 3  Bill 22  Manager
  // result of right join:
  // id name age work
  // 1  John 20  Developer
  // 2  Bob  21  Designer
  // 3  Bill 22  Manager
  // result of full join:
  // id name age work
  // 1  John 20  Developer
  // 2  Bob  21  Designer
  // 3  Bill 22  Manager
  // example query for inner join:
  // SELECT table1.name, table2.age, table3.work FROM table1 INNER JOIN table2 ON table1.id = table2.id INNER JOIN table3 ON table1.id = table3.id;
  // example query for left join:
  // SELECT table1.name, table2.age, table3.work FROM table1 LEFT JOIN table2 ON table1.id = table2.id LEFT JOIN table3 ON table1.id = table3.id;
  // example query for right join:
  // SELECT table1.name, table2.age, table3.work FROM table1 RIGHT JOIN table2 ON table1.id = table2.id RIGHT JOIN table3 ON table1.id = table3.id;
  // example query for full join:
  // SELECT table1.name, table2.age, table3.work FROM table1 FULL JOIN table2 ON table1.id = table2.id FULL JOIN table3 ON table1.id = table3.id;
};
export const inner_join = {
  // Inner Join:
  // SELECT column_name(s)
  // FROM table_name1
  // INNER JOIN table_name2 ON table_name1.column_name = table_name2.column_name;
};
export const left_join = {
  // Left Join:
  // SELECT column_name(s)
  // FROM table_name1
  // LEFT JOIN table_name2 ON table_name1.column_name = table_name2.column_name;
};
export const right_join = {
  // Right Join:
  // SELECT column_name(s)
  // FROM table_name1
  // RIGHT JOIN table_name2 ON table_name1.column_name = table_name2.column_name;
};
export const full_join = {
  // Full Join:
  // SELECT column_name(s)
  // FROM table_name1
  // FULL JOIN table_name2 ON table_name1.column_name = table_name2.column_name;
};
export const self_join = {
  // Self Join:
  // SELECT column_name(s)
  // FROM table_name1 T1, table_name2 T2
  // WHERE condition;
};
export const union_join = {
  // Union Join:
  // SELECT column_name(s) FROM table_name1
  // UNION JOIN
  // SELECT column_name(s) FROM table_name2;
};
export const case_statement = {
  // Case Statement:
  // SELECT column_name,
  // CASE
  // WHEN condition THEN 'Result_1'
  // WHEN condition THEN 'Result_2'
  // WHEN condition THEN 'Result_3'
  // ELSE 'Result_4'
  // END
  // FROM table_name;
};
export const exists_operator = {
  // Exists Operator:
  // SELECT column_name(s)
  // FROM table_name
  // WHERE EXISTS
  // (SELECT column_name FROM table_name WHERE condition);
};
export const any_operator = {
  // Any Operator:
  // SELECT column_name(s)
  // FROM table_name
  // WHERE column_name operator ANY
  // (SELECT column_name FROM table_name WHERE condition);
};
export const all_operator = {
  // All Operator:
  // SELECT column_name(s)
  // FROM table_name
  // WHERE column_name operator ALL
  // (SELECT column_name FROM table_name WHERE condition);
};
// export const select_into = {
//   // Select Into:
//   // SELECT column1, column2 INTO new_table_name [IN externaldatabase] FROM old_tablename WHERE condition;
// };
// export const insert_into = {
//   // Insert Into:
//   // INSERT INTO table_name (column1, column2, column3) VALUES (value1, value2, value3);
// };
// export const insert_into_select = {
//   // Insert Into Select:
//   // INSERT INTO table_name (column1, column2, column3)
//   // SELECT column1, column2, column3 FROM table_name WHERE condition;
// };
// export const case = {
//   // Case:
//   // SELECT column_name,
//   // CASE
//   // WHEN condition THEN 'Result_1'
//   // WHEN condition THEN 'Result_2'
//   // WHEN condition THEN 'Result_3'
//   // ELSE 'Result_4'
//   // END
//   // FROM table_name;
// };
