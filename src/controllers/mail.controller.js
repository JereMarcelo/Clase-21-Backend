import nodemailer from "nodemailer";
import * as dotenv from "dotenv"
dotenv.config({ path: "./.env" })

export const host = process.env.mail_host
export const port = process.env.mail_port
export const user = process.env.mail_user
export const pass = process.env.mail_pass

export const sendMail = async (req, res) => {
    const transporter = nodemailer.createTransport({
        host: host,
        port: port,
        auth: {
            user: user,
            pass: pass
        }
    });

    transporter.sendMail({
        from: '"Coderback" <coder@backend.com>',
        to: "abellojeremias@gmail.com",
        subject: 'TEST',
        html: "",
    })
        .then((info) =>  res.send({ message: "email sent" }))
        .catch((err) => res.send(err))

}