const mongoose = require('mongoose');
const slugify = require('slugify');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have '],
      unique: [true, "A tour' name is unique"],
      trim: true, //remove all the whitespace at the beginning and the end
      minlength: [10, 'A tour name must have more or equal than 10 characters'],
      maxlength: [40, 'A tour name must have more or equal than 10 characters']
      // validate: [validator.isAlpha, 'Tour name must only contain characters']
    },
    slug: {
      type: String,
      trim: true
    },
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration']
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a max group size']
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty level'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'difficulty is either easy, medium or difficult'
      }
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [0, 'A tour rating cannot be less than 0'],
      max: [5, 'A tour rating cannot be more than than 0']
    },
    ratingsQuantity: {
      type: Number,
      default: 0
    },
    price: {
      type: Number,
      required: [true, 'A tour must have price']
    },
    discountPrice: {
      type: Number,
      validate: {
        validator: function(val) {
          return val <= this.price;
        },
        message: 'Discount price ({VALUE}) is always less than original price'
      }
    },
    summary: {
      type: String,
      required: [true, 'A tour must have a summary'],
      trim: true //remove all the whitespace at the beginning and the end
    },
    description: {
      type: String,
      trim: true
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a cover image']
    },
    image: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false
    },
    secretTour: {
      type: Boolean,
      default: false,
      select: false
    },
    startDates: [Date]
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
tourSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// tourSchema.pre('save', function(next) {
//   console.log('Will save');
//   next();
// });
// tourSchema.post('save', function(doc, next) {
//   console.log(doc);
//   next();
// });

tourSchema.pre(/^find/, function(next) {
  this.find({ secretTour: { $ne: true } });
  next();
});

/* tourSchema.post(/^find/, function(doc, next) {
  console.log(`Query took ${Date.now() - this.start} miliseconds`);
  //console.log(doc);
  next();
}); */

tourSchema.pre('aggregate', function(next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  console.log(this.pipeline());
  next();
});

tourSchema.virtual('durationWeeks').get(function() {
  return Math.ceil(this.duration / 7); // 'this' key word points to current document
  // !!! Remember: Never use arrow declaration when using 'this' keyword
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
