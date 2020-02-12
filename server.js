const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log('DB connects succesfully');
  });

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have '],
    unique: [true, "A tour' name is unique"]
  },
  rating: {
    type: Number,
    required: [true, 'A tour must have rating'],
    default: 4.5
  },
  price: {
    type: Number,
    required: [true, 'A tour must have price']
  }
});

const Tour = mongoose.model('Tour', tourSchema);

const testTour = new Tour({
  name: 'The Forest Hiker',
  rating: 4.7,
  price: 497
});

testTour
  .save()
  .then(doc => {
    console.log(doc);
  })
  .catch(err => {
    console.log(err);
  });

const app = require('./app');

// START THE SERVER
const port = process.env.PORT;
app.listen(port, () => {
  console.log('App running on port 80');
});
