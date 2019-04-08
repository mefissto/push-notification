const webpush = require('web-push');

// const generateVAPIDKeys = () => {
//   const vapidKeys = webpush.generateVAPIDKeys();
//   return {
//     publicKey: vapidKeys.publicKey,
//     privateKey: vapidKeys.privateKey,
//   };
// };
// const vapidKeys = generateVAPIDKeys();

const vapidKeys = {
  publicKey:
    'BEcouxuo2bTJr1RzWQkJ4dd20ARn_uQaCwAXXQAqyYTFhwINTN9Ohv9Ht4oTuWgKoftsrRbPGnrF9FY9TWg0rb4',
  privateKey: 'rLRCMcw1KuKHfvGNMVAm3bMeiTDEBAwVUh67oyvIoQI',
};

//setting our previously generated VAPID keys
webpush.setVapidDetails(
  'mailto:mefissto.w@gmail.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey,
);

const saveToDatabase = async (subscription) => {
  // Here you should be writing your db logic to save it.
  dummyDb.subscription = subscription;
};

module.exports.sendNotify = (subscription, payload) => {
  // setInterval(() => {
  //   webpush.sendNotification(subscription, payload);
  // }, 10000);
  return webpush.sendNotification(subscription, payload);
};

module.exports.getPublicKey = () => {
  return vapidKeys.publicKey;
};
