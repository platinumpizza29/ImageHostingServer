const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const upload = multer({ dest: 'uploads/' }); // Set the destination folder for uploaded images

//Middleware
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No image file was uploaded.');
  }
  // Process the uploaded image and save it or perform any required operations
  // Return the relevant response to the client, such as the URL or other details of the uploaded image
  res.send({ url: `http://localhost:3000/uploads/${req.file.filename}` });
});

const port = 3000; // Or any other port number you prefer
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
