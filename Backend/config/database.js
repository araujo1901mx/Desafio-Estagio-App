module.exports = {
    dialect: "postgres",
    host: "127.0.0.1",
    username: "postgres",
    password: "mysecretpassword",
    database: "usersdb",
    define: {
        timestamp: true,
        underscored: true,
        underscoredAll: true

    }
}