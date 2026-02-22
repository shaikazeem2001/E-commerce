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
            subject: `New Message from ${name} via Trend`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #f8f9fa;">
                    <h2 style="color: #ff6a00; border-bottom: 2px solid #ff6a00; padding-bottom: 10px;">New Contact Submission</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <div style="margin-top: 20px; padding: 15px; background: #fff; border-radius: 8px; border-left: 4px solid #ff6a00;">
                        <p style="margin: 0;"><strong>Message:</strong></p>
                        <p style="margin-top: 10px; line-height: 1.6;">${message}</p>
                    </div>
                    <p style="margin-top: 20px; font-size: 12px; color: #6b7280; text-align: center;">This message was sent from the Trend E-commerce contact form.</p>
                </div>
            `,
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
