import dotenv from 'dotenv';
dotenv.config(); 
import nodemailer from "nodemailer"; 

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMPT_HOST, 
            port: process.env.SMPT_PORT,
            secure: false, 
            auth: {
                user: process.env.SMPT_USER, 
                pass: process.env.SMPT_PASSWORD
            },  
        });
    }
    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: process.env.SMPT_USER,
            to,
            subject: `Activation account on ${process.env.API_URL}`,
            text: "",
            html: 
                `
                    <div>
                        <h1>Please, click on the link to activate your account</h1>
                        <a href="${link}">${link}</a>
                    </div>
                `
        }).catch((e) => console.log("Mail error", e));
    }
}

export default new MailService(); 