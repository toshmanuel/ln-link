const Sequelize = require('sequelize')

module.exports = new Sequelize(
    process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        operationalAliases: false,

        pool: {
            max: 5,
            port: 10000,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
)
// const pool = new Pool({
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     database: process.env.DB_NAME
// })

// module.exports = pool;

