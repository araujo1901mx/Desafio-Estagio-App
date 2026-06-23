module.exports = {
    dialect: "postgres",
    host: process.env.DB_HOST || "127.0.0.1",
    username: "postgres",
    password: "mysecretpassword",
    database: "usersdb",
    define: {
        timestamp: true,
        underscored: true,
        underscoredAll: true
    },
    // Se DATABASE_URL existir (Neon/nuvem), usa connection string com SSL
    ...(process.env.DATABASE_URL && {
        use_env_variable: 'DATABASE_URL',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    })
}