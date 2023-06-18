const express = require("express");
const upload = require("express-fileupload");
const path = require('path');
const fs = require("fs")
const app = express();

//middleware
app.use(upload())
const uploadsFolder = path.join(__dirname, 'uploads');

//routes

// Route for retrieving all images
app.get('/uploads/all', (req, res) => {
  fs.readdir(uploadsFolder, (err, files) => {
    if (err) {
      return res.status(500).send('Error retrieving images.');
    }

    const images = files.filter(file => {
      const fileExtension = path.extname(file).toLowerCase();
      return ['.png', '.jpg', '.jpeg', '.gif'].includes(fileExtension);
    });

    res.send({ images });
  });
});

app.get('/uploads/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, 'uploads', filename);

  // Send the requested image file
  res.sendFile(filePath);
});

app.get('/uploads', (req, res) => {
  const imageFiles = ['image1.jpg', 'image2.png', 'image3.gif'];

  // Return the list of image file names or any other desired response
  res.send({ images: imageFiles });
});

app.post("/upload", (req, res) => {
  if (req.files) {
    var file = req.files.file;
    var fileName = file.name;
    file.mv("./uploads/" + fileName, (err) => {
      if (err) {
        res.sendStatus(500)
        console.log(err)
      } else {
        res.send({ url: `http://localhost:3000/uploads/${fileName}` });
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
