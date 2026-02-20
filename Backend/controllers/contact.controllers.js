const { MailtrapClient } = require("mailtrap");

const contact_submission = async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ success: false, error: "Missing required fields" });
    }

    const TOKEN = process.env.MAILTRAP_TOKEN;
    const client = new MailtrapClient({ token: TOKEN });

    const sender = {
        email: "hello@demomailtrap.co",
        name: "Trend Contact Form",
    };
    
    // As per user request, recipients should be shaikazeem2069@gmail.com
    const recipients = [
        {
            email: "shaikazeem2069@gmail.com",
        }
    ];

    try {
        await client.send({
            from: sender,
            to: recipients,
            subject: `New Contact Form Submission from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
            category: "Contact Form",
        });

        console.log(`✅ Email sent for contact form submission from ${email}`);
        res.json({ success: true, message: "Email sent successfully!" });
    } catch (error) {
        console.error("❌ Mailtrap error:", error);
        res.status(500).json({ success: false, error: "Failed to send email" });
    }
};

module.exports = { contact_submission };
