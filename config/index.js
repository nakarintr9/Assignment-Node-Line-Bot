require('dotenv').config();

module.exports = {
    PORT: process.env.PORT,
    DOMAIN: process.env.DOMAIN,
    LINE_CHENNEL_ACCESS_TOKKEN=process.env.LINE_CHENNEL_ACCESS_TOKKEN,
    LINE_NOTIFY_TOKEN=process.env.LINE_NOTIFY_TOKEN
}