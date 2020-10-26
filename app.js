const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app =  express();


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));






app.get("/",function(req,res){
  res.sendFile(__dirname +  "/signup.html");
});

app.post("/", function(req,res){
const firstName = req.body.fname;
const lastName= req.body.lname;
const email = req.body.email;

const data = {
  members: [
    {
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName,
      }
    }
  ]
}

const jsonData = JSON.stringify(data);

const url = "https://us2.api.mailchimp.com/3.0/lists/cd4c172939"

const options = {
  method: "POST",
  auth: "rahil1:6db86098e98537a594888b7582a80c18-us2"
}


const request = https.request(url, options, function(response){
  if(response.statusCode === 200){
    res.sendFile(__dirname + "/success.html");

  }else{
    res.sendFile(__dirname + "/failure.html");
  }
  response.on("data", function(data){
    console.log(JSON.parse(data));
  });
  request.write(jsonData);
  request.end();
});
});

app.post("/failure", function(req,res){
  res.redirect("/");
})

app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running on port 3000");
});


// apikey
// 6db86098e98537a594888b7582a80c18-us2

// listid
// cd4c172939



//alternate solution

// const express = require("express");
//
// const bodyParser = require("body-parser");
//
// const request = require("request");
//
// const mailchimp = require("@mailchimp/mailchimp_marketing");
//
//
//
// const app = express();
//
//
//
// app.use(express.static("public"));
//
// app.use(bodyParser.urlencoded({
//
//   extended: true
//
// }));
//
//
//
// // MailChimp code
//
//
//
// mailchimp.setConfig({
//
//   apiKey: "6db86098e98537a594888b7582a80c18-us2",
//
//   server: "us2", // us1, us2,
//
// });
//
//
//
// app.get("/", function(req, res) {
//
//   res.sendFile(__dirname + "/signup.html");
//
// })
//
//
//
// app.post("/", function(req, res) {
//
//
//
//   const fname = req.body.firstName;
//
//   const lname = req.body.lastName;
//
//   const emailAdd = req.body.email;
//
//
//
//   console.log(fname);
//
//   console.log(lname);
//
//   console.log(emailAdd);
//
//   console.log(req.body.password);
//
//   console.log(req.body.confirmPassword)
//
//
//
//   const listId = "cd4c172939";
//
//   const subscribingUser = {
//
//     firstName: fname,
//
//     lastName: lname,
//
//     email: emailAdd
//
//   };
//
//
//
//   async function run() {
//
//     const response = await mailchimp.lists.addListMember(listId, {
//
//       email_address: subscribingUser.email,
//
//       status: "subscribed",
//
//       merge_fields: {
//
//         FNAME: subscribingUser.firstName,
//
//         LNAME: subscribingUser.lastName
//
//       }
//
//     });
//
//
//
//     // const response = await mailchimp.ping.get();
//     //
//     // console.log(response);
//
//
//
//     console.log(
//
//       `Successfully added contact as an audience member. The contact's id is ${
//
//         response.id
//
//       }.`
//
//     );
//
//   }
//
//
//
//   run();
//
//   res.sendFile(__dirname + "/success.html");
//
// })
//
//
//
// app.listen(process.env.PORT || 3000, function() {
//
//   console.log("Server is running")
//
// })
