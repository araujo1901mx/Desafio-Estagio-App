module.exports = {
    dialect: "postgres",
    host: "localhost",
    username: "postgres",
    password: "mysecretpassword",
    database: "usersdb",
    define: {
        timestamp: true,
        underscored: true,
        underscoredAll: true

    }
}