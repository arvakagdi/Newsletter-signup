//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));   // tell app to use body parser


app.get('/', function (req, res){
    res.sendFile(__dirname + "/signup.html");
});



app.post("/", function(req, res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    // this data is in format of mailchip api where we want to send our data
  
    const data = {
        members: [
            {
                email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName            
            }
            }
        ]
    };

    const jsonData = JSON.stringify(data);   // converting to json data

    // to post/send data to another server we have to use https.request()
    // to get data from another server we use https.get()
    const url =  xxx;
    const options = {
        method:"POST",
        auth: "yourAPI KEY 
    }
    
    const request = https.request(url, options,function(response){
        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        })        
    })

    request.write(jsonData);    // sends the user data to api server (in this case mailchimp)
    request.end();
});


app.post("/failure", function(req, res){  // this will redirect the failure page to main page to try again
    res.redirect("/");
});


app.listen( process.env.PORT || 3000,function(){
    console.log("Server running on 3000!");
});
