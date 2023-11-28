# CPSC254-Group5-Project

Group Members:
1. Ranny Khant Naing
2. Kaung Khant Thaw
3. Chence Shi
4. Matthew Villanueva

## Prerequisites

- Ubuntu 22.04
- [Node.js](https://github.com/nodesource/distributions)
- [MySQL Server](https://ubuntu.com/server/docs/databases-mysql)

## Installation

**clone the repository**
```bash
# Clone the repository
git clone https://github.com/RannyNaing/CPSC254-Group5-Project.git

# Navigate to the project directory
cd CPSC254-Group5-Project

# Install dependencies
npm install

```

**prepare the database**
```bash
# Run the mysql shell
sudo /usr/bin/mysql -u root -p

# Create a mysql user with username: 'test' without password:
CREATE USER 'test'@'localhost';

# Grant all privileges to the user 'test':
GRANT ALL ON *.* TO 'test'@'localhost' WITH GRANT OPTION;

# exit the mysql shell
exit
```

**create table and insert test data**
```bash
mysql -h localhost -u test -p < ./script/create_and_show.sql
```

## Run the application

```bash
# Run the application
npm start
```