const axios = require('axios');
require('dotenv').config();

const generateToken = async (req, res, next) => {
  const ConsumerKey = process.env.SAFARICOM_CONSUMER_KEY;
  const SecretKey = process.env.SAFARICOM_CONSUMER_SECRET;
  const auth = new Buffer.from(`${ConsumerKey}:${SecretKey}`).toString(
    'base64'
  );

  await axios
    .get(
      'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
      {
        headers: {
          authorization: `Basic ${auth}`,
        },
      }
    )
    .then((res) => {
      token = res.data.access_token;
      next();
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ message: err.message });
    });
};
module.exports = generateToken;
