import nodemailer from 'nodemailer'
import User from '@/models/userModel'
import bcryptjs from 'bcryptjs'

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        //create a hashed token
        const hashedToken = bcryptjs.hash(userId.toString(), 10)

        await User.findByIdAndUpdate(userId, { forgotPasswordToken: hashedToken, forgotPasswordTokenExpire: Date.now() + 3600000 })

        let transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "eff5f47be3239c",
                pass: "2118e3a66df1c6"
            }
        });

        const mailOptions = {
            from: 'ivankiller64@gmail.com',
            to: email,
            subject: 'Verifica tu correo electronico',
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
        }

        const mailResponse = await transport.sendMail(mailOptions);

        return mailResponse;

    } catch (error: any) {
        throw new Error(error.message);
    }
}