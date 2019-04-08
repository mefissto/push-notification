const pushService = require('../services/push-notify.service');
const fakeDB = [];

exports.default = (req, res) => {
  res.send('Hello World');
};

exports.newSubscribtion = (req, res) => {
  const subscription = {
    endpoint: req.body.endpoint,
    keys: {
      p256dh: req.body.keys.p256dh,
      auth: req.body.keys.auth,
    },
  };
  fakeDB.push(subscription);

  const payload = JSON.stringify({
    title: 'Hi, young padavan',
    body: "Don't forget to log time for today.",
    icon: '/android-chrome-192x192.png',
  });

  pushService
    .sendNotify(subscription, payload)
    .then((status) => {
      console.log('status: ', status);

      return res.json({ message: 'Subscription was created!' });
    })
    .catch((err) => {
      console.log('err: ', err);
      return res.json({ message: 'Subscription didnt create!' });
    });
};

exports.removeSubscribtion = (req, res) => {
  const endpoint = req.body.endpoint;
  fakeDB = fakeDB.filter((sub) => sub.endpoint !== endpoint);
};

exports.getPublicKey = (req, res) => {
  const publicKey = pushService.getPublicKey();
  return res.json({ publicKey });
};
