module.exports = class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  // Filter the query string
  filter() {
    // Filtering out special param
    let queryObject = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObject[el]);

    // Advance filtering
    let queryStr = JSON.stringify(queryObject);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    // console.log(queryStr);
    queryObject = JSON.parse(queryStr);

    this.query = this.query.find(queryObject);

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      this.query.sort(this.queryString.sort.replace(/,/g, ' '));
    } else {
      this.query.sort('-createdAt');
    }

    return this;
  }

  limitFields() {
    // Field limiting
    if (this.queryString.fields) {
      this.query.select(this.queryString.fields.replace(/,/g, ' '));
    } else {
      this.query.select('-__v');
    }
    return this;
  }

  paginate() {
    const limit = parseInt(this.queryString.limit || 10, 10);
    const page = parseInt(this.queryString.page || 1, 10);
    this.query = this.query.skip((page - 1) * limit).limit(limit);
    /* if (this.queryString.page) {
        const numTours = await Tour.countDocuments();
        if ((page - 1) * limit >= numTours)
          throw new Error('This page does not exist');
      } */
    return this;
  }
};
