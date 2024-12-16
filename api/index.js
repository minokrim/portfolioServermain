import express from "express";
import bodyparser from "body-parser";
import cors from "cors";
import env from "dotenv";
import nodemailer from "nodemailer";

env.config();
const app=express();
app.use(cors());
app.use(express.json());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}))

const { EMAIL_USER, EMAIL_PASS,SERVER_PORT} = process.env;

const transporter=nodemailer.createTransport({
    host: "smtp.gmail.com",
    port:465,
    secure:true,
    auth:{
        user:EMAIL_USER,
        pass:EMAIL_PASS,
    }
})
app.get("/", (req, res) => res.send("Express on Vercel"));
app.post("/db/react",async(req,res)=>{
    var fullname=req.body.fullname
    var email=req.body.email
    var message=req.body.message
    
         let mailOptions={
            from:EMAIL_USER,
            to:"ayomidekareem563@gmail.com",
            subject:"Message from Portfolio",
            replyTo: email,
            text: `Dear alameen, \n\n${fullname} has sent the following message: \n\n${message} \n\nKind regards, \n${email}`,
        }
        await transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log('Error occurred:', error);
              return res.status(500).json({ error: "Error sending email." });
            } else {
              console.log('Email sent:', info.response);
              return res.status(200).json({ message: "Email sent successfully!" });
            }
          });
    })

app.listen(process.env.SERVER_PORT,(req,res)=>{
    console.log("server running")
})

