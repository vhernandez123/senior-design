const mysql = require("mysql");

function addUserToDatabase(user, callback) {
  const dbConfig = {
    user: "admin",
    host: "pet-app-4160.cdfommd6aile.us-east-1.rds.amazonaws.com",
    password: "4160Seniordesign",
    database: "mydb",
  };

  const connection = mysql.createConnection(dbConfig);

  connection.connect((err) => {
    if (err) {
      console.error("Error connecting to the database:", err);
      return callback(new Error("Error connecting to the database"));
    }

    const userData = {
      userId: user.user_id,
      userFirstName: user.given_name,
      userLastName: user.family_name,
      userEmail: user.email,
    };

    const checkIfExistsSQL =
      "SELECT COUNT(*) AS count FROM User WHERE userEmail = ?";
    const checkIfExistsValues = [userData.userEmail];

    connection.query(
      checkIfExistsSQL,
      checkIfExistsValues,
      (error, results) => {
        if (error) {
          console.error(
            "Error checking user existence in the database:",
            error
          );
          connection.end();
          return callback(
            new Error("Error checking user existence in the database")
          );
        }

        if (results[0].count === 0) {
          const insertSQL =
            "INSERT INTO User (userId, userFirstName, userLastName, userEmail) VALUES (?, ?, ?, ?)";
          const insertValues = [
            userData.userId,
            userData.userFirstName,
            userData.userLastName,
            userData.userEmail,
          ];

          connection.query(insertSQL, insertValues, (error, results) => {
            connection.end();

            if (error) {
              console.error(
                "Error inserting user data into the database:",
                error
              );
              return callback(
                new Error("Error inserting user data into the database")
              );
            }

            // Continue with the login process
            callback(null, user);
          });
        } else {
          // User already exists, no need to insert
          connection.end();
          callback(null, user);
        }
      }
    );
  });
}
