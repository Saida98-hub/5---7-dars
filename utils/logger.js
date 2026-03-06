const {createLogger, format, transports} = require("winston")
const {combine, timestamp, label, printf} = format;

const myFormat = printf(({level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
})

const logger =createLogger({
    level: "debug",
    format:combine(
        colorize(),
        label({label: "test"}), 
        timestamp(),
        myFormat
    ),
    transports: [
        new transports.Console(),
        new transports.File({filename: "log/all-logs.log"}),
        new transports.MongoDB({db: "mongodb+srv://aliyarahmanova5_db_user:vRFZ3KHi4CR0K8SJ@cluster0.tjxycxs.mongodb.net/?"})
    ]

})

module.exports = logger