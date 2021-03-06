const nodemailer = require("nodemailer");
const { google } = require("googleapis");
require("dotenv").config();
const fs = require("fs");
const mustache = require("mustache");

const clientId = process.env.MAIL_CLIENT_ID;
const clientSecret = process.env.MAIL_CLIENT_SECRET;
const refreshToken = process.env.MAIL_REFRESH_TOKEN;
const { OAuth2 } = google.auth;
const OAuth2Client = new OAuth2(clientId, clientSecret);
OAuth2Client.setCredentials({
  refresh_token: refreshToken,
});

module.exports = {
  sendMail: (data) =>
    new Promise((resolve, reject) => {
      const accessToken = OAuth2Client.getAccessToken;
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: "itjobsproject@gmail.com",
          clientId,
          clientSecret,
          refreshToken,
          accessToken,
        },
      });

      const fileTemplate = fs.readFileSync(
        `src/template/email/${data.template}`,
        "utf8"
      );

      // const mailOption = {
      //   from: '"ITjobs" <itjobsproject@gmail.com>',
      //   to: data.to,
      //   subject: data.subject,
      //   html: mustache.render(fileTemplate, { ...data }),
      // };
      //   `src/template/email/${data.template}`,
      //   "utf8"
      // );
      let mailOption;
      if (!data.path) {
        mailOption = {
          from: '"ITjobs" <itjobsproject@gmail.com>',
          to: data.to,
          subject: data.subject,
          html: mustache.render(fileTemplate, { ...data }),
        };
      } else {
        mailOption = {
          from: '"ITjobs" <itjobsproject@gmail.com>',
          to: data.to,
          subject: data.subject,
          html: mustache.render(fileTemplate, { ...data }),
          attachments: [
            {
              filename: data.filename,
              path: data.path,
            },
          ],
        };
      }

      transporter.sendMail(mailOption, (error, info) => {
        if (error) {
          reject(error);
        } else {
          resolve(info);
          s;
        }
      });
    }),
};
