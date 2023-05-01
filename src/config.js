import dotenv from 'dotenv'
dotenv.config('../.env')

export default {
    PORT:       process.env.PORT || 3005,
    SECRET:     process.env.SECRET,
    MAIL:       process.env.MAIL,
    MAIL_PASS:  process.env.MAILPASS,
    URLDB:      process.env.URLDB,
    LINK:       process.env.LINK
}