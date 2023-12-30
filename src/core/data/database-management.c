/////////////////////////////////////////////////////////////////////////
// Database system architecture: Data Abstraction, Data Independence, Data
// Definition Language (DDL), Data Manipulation Language (DML). 
/////////////////////////////////////////////////////////////////////////
// Database management system (DBMS) architecture: Centralized, Client-Server,
// Multi-tiered, Parallel, Distributed, Federated, Cloud.
// Database management system (DBMS) components: Query Processor, Storage
// Manager, Transaction Manager, Concurrency Control, Recovery Manager, Buffer
// Manager, File Manager, Authorization and Integrity Manager, Database
// Administrator, Data Dictionary.
// Database management system (DBMS) interfaces: Command Line Interface (CLI),
// Graphical User Interface (GUI), Application Programming Interface (API).
// Database management system (DBMS) languages: Data Definition Language (DDL),
// Data Manipulation Language (DML), Data Control Language (DCL), Data Query
// Language (DQL).
// Database management system (DBMS) models: Hierarchical, Network, Relational,
// Object-Oriented, Object-Relational, Document, Graph, Multivalue, Columnar,
// Key-Value, Tuple, Star, Snowflake, Data Warehouse, Data Mart, Data Lake,
// Data Vault, Data Cube, Data Mining, Data Stream, Time Series, Spatial,
// Temporal, OLTP, OLAP, NoSQL, NewSQL, In-Memory, Cloud, Blockchain.
// Database management system (DBMS) types: Relational Database Management
// System (RDBMS), Object-Oriented Database Management System (OODBMS),
// Object-Relational Database Management System (ORDBMS), Document Database
// Management System (DDBMS), Graph Database Management System (GDBMS),
// Multivalue Database Management System (MVDBMS), Columnar Database Management
// System (CDBMS), Key-Value Database Management System (KVDBMS), Tuple Database
// Management System (TDBMS), Star Database Management System (SDBMS),
// Snowflake Database Management System (SFDBMS), Data Warehouse Management
// System (DWDBMS), Data Mart Management System (DMDBMS), Data Lake Management
// System (DLDBMS), Data Vault Management System (DVDBMS), Data Cube Management
// System (DCDBMS), Data Mining Management System (DMNDBMS), Data Stream
// Management System (DSMDBMS), Time Series Database Management System
// (TSDBMS), Spatial Database Management System (SDBMS), Temporal Database
// Management System (TDBMS), OLTP Database Management System (OLTPDBMS), OLAP
// Database Management System (OLAPDBMS), NoSQL Database Management System
// (NOSQLDBMS), NewSQL Database Management System (NEWSQLDBMS), In-Memory
// Database Management System (IMDBMS), Cloud Database Management System
// (CLOUDDBMS), Blockchain Database Management System (BCDBMS).
// Database management system (DBMS) vendors: Oracle, IBM, Microsoft, SAP,
// Teradata, Amazon, Google, MongoDB, Redis, Couchbase, Neo4j, Cassandra,
// Cloudera, Hortonworks, MapR, Snowflake, DataStax, MariaDB, PostgreSQL,
// MySQL, SQLite, IBM DB2, Microsoft SQL Server, SAP ASE, SAP IQ, SAP HANA,
// Teradata Database, Amazon Aurora, Amazon Redshift, Amazon DynamoDB, Google
// Cloud Spanner, Google BigQuery, MongoDB Atlas, Redis Enterprise, Couchbase
// Server, Neo4j Enterprise, Cassandra Enterprise, Cloudera Enterprise,
// Hortonworks Data Platform, MapR Converged Data Platform, Snowflake Cloud
// Data Platform, DataStax Enterprise, MariaDB Enterprise, PostgreSQL
// Enterprise, MySQL Enterprise, SQLite Enterprise, IBM DB2 Enterprise,
// Microsoft SQL Server Enterprise, SAP ASE Enterprise, SAP IQ Enterprise,
// SAP HANA Enterprise, Teradata Database Enterprise, Amazon Aurora Enterprise,
// Amazon Redshift Enterprise, Amazon DynamoDB Enterprise, Google Cloud
// Spanner Enterprise, Google BigQuery Enterprise, MongoDB Atlas Enterprise,
// Redis Enterprise Enterprise, Couchbase Server Enterprise, Neo4j Enterprise
// Enterprise, Cassandra Enterprise Enterprise, Cloudera Enterprise Enterprise,
// Hortonworks Data Platform Enterprise, MapR Converged Data Platform

// what is Data Abstraction?
// Data abstraction is the process of hiding certain details and showing only
// essential information to the user. Abstraction can be achieved with either
// abstract classes or interfaces (which you will learn more about in the next
// chapter).

// what is Data Independence?
// Data independence means that the application is independent of the storage
// structure and access strategy of data. It means that the application does not
// need to know where the data is stored physically. The application only needs
// to know how to read and write data from the database. Data independence is
// usually divided into two types: logical data independence and physical data
// independence.

// what is Data Definition Language (DDL)?
// Data Definition Language (DDL) is a standard for commands that define the
// different structures in a database. DDL statements create, modify, and remove
// database objects such as tables, indexes, and users. Common DDL statements
// are CREATE, ALTER, and DROP.

// what is Data Manipulation Language (DML)?
// Data Manipulation Language (DML) is a standard for commands that change the
// contents of a database. DML statements are used for managing data within
// schema objects. Common DML statements are SELECT, INSERT, UPDATE, and DELETE.

// what is Query Processor?
// The query processor is a component of a database management system that
// transforms queries expressed in high-level languages such as SQL into low-
// level instructions that the database manager can understand. The query
// processor is responsible for query optimization, which is the process of
// selecting the most efficient query execution plan from among the many
// strategies that are possible for processing a given query.

// what is Storage Manager?
// The storage manager is a component of a database management system that is
// responsible for managing the storage of data on storage devices such as
// magnetic or optical disks. The storage manager is responsible for translating
// logical data into physical data, and for managing access to the physical data
// by concurrent users.

// what is Transaction Manager?
// The transaction manager is a component of a database management system that
// is responsible for ensuring that transactions are executed in a reliable way.
// The transaction manager is responsible for ensuring that transactions are
// atomic, consistent, isolated, and durable (ACID).

// what is Concurrency Control?
// Concurrency control is a mechanism that ensures that transactions execute
// correctly when they are executed concurrently by multiple users. Concurrency
// control is responsible for ensuring that transactions are executed in a
// serializable way.

// what is Recovery Manager?
// The recovery manager is a component of a database management system that is
// responsible for ensuring that transactions are executed in a reliable way.
// The recovery manager is responsible for ensuring that transactions are
// atomic, consistent, isolated, and durable (ACID).

// what is Buffer Manager?
// The buffer manager is a component of a database management system that is
// responsible for managing the buffer pool, which is a portion of main memory
// that is used to cache data pages that have been recently read from disk. The
// buffer manager is responsible for ensuring that data pages are written to
// disk when they are no longer needed in the buffer pool.

// what is File Manager?
// The file manager is a component of a database management system that is
// responsible for managing the storage of data on storage devices such as
// magnetic or optical disks. The file manager is responsible for translating
// logical data into physical data, and for managing access to the physical data
// by concurrent users.

// what is Authorization and Integrity Manager?
// The authorization and integrity manager is a component of a database
// management system that is responsible for ensuring that transactions are
// executed in a reliable way. The authorization and integrity manager is
// responsible for ensuring that transactions are atomic, consistent, isolated,
// and durable (ACID).

// what is Database Administrator?
// A database administrator (DBA) is a person who is responsible for managing
// the database management system (DBMS) and the databases that are stored in
// it. A DBA is responsible for installing, configuring, and maintaining the
// DBMS, and for ensuring that the databases are backed up regularly.

// what is Data Dictionary?
// A data dictionary is a collection of metadata that describes the data
// structures in a database. A data dictionary is used by the database
// management system (DBMS) to translate logical data into physical data, and
// to manage access to the physical data by concurrent users.
/////////////////////////////////////////////////////////////////////////
//Data models: Entity-relationship model, network model, relational and
// object oriented data models, integrity constraints, data manipulation
// operations.
/////////////////////////////////////////////////////////////////////////
// what is Entity-relationship model?
// The entity-relationship model is a conceptual model that describes the
// structure of a database. The entity-relationship model is used to represent
// the entities and relationships in a database, and to represent the
// constraints that apply to those entities and relationships.

// what is Network model?
// The network model is a conceptual model that describes the structure of a
// database. The network model is used to represent the entities and
// relationships in a database, and to represent the constraints that apply to
// those entities and relationships.

// what is Relational model?
// The relational model is a conceptual model that describes the structure of a
// database. The relational model is used to represent the entities and
// relationships in a database, and to represent the constraints that apply to
// those entities and relationships.

// what is Object oriented data models?
// The object-oriented data model is a conceptual model that describes the
// structure of a database. The object-oriented data model is used to represent
// the entities and relationships in a database, and to represent the
// constraints that apply to those entities and relationships.

// what is Integrity constraints?
// Integrity constraints are rules that are used to ensure that the data in a
// database is consistent. Integrity constraints are used to ensure that the
// data in a database is consistent.

// what is Data manipulation operations?
// Data manipulation operations are operations that are used to manipulate the
// data in a database. Data manipulation operations are used to manipulate the
// data in a database.

//Database languages: SQL, PL/SQL, T-SQL, PL/pgSQL, PL/SQL, PL/SQL, PL/SQL,
/////////////////////////////////////////////////////////////////////////
// Relational query languages: Relational algebra, Tuple and domain
// relational calculus, SQL3, DDL and DML constructs, Open source and
// Commercial DBMS - MYSQL, ORACLE, DB2, SQL server. 
/////////////////////////////////////////////////////////////////////////
// what is Relational algebra?
// Relational algebra is a procedural query language that is used to query
// relational databases. Relational algebra is used to query relational
// databases.

// what is Tuple and domain relational calculus?
// Tuple and domain relational calculus are declarative query languages that are
// used to query relational databases. Tuple and domain relational calculus are
// used to query relational databases.

// what is SQL3?
// SQL3 is a declarative query language that is used to query relational
// databases. SQL3 is used to query relational databases.

// what is DDL and DML constructs?
// DDL and DML constructs are constructs that are used to query relational
// databases. DDL and DML constructs are used to query relational databases.

// what is Open source and Commercial DBMS - MYSQL, ORACLE, DB2, SQL server?
// Open source and commercial DBMS are database management systems that are used
// to manage relational databases. Open source and commercial DBMS are used to
// manage relational databases.
/////////////////////////////////////////////////////////////////////////
// Relational database design: Domain and data dependency, Armstrong's
// axioms, Normal forms, Dependency preservation, Lossless design. 
/////////////////////////////////////////////////////////////////////////
// what is Domain and data dependency?
// Domain and data dependency are dependencies that are used to design
// relational databases. Domain and data dependency are used to design
// relational databases.

// what is Armstrong's axioms?
// Armstrong's axioms are a set of axioms that are used to design relational
// databases. Armstrong's axioms are used to design relational databases.

// what is Normal forms?
// Normal forms are a set of normal forms that are used to design relational
// databases. Normal forms are used to design relational databases.

// what is Dependency preservation?
// Dependency preservation is a property that is used to design relational
// databases. Dependency preservation is used to design relational databases.

// what is Lossless design?
// Lossless design is a property that is used to design relational databases.
// Lossless design is used to design relational databases.

// give list of armstrong's axioms?
// Armstrong's axioms are a set of axioms that are used to design relational
// databases. Armstrong's axioms are used to design relational databases.
// Armstrong's axioms are used to design relational databases.
// following are the list of armstrong's axioms:
// 1. Reflexivity: If X is a set of attributes, then X → X.
// 2. Augmentation: If X → Y, then XZ → YZ for any set of attributes Z.

/////////////////////////////////////////////////////////////////////////
//  Query processing and optimization: Evaluation of relational algebra
// expressions, Query equivalence, Join strategies, Query optimization
/////////////////////////////////////////////////////////////////////////
// what is Evaluation of relational algebra expressions?
// Evaluation of relational algebra expressions is the process of evaluating
// relational algebra expressions. Evaluation of relational algebra expressions
// is the process of evaluating relational algebra expressions.

// what is Query equivalence?
// Query equivalence is the process of determining whether two queries are
// equivalent. Query equivalence is the process of determining whether two
// queries are equivalent.

// what is Join strategies?
// Join strategies are strategies that are used to join two relations. Join
// strategies are used to join two relations.

// what is Query optimization?
// Query optimization is the process of optimizing a query. Query optimization
// is the process of optimizing a query.

/////////////////////////////////////////////////////////////////////////
// Storage strategies: Indices, B-trees, hashing.
/////////////////////////////////////////////////////////////////////////
// what is Indices?
// Indices are data structures that are used to speed up the retrieval of data
// from a database. Indices are used to speed up the retrieval of data from a
// database.

// what is B-trees?
// B-trees are data structures that are used to speed up the retrieval of data
// from a database. B-trees are used to speed up the retrieval of data from a
// database.

// what is Hashing?
// Hashing is a technique that is used to speed up the retrieval of data from a
// database. Hashing is used to speed up the retrieval of data from a database.

/////////////////////////////////////////////////////////////////////////
// Transaction processing: Concurrency control, ACID property,
// Serializability of scheduling, Locking and timestamp based schedulers,
// Multi-version and optimistic Concurrency Control schemes, Database
// recovery.
/////////////////////////////////////////////////////////////////////////
// what is Concurrency control?
// Concurrency control is a mechanism that ensures that transactions execute
// correctly when they are executed concurrently by multiple users. Concurrency
// control is responsible for ensuring that transactions are executed in a
// serializable way.

// what is ACID property?
// ACID property is a property that is used to ensure that transactions are
// executed in a reliable way. ACID property is used to ensure that transactions
// are executed in a reliable way.

// what is Serializability of scheduling?
// Serializability of scheduling is a property that is used to ensure that
// transactions are executed in a reliable way. Serializability of scheduling is
// used to ensure that transactions are executed in a reliable way.

// what is Locking and timestamp based schedulers?
// Locking and timestamp based schedulers are schedulers that are used to ensure
// that transactions are executed in a reliable way. Locking and timestamp based
// schedulers are used to ensure that transactions are executed in a reliable
// way.

// what is Multi-version and optimistic Concurrency Control schemes?
// Multi-version and optimistic concurrency control schemes are schemes that are
// used to ensure that transactions are executed in a reliable way. Multi-
// version and optimistic concurrency control schemes are used to ensure that
// transactions are executed in a reliable way.

// what is Database recovery?
// Database recovery is a process that is used to ensure that transactions are
// executed in a reliable way. Database recovery is used to ensure that
// transactions are executed in a reliable way.

/////////////////////////////////////////////////////////////////////////
// Database Security: Authentication, Authorization and access control, DAC,
// MAC and RBAC models, Intrusion detection, SQL injection.
/////////////////////////////////////////////////////////////////////////
// what is Authentication?
// Authentication is a process that is used to ensure that transactions are
// executed in a reliable way. Authentication is used to ensure that
// transactions are executed in a reliable way.

// what is Authorization and access control?
// Authorization and access control are processes that are used to ensure that
// transactions are executed in a reliable way. Authorization and access control
// are used to ensure that transactions are executed in a reliable way.

// what is DAC, MAC and RBAC models?
// DAC, MAC and RBAC models are models that are used to ensure that transactions
// are executed in a reliable way. DAC, MAC and RBAC models are used to ensure
// that transactions are executed in a reliable way.

// what is Intrusion detection?
// Intrusion detection is a process that is used to ensure that transactions are
// executed in a reliable way. Intrusion detection is used to ensure that
// transactions are executed in a reliable way.

// what is SQL injection?
// SQL injection is a process that is used to ensure that transactions are
// executed in a reliable way. SQL injection is used to ensure that transactions
// are executed in a reliable way.

/////////////////////////////////////////////////////////////////////////
// SQL Concepts : Basics of SQL, DDL,DML,DCL, structure – creation,
// alteration, defining constraints – Primary key, foreign key, unique, not null,
// check, IN operator, aggregate functions, Built-in functions –numeric, date,
// string functions, set operations, sub-queries, correlated sub-queries, join,
// Exist, Any, All , view and its types., transaction control commands.
/////////////////////////////////////////////////////////////////////////
// what is Basics of SQL?
// Basics of SQL is a set of commands that are used to query relational
// databases. Basics of SQL is used to query relational databases.

// what is DDL,DML,DCL?
// DDL,DML,DCL are a set of commands that are used to query relational
// databases. DDL,DML,DCL are used to query relational databases.

// what is structure – creation, alteration, defining constraints – Primary key, foreign key, unique, not null, check, IN operator, aggregate functions, Built-in functions –numeric, date, string functions, set operations, sub-queries, correlated sub-queries, join, Exist, Any, All , view and its types., transaction control commands?
// structure – creation, alteration, defining constraints – Primary key, foreign
// key, unique, not null, check, IN operator, aggregate functions, Built-in
// functions –numeric, date, string functions, set operations, sub-queries,
// correlated sub-queries, join, Exist, Any, All , view and its types.,
// transaction control commands are a set of commands that are used to query
// relational databases. structure – creation, alteration, defining constraints
// – Primary key, foreign key, unique, not null, check, IN operator, aggregate
// functions, Built-in functions –numeric, date, string functions, set
// operations, sub-queries, correlated sub-queries, join, Exist, Any, All , view
// and its types., transaction control commands are used to query relational
// databases.

/////////////////////////////////////////////////////////////////////////
// PL/SQL Concepts : Cursors, Stored Procedures, Stored Function,
// Database Triggers
/////////////////////////////////////////////////////////////////////////
// what is Cursors?
// Cursors are a set of commands that are used to query relational databases.
// Cursors are used to query relational databases.

// what is Stored Procedures?
// Stored Procedures are a set of commands that are used to query relational
// databases. Stored Procedures are used to query relational databases.

// what is Stored Function?
// Stored Function are a set of commands that are used to query relational
// databases. Stored Function are used to query relational databases.

// what is Database Triggers?
// Database Triggers are a set of commands that are used to query relational
// databases. Database Triggers are used to query relational databases.

/////////////////////////////////////////////////////////////////////////
// 1. “Database System Concepts”, 6th Edition by Abraham Silberschatz, Henry F. Korth, S. Sudarshan,
// McGraw-Hill.
// 2. “Fundamentals of Database Systems”, 7th Edition by R. Elmasri and S. Navathe, Pearson
// 3. “An introduction to Database Systems”, C J Date, Pearson.
// 4. “Modern Database Management”, Hoffer , Ramesh, Topi, Pearson.
// 5. “Principles of Database and Knowledge – Base Systems”, Vol 1 by J. D. Ullman, Computer
// Science Press.