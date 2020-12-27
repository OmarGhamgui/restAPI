const express = require("express");
const app = express();
const bodyParser = require("body-parser");
let mongoose = require("mongoose");
require("dotenv/config");
mongoose.connect(
  process.env.DB_Connection,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (er) => {
    if (er) {
      console.log(er);
    } else console.log("connected to DB");
  }
);
let Person = require("./models/User");

app.use(bodyParser.json());

// GET ALL PERSONS
app.get("/", async (req, res) => {
  try {
    let persons = await Person.find();
    res.json(persons);
    console.log("persons", persons);
  } catch (error) {
    console.error(error);
  }
});

//CREATE A PERSON PROFILE
app.post("/", async (req, res, next) => {
  try {
    const person = await new Person({
      name: req.body.name,
      age: req.body.age,
    });
    person.save();
  } catch (err) {
    res.json({ message: err });
  }
});

//SPECIFIC PERSON
app.get("/:personID", async (req, res) => {
  try {
    const person = await Person.findById(req.params.personID);
    res.json(person);
  } catch (err) {
    res.json({ message: err });
  }
});

//DELETE A PERSON
app.delete("/:personID", async (req, res) => {
  try {
    const removedProfile = await Person.remove({ _id: req.params.personID });
  } catch {
    res.json({ message: err });
  }
});

//UPDATE A PERSON PROFILE
app.patch("/:personID", async (req, res) => {
  try {
    const updatedProfile = await Person.updateOne(
      { _id: req.params.personID },
      { $set: { name: req.body.name } }
    );
    res.json(updatedProfile);
  } catch {
    res.json({ message: err });
  }
});

app.listen(5000, (err) => {
  if (err) {
    throw err;
  } else console.log("no error");
});
