import express from 'express';
import cors from 'cors';
import Razorpay from 'razorpay';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));


// Initialize Razorpay with proper configuration
const razorpay = new Razorpay({
  key_id: 'rzp_test_YC3tpaItr1TQbb',
  key_secret: '6a9q5RqZFIqbGGlggtbfaAlx'
});

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Verify email configuration
transporter.verify(function(error, success) {
  if (error) {
    console.error('Email configuration error:', error);
  } else {
    console.log('Email server is ready to send messages');
    console.log('Email configuration:', {
      user: process.env.EMAIL_USER,
      supplierEmail: process.env.SUPPLIER_EMAIL
    });
  }
});

app.post('/create-order', async (req, res) => {
  try {
    const { amount, currency, receipt } = req.body;
    
    console.log('Received request body:', req.body);
    console.log('Amount type:', typeof amount);
    console.log('Amount value:', amount);
    
    // Ensure amount is a valid integer
    if (typeof amount !== 'number' || !Number.isInteger(amount)) {
      console.error('Invalid amount type or value:', amount);
      return res.status(400).json({ 
        error: 'Invalid amount provided',
        details: `Amount must be a valid integer. Received: ${amount} (${typeof amount})`
      });
    }
    
    // Create order with Razorpay
    const orderData = {
      amount,
      currency,
      receipt,
    };
    
    console.log('Creating order with data:', orderData);
    
    const order = await razorpay.orders.create(orderData);
    console.log('Order created successfully:', order);
    
    res.json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ 
      error: 'Failed to create order',
      details: error.message || 'Unknown error',
      originalError: error
    });
  }
});

// New endpoint to send order details via email
app.post('/send-order-email', async (req, res) => {
  try {
    console.log('Received email request:', req.body);

    // Validate environment variables
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.SUPPLIER_EMAIL) {
      console.error('Missing email configuration in .env file');
      return res.status(500).json({ 
        error: 'Server configuration error',
        details: 'Email configuration is missing. Please check server configuration.'
      });
    }

    // Validate request body
    if (!req.body.orderDetails || !req.body.customerInfo) {
      console.error('Invalid request body:', req.body);
      return res.status(400).json({ 
        error: 'Invalid request',
        details: 'Request body must contain orderDetails and customerInfo'
      });
    }

    const { orderDetails, customerInfo } = req.body;

    // Validate required fields
    const requiredFields = {
      orderDetails: ['items', 'subtotal', 'shipping', 'tax', 'total'],
      customerInfo: ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state', 'zipCode', 'country']
    };

    for (const [section, fields] of Object.entries(requiredFields)) {
      for (const field of fields) {
        if (!req.body[section][field]) {
          console.error(`Missing required field: ${section}.${field}`);
          return res.status(400).json({ 
            error: 'Invalid request',
            details: `Missing required field: ${section}.${field}`
          });
        }
      }
    }

    console.log('Email configuration:', {
      from: process.env.EMAIL_USER,
      to: process.env.SUPPLIER_EMAIL
    });


// Prepare image attachments (base64)
const attachments = [];

orderDetails.items.forEach((item, index) => {
  if (
    item.customImage &&
    item.customImage.fileData &&
    item.customImage.fileData.startsWith("data:image/")
  ) {
    const base64Data = item.customImage.fileData.split(",")[1];
    const mimeType = item.customImage.fileData.match(/data:(image\/.+);base64/)[1];
    const extension = mimeType.split("/")[1] || "png";
    attachments.push({
      filename: item.customImage.fileName || `custom-image-${index}.${extension}`,
      content: base64Data,
      encoding: "base64",
    });
  }
});




    // Create email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.SUPPLIER_EMAIL,
      subject: `New Order Received - ${orderDetails.receipt}`,
      html: `
        <h2>New Order Details</h2>
        <h3>Order ID: ${orderDetails.receipt}</h3>
        
        <h4>Customer Information:</h4>
        <p>Name: ${customerInfo.firstName} ${customerInfo.lastName}</p>
        <p>Email: ${customerInfo.email}</p>
        <p>Phone: ${customerInfo.phone}</p>
        <p>Address: ${customerInfo.address}, ${customerInfo.city}, ${customerInfo.state}, ${customerInfo.zipCode}, ${customerInfo.country}</p>
        
        <h4>Order Items:</h4>
        <ul>
          ${orderDetails.items.map(item => `
            <li>
              <strong>${item.name}</strong><br>
              Quantity: ${item.quantity}<br>
              Size: ${item.size || 'N/A'}<br>
              Material: ${item.material || 'N/A'}<br>
              Color: ${item.color || 'N/A'}<br>
              ${item.customText ? `Custom Text: ${item.customText}<br>` : ''}
              ${item.jerseyName ? `Jersey Name: ${item.jerseyName}<br>` : ''}
              ${item.jerseyNumber ? `Jersey Number: ${item.jerseyNumber}<br>` : ''}
              ${item.notes ? `Notes: ${item.notes}<br>` : ''}
              Price: ₹${item.totalPrice.toFixed(2)}
            </li>
          `).join('')}
        </ul>
        
        <h4>Order Summary:</h4>
        <p>Subtotal: ₹${orderDetails.subtotal.toFixed(2)}</p>
        <p>Shipping: ₹${orderDetails.shipping.toFixed(2)}</p>
        <p>Tax: ₹${orderDetails.tax.toFixed(2)}</p>
        <p><strong>Total: ₹${orderDetails.total.toFixed(2)}</strong></p>
      `,
        attachments
    };

    console.log('Attempting to send email with options:', {
      ...mailOptions,
      auth: { user: process.env.EMAIL_USER }
    });

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info);
    
    res.json({ success: true, message: 'Order details sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      error: 'Failed to send order details',
      details: error.message || 'Unknown error'
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 