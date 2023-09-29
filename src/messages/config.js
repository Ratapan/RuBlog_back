import nodemailer from "nodemailer";
import config from "../config";
import {checkupMail} from "./checkupMail";


export const util = {
  checkupMail
};
export const sendAnMail = async (mailUser,subject,html) => {

  const configMail = {
    host: "smtp-mail.outlook.com", // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    tls: {
       ciphers:'SSLv3'
    },
    auth: { 
      user: config.MAIL, 
      pass: config.MAIL_PASS
    },
  };
  const msg = {
    from: config.MAIL,
    to: mailUser,
    subject: subject,
    html:  Buffer.from(html,'utf-8').toString(),
  };
  const transport = nodemailer.createTransport(configMail);
  const info = await transport.sendMail(msg);
  return info;
};
