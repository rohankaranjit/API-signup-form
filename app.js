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
        auth : "rohan1:d03c6c2b81d62048a62d3dd5baae4533-us21"
      }

      const mailchimpRequest = https.request(url,options,function(response){

        if(response.statusCode==200){
            const successHTML = ;
    
        res.send(successHTML);
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }


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
