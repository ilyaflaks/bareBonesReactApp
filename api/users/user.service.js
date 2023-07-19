const pool = require("../../config/database");

module.exports = {
  create: (data) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `insert into registration(userName, email, password) 
                  values(?,?,?)`,
        [data.user_name, data.email, data.password],
        (error, results) => {
          if (error) {
            console.log(error);
            return reject(error);
          }
          return resolve(results);
        }
      );
    });
  },

  getUsers: () => {
    return new Promise((resolve, reject) => {
      pool.query(
        `select id, userName, email, dateRegistered from registration`,
        [],
        (error, results, fields) => {
          if (error) {
            return reject(error);
          }
          return resolve(results);
        }
      );
    });
  },

  getUserByUserEmail: (email) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `select * from registration where email = ?`,
        [email],
        (error, results, fields) => {
          if (error) {
            console.log(error);
            return reject(error);
          }
          return resolve(results);
        }
      );
    });
  },
  updateUser: (id, data) => {
    return new Promise((resolve, reject) => {
      console.log("updateUser in service. id: ", id, ", data: ", data);
      pool.query(
        `update registration set userName=?, email=?, password=? where id = ?`,
        [data.user_name, data.email, data.password, id],
        (error, results) => {
          if (error) {
            console.log("error: ", error);
            return reject(error);
          }
          return resolve(results);
        }
      );
    });
  },

  deleteUser: (id) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `delete from registration where id = ?`,
        [id],
        (error, results) => {
          if (error) {
            return reject(error);
          }
          return resolve(results);
        }
      );
    });
  },

  getUserByUserId: (id) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `select id,userName,email, dateRegistered from registration where id = ?`,
        [id],
        (error, results, fields) => {
          if (error) {
            return reject(error);
          }
          return resolve(results);
        }
      );
    });
  },
};
