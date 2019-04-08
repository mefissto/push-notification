const express = require('express');
const webpush = require('web-push');
const routes = require('./routes/index');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 8888;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/', routes);
const dummyDb = { subscription: null }; //dummy in memory store

// The new /save-subscription endpoint
// app.post('/push/subscribe', async (req, res) => {
//   const subscription = req.body;
//   await saveToDatabase(subscription); //Method to save the subscription to Database
//   res.json({ message: 'success' });
// });

//function to send the notification to the subscribed device
// const sendNotification = (subscription, dataToSend) => {
//   webpush.sendNotification(subscription, dataToSend);
// };

//route to test send notification
// app.get('/send-notification', (req, res) => {
//   const subscription = dummyDb.subscription; //get subscription from your databse here.
//   const message = 'Hello World';
//   sendNotification(subscription, message);
//   res.json({ message: 'message sent' });
// });

app.listen(port, () => console.log(`Listening on port ${port}!`));
