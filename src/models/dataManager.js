const mysql = require("mysql2");

const createDatabaseConnection = () => {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "newuser",
    password: "newpassword",
    database: "EVENT_MANAGEMENT",
  });

  connection.connect((err) => {
    if (err) console.error(err.message);
    console.log("Connected to mysql server !!!");
  });

  return connection;
};

class DataManager {
  #connection;

  constructor() {
    this.#connection = createDatabaseConnection();
  }

  addUser({ username, name, surname, email, password }) {
    return new Promise((resolve, reject) => {
      this.#connection.query(
        "INSERT INTO user (username, name, surname, email, password) VALUES (?, ?, ?, ?, ?)",
        [username, name, surname, email, password],
        (err, result) => {
          if (err) {
            return reject(err);
          }

          console.log("Added the user successfully: \n", result);
          resolve(result);
        }
      );
    });
  }

  validateUser(email, password) {
    return new Promise((resolve, reject) => {
      this.#connection.query(
        "SELECT USERNAME FROM USER WHERE EMAIL=(?) AND PASSWORD=(?)",
        [email, password],
        (err, result) => {
          if (err) {
            return reject(err);
          }
          if (result.length === 0) {
            return reject("Unauthorised");
          }

          console.log("Verified user: ", result);
          return resolve(result[0]);
        }
      );
    });
  }

  verifyUser(username) {
    return new Promise((resolve, reject) => {
      this.#connection.query(
        "SELECT NAME FROM USER WHERE USERNAME=(?)",
        [username],
        (err, result) => {
          if (err) {
            return reject(err);
          }
          if (result.length === 0) {
            return reject("Unauthorised");
          }

          console.log("Verified user", username);
          return resolve(result);
        }
      );
    });
  }

  getDetails(username) {
    return new Promise((resolve, reject) => {
      this.#connection.query(
        "SELECT NAME, SURNAME, EMAIL FROM USER WHERE USERNAME=(?)",
        [username],
        (err, result) => {
          if (err) {
            return reject(err);
          }
          if (result.length === 0) {
            return reject("Unauthorised");
          }

          return resolve(result[0]);
        }
      );
    });
  }

  registerUserEvent(details) {
    const { firstName, lastName, gender, email, number, city, event } = details;
    console.log("Inserting");
    return new Promise((resolve, reject) => {
      this.#connection.query(
        "INSERT INTO events (firstname, lastname, gender, email, number, city, event) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [firstName, lastName, gender, email, number, city, event],
        (err, result) => {
          if (err) return reject(err);

          console.log("Registration Successful !");
          resolve(result);
        }
      );
    });
  }
}

module.exports = DataManager;
