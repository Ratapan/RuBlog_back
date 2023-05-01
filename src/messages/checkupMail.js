import config from "../config";

export const checkupMail = (mailUser, code) => {
  const configMail = `
  <html>
  <body>
  <h1>Buen dia ${mailUser} <h1>
  </br>
  <p>Este es el correo de verificación de correo, esto te permitirá comentar, dar like y optar a ser escritor</p>
  </br>
  <a href="${config.LINK}auth/checkup/${code}" target="_blank" >
  Link de verificación
  </a>
  </body>
  </html>
  `;
  return configMail;
};
