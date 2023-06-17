const express = require("express");
const upload = require("express-fileupload");
const app = express();

//middleware
app.use(upload())

//routes
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html")
})


app.post("/upload", (req, res) => {
  if (req.files) {
    var file = req.files.file;
    var fileName = file.name;
    file.mv("./uploads/" + fileName, (err) => {
      if (err) {
        res.sendStatus(500)
        console.log(err)
      } else {
        res.sendStatus(200)
      }
    })
    console.log(fileName)
  }
})

// Start the server
const port = 3000; // Or any other port number you prefer
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
