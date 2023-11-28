CREATE DATABASE user;
USE user;

CREATE TABLE IF NOT EXISTS Users (
	ID			int NOT NULL AUTO_INCREMENT,
	LName		varchar(255) NOT NULL,
	FName		varchar(255) NOT NULL,
	Age			int,
	Username	varchar(255) NOT NULL,
	Password	varchar(255) NOT NULL,
	PRIMARY KEY (ID)
);

INSERT INTO Users (FName, LName, Age, Username, Password)
VALUES ("foo", "bar", 20, "foobar", "123456");

INSERT INTO Users (FName, LName, Age, Username, Password)
VALUES ("joe", "dow", 30, "joedow", "qwerty");

INSERT INTO Users (FName, LName, Age, Username, Password)
VALUES ("lo", "rem", 40, "lorem", "asdfgh");

SELECT * FROM Users WHERE age=20;