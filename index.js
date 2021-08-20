const express = require("express");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

//allows acces to environmental variables
dotenv.config();

//Initialize express app
const app = express();

// Express Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//serve static files
app.use(express.static("public"));
app.use(express.static(__dirname + "/public"));

app.set("view engine", "ejs");

//render home page
app.get("/", (req, res) => {
  res.render("index");
});

app.post("/", (req, res) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "alvanwanorim@gmail.com",
      pass: "alvan2327",
    },
  });

  const mailOptions = {
    from: req.body.email,
    to: "alvanwanorim@gmail.com",
    subject: `Message from ${req.body.email}: ${req.body.subject}`,
    text: req.body.message,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    }
    console.log("Email sent:");
  });
  res.render("sent");
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`App is running on port ${port}`));
