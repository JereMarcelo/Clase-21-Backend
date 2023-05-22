import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'otha.huel@ethereal.email',
        pass: 'ZhRPcVfGt3uCCjcrNu'
    }
});

transporter.sendMail({
    from: '"Backend" <coder@coderhouse.com> ',
    to:'abellojeremias@gmail.com',
    subject:'Test mail from nodemailer',
    html:'<h1> Hello Backend </h1>',
})
.then((info) => console.log('mail sent'))
.catch((err) => console.log(err));