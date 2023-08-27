const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
mongoose.connect('mongodb+srv://dileepottikunta:WDf2wnk5WeSyQLXq@dileep.eapbkf5.mongodb.net/FormData', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});
const Contact = mongoose.model('Contact', ContactSchema);
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.get('/', (req, res) => {
  res.render('index', { submitted: false });
});
app.post('/', async (req, res) => {
  const { name, email, message } = req.body;
  try {
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    res.render('index', { submitted: true });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred.');
  }
});
app.get('/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.render('contacts', { contacts });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred.');
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
