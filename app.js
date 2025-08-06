const { default: bcrypt } = require('bcryptjs');
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

app.use(cookieParser);


app.get('/', function(req ,res){

    jwt.sign({email: "example@example.com"}, 'secretkey', { expiresIn: '1h' }, function(err, token) {
        if (err) {
            return res.status(500).send("Error signing token");
        }
        res.cookie("token", token);
    });

    jwt.verify(req.cookies.token, 'secretkey', function(err, decoded) {
        if (err) {  
            return res.status(401).send("Invalid token");
        }   else {
            console.log(decoded); // { email: 'example@example.com' }   
        }
    });

    const myPlaintextPassword = 'yourPassword'; // Define your password variable

    bcrypt.genSalt(10,function(err, salt) {
        bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
            // Store hash in your password DB.
            bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
                // result == true
                console.log(result);
                res.send("Hello World");
            });
        });
    });

});

app.get("/read", function(req, res){
    res.cookie("name", "yug");
    res.send("read page");
})

app.listen(3000, function(){
    console.log("Server started on port 3000"); // this runs on the http://localhost:3000
});