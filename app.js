const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https")

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended : true}));


app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html");
});

    app.post("/",function(req,res){

        const firstName = req.body.fName;

        const lastName = req.body.lname;
        const email = req.body.email;

        const data ={
            members:[
                {
                    email_address : email,
                    status : "subscribed",
                    merge_fields : {
                        FNAME : firstName,
                        LNAME : lastName
                    }
                }
            ]
        };

        
    


    const jsonData = JSON.stringify(data);

    const url = "https://us21.api.mailchimp.com/3.0/lists/52016fd2d0";

    const options = {
        method : "POST",
        auth : "rohan1:dfee57b55ee1912e4e58c2e71ac3b997-us21"
      }

      const mailchimpRequest = https.request(url,options,function(response){
        response.on("data",function(data){
            console.log(JSON.parse(data));
        });
      });

      mailchimpRequest.write(jsonData);
      mailchimpRequest.end();

    });

app.listen(3000,function(){
    console.log("Server is running in 3000.");
    });
