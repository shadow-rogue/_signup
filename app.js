const express = require("express")
const bodyParser = require("body-parser")
const request = require("request")
const https = require("https")

const app = express();

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname +"/signup.html");

});

app.post("/",function(req,res){

    const firstName = req.body.fName;
    const secondName = req.body.sName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: secondName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us2.api.mailchimp.com/3.0/lists/1799364b15";
    const options = {
        method: "POST",
        auth: "shadow_rogue:dd7dd5a59836f0568cd9ecaa5dbb208f-us2"
    }

    const request =  https.request(url, options, function(response){

        if(response.statusCode==200)
           res.sendFile(__dirname +"/sucess.html");
        else
           res.sendFile(__dirname +"/faliure.html");
           
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();
   

    // console.log(firstName , secondName , email);

});

app.post("/faliure",function(req,res){
    res.redirect("/")
});

app.listen(process.env.PORT || 3000,function(){
    console.log("Server is running on port 3000");
})

// dd7dd5a59836f0568cd9ecaa5dbb208f-us2
// 