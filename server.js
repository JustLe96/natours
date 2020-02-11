const app = require('./app');
// START THE SERVER
const port = 80;
app.listen(port, () => {
  console.log('App running on port 80');
});
