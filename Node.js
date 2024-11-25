const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Route to handle form submission
app.post('/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Use your email service provider
      auth: {
        user: 'rushant583@gmail.com', // Replace with your email
        pass: 'Passwordrsushant583@',        // Replace with your email password or app password
      },
    });

    // Mail options
    const mailOptions = {
      from: email,
      to: 'rushant583@gmail.com', // Your email to receive messages
      subject: `New Contact Form Submission from ${name}`,
      text: `Message: ${message}\nFrom: ${name} (${email})`,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
