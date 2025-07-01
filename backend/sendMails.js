const nodeMailer = require('nodemailer')


const generateOrderHTML = (orderData, orderDate) => {
  const rows = orderData
    .map(
      (item) => `
        <tr>
          <td>${item.name}</td>
          <td style="text-align: center;">${item.qty}</td>
          <td style="text-align: right;">₹${item.price}</td>
        </tr>`
    )
    .join('');
    

  const total = orderData.reduce((sum, item) => sum + item.price * item.qty, 0);
  

  return `
    <div style="font-family: sans-serif; padding: 10px;">
      <h2>🍽️ FoodMonkey - Order Confirmation</h2>
      <p>Hi there! Your order on <strong>${orderDate}</strong> was placed successfully.</p>

      <table width="100%" style="border-collapse: collapse; margin-top: 10px;">
        <thead>
          <tr style="border-bottom: 1px solid #ccc;">
            <th align="left">Item</th>
            <th align="center">Qty</th>
            <th align="right">Price</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>

      <p style="margin-top: 15px;"><strong>Total:</strong> ₹${total}</p>

      <p>Thanks for ordering with us! 🥳</p>
    </div>
  `;
};



const sendOrderMail = async (toEmail, orderDetails,orderDate) => {

    const transporter = nodeMailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    })

    const mailOptions = {
        from: `"foodMonkey 🍽️" <${process.env.MAIL_USER}>`,
        to: toEmail,
        subject: `Your Order Confirmation - FoodMonkey`,
        html: generateOrderHTML(orderDetails,orderDate)
    };

    await transporter.sendMail(mailOptions);

}

module.exports = sendOrderMail;