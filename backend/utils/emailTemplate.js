const otpEmailTemplate = (user, otp, verifyURL) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Identity</title>
    <style>
        body { font-family: Arial, sans-serif; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .centered { text-align: center; }
        .logo { width: 60px; height: 60px; background-color: #4c5fd7; margin: 0 auto 20px; }
        h1 { color: #4c5fd7; }
        .code { font-size: 24px; font-weight: bold; margin: 20px 0; }
        .button-container { text-align: center; margin: 30px 0; }
        .verify-button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #4c5fd7;
            color: white;
            text-decoration: none;
            font-weight: bold;
            border-radius: 5px;
            transition: all 0.3s ease;
            box-shadow: 0 4px 6px rgba(76, 95, 215, 0.2);
        }
        .verify-button:hover {
            background-color: #3a4db0;
            transform: translateY(-2px);
            box-shadow: 0 6px 8px rgba(76, 95, 215, 0.3);
        }
        .footer { font-size: 12px; color: #666; margin-top: 40px; text-align:center }
    </style>
</head>
<body>
    <div class="container">
        <div class="centered">
            <div class="logo"></div>
            <h1>Verify your Account</h1>
        </div>
        <p>Hello ${
          user.name.split(" ").length > 2
            ? user.name.split(" ").slice(0, 2).join(" ")
            : user.name.split(" ").slice(0, 1).join(" ")
        },</p>
        <p>You are required to enter the following code to activate your account in elevateMart. Please enter the code in 5 minutes.</p>
        <p>Your verification code:</p>
        <div class="centered">
            <div class="code">${otp}</div>
        </div>
        <div class="button-container">
            <a href="${verifyURL}" class="verify-button">Verify Identity</a>
        </div>
        <p class="footer">If this wasn't you, please ignore this email or contact our customer service center: support@elevatemart.com for further assistance.</p>
        <p class="footer">Copyright &copy; 2024 elevateMart, All rights reserved.</p>
</body>
</html>`;
};

export default otpEmailTemplate;
