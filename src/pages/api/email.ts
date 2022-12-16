import nodemailer from 'nodemailer';

interface EmailType {
    nome: string
    sendMailer: string
    telefone: string
}

const email = process.env.EMAILADRESS;
const password = process.env.EMAILPASSWORD;

const transporter = nodemailer.createTransport({
    host: "smtp.titan.email",
    port: 465,
    auth: {
        user: email,
        pass: password
    }
});

const mailer = ({ sendMailer, nome, telefone }: EmailType) => {
   
    const from =
        nome && sendMailer ? `${nome} <${email}>` : ` ${nome || email}`;
    const message = {
        from,
        to: `flaviogabrielsr0507@gmail.com`,
        subject: `Novo contato de - ${nome}`,
        text: "Novo contato",
        html: `
       <div
         style="
              display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 100%;
                background-color: #f5f5f5;
                padding: 20px;
                box-sizing: border-box;
                font-family: 'Roboto', sans-serif;
                font-size: 16px;
                color: #333;
                line-height: 1.5;
                text-align: center;
                "
       >
        <div
            style="
                max-width: 600px;
                width: 100%;
                background-color: #fff;
                padding: 20px;
                box-sizing: border-box;
                border-radius: 5px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                "
        >
            <h1
            style="
                font-size: 24px;
                color: #333;
                margin: 0 0 20px;
                "
            >
            Novo contato de - ${nome}
            </h1>
            <p
            style="
                margin: 0 0 20px;
                "
            >
            <strong>Nome:</strong> ${nome}
            </p>
            <p
            style="
                margin: 0 0 20px;
                "
            >
            <strong>Email:</strong> ${sendMailer}
            </p>
            <p
            style="
                margin: 0 0 20px;
                "
            >
            <strong>Telefone:</strong> ${telefone}
            </p>

            <footer
            style="
                margin-top: 20px;
                padding-top: 20px;
                border-top: 1px solid #eee;
                "
            >
            <p
                style="
                margin: 0;
                font-size: 12px;
                color: #999;
                "
            >
                Esse email foi enviado do formulário de nosso site
            </p>
            </footer>
       </div>
        `,
        replayTo: from

    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(message, (err: any, info: unknown) => {
            if (err) {
                reject(err);
            } else {
                resolve(info);
            }
        });

    });
}

export default async (req: any, res: any) => {
    const { sendMailer, nome, telefone } = req.body;
   
    if (!nome || !sendMailer || !telefone) {
        return res.status(400).json({ message: 'Preencha todos os campos' });
    }

    const mailerRes = await mailer({
        sendMailer, nome, telefone
    });
    res.send(mailerRes);
}