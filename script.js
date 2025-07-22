const express = require('express');
const app = express();
// this is the middleware
app.use(express.json()); // to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // to parse URL-encoded bodies

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  res.send("middleware response"); // send a response to the client
  
});
// now we can make the routes

app.get('/', (req , res) => {
  res.send('champion anthem');

});

app.get('/profile', (req, res) => {
  res.send('This is the profile page');
})
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!'); // this shows an error messagee on the client
  console.log('Error occurred:', err.message);// log the error message to the console
  next(); // pass the error to the next middleware

})
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
