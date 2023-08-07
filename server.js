// Import required modules
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

// Create Express app
const app = express();

// Set up server port
const PORT = 3000;

// Middleware: Enable CORS
app.use(cors());

// Middleware: Parse incoming requests with JSON payloads
app.use(express.json());

// Endpoint to handle form data submission
app.post('/submitDonation', (req, res) => {
  // Get the form data from the request body
  const formData = req.body;

  // Read the current data from data.json
  fs.readFile(path.join(__dirname, 'data.json'), 'utf8', (err, data) => {
    if (err) {
      // If there's an error reading the file, respond with an error message
      console.error('Error reading data.json:', err);
      res.status(500).json({ error: 'Failed to read data.json' });
      return;
    }

    try {
      // Parse the existing data as JSON
      const existingData = JSON.parse(data);

      // Add the new form data to the existing data
      existingData.push(formData);

      // Write the updated data back to data.json
      fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify(existingData, null, 2), (err) => {
        if (err) {
          // If there's an error writing the file, respond with an error message
          console.error('Error writing data.json:', err);
          res.status(500).json({ error: 'Failed to write data.json' });
          return;
        }

        // If successful, respond with a success message
        res.json({ message: 'Data submitted successfully' });
      });
    } catch (parseError) {
      // If there's an error parsing the existing data, respond with an error message
      console.error('Error parsing data.json:', parseError);
      res.status(500).json({ error: 'Failed to parse data.json' });
    }
  });
});
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
  });
  app.get("/getData", (req, res) => {
    fs.readFile("data.json", "utf8", (err, data) => {
      if (err) {
        console.error("Error reading data.json:", err);
        return res.status(500).json({ error: "Internal server error" });
      }
  
      try {
        const jsonData = JSON.parse(data);
        res.status(200).json(jsonData);
      } catch (parseError) {
        console.error("Error parsing data.json:", parseError);
        res.status(500).json({ error: "Internal server error" });
      }
    });
  });
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
