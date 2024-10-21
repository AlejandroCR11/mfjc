const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

app.use(express.json()); // Para analizar solicitudes JSON

// Configurar el transportador de Nodemailer
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'tuemail@gmail.com',
        pass: 'tucontraseña'
    }
});

// Ruta para enviar el código de recuperación
app.post('/enviar-codigo', (req, res) => {
    const emailDestino = req.body.email;
    const codigoGenerado = Math.floor(100000 + Math.random() * 900000); // Genera el código de 6 dígitos

    let mailOptions = {
        from: 'tuemail@gmail.com',
        to: emailDestino,
        subject: 'Código de recuperación de contraseña',
        text: `Tu código de recuperación es: ${codigoGenerado}`
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
            res.json({ success: false });
        } else {
            console.log('Correo enviado: ' + info.response);
            res.json({ success: true });
        }
    });
});

// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
