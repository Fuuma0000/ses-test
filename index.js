const { SES } = require("@aws-sdk/client-ses");
require("dotenv").config();

const SES_CONFIG = {
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.REGION,
};

const AWS_SES = new SES(SES_CONFIG);

const sendEmail = async (recipientEmail, name) => {
  let params = {
    Source: process.env.AWS_SES_SENDER,
    Destination: {
      ToAddresses: [recipientEmail],
    },
    ReplyToAddresses: [],
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `<html><body><h1>Hi ${name}</h1><p>Test mail</p></body></html>`,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "Test mail",
      },
    },
  };

  try {
    const res = await AWS_SES.sendEmail(params);
    console.log("Email has been sent " + res);
  } catch (err) {
    console.log(err);
  }
};

sendEmail(process.env.TO_EMAIL, "Fuuma");
