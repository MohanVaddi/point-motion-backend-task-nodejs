const express = require('express');

// importing routes
const userMeRoute = require('./routes/user/me.route');
const signupRoute = require('./routes/signup.route');
const signinRoute = require('./routes/signin.route');

const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env['PORT'] || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/signup', signupRoute);
app.use('/signin', signinRoute);
app.use('/user/me', userMeRoute);

app.listen({ port }, () => {
    console.log(`App listening on port ${port}.`);
});
