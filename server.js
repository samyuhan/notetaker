// require dependencies
const express = require("express");
const fs = require("fs");
const path = require("path");
const db = require("./db/db")

// set up express app
var app = express();
var PORT = 5000;

// JSON formatting
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 