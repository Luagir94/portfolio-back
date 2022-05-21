
const Joi = require('joi');
const dotenv = require('dotenv').config()
const nodemailer = require ("nodemailer")
const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIRECT_URI =process.env.REDIRECT_URI 
const REFRESH_TOKEN = process.env.REFRESH_TOKEN
const {google} = require('googleapis');
const oAuth2Client = new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECT_URI)
oAuth2Client.setCredentials({refresh_token:REFRESH_TOKEN})
        const sendMail = async (name, email, phone, msg)=>{
    try {
   const accessToken = await oAuth2Client.getAccessToken()
   const transport = nodemailer.createTransport({
     service : 'gmail',
     auth:{
       type:'OAuth2',
       user: 'lucianoagiraudi@gmail.com',
       clientId : CLIENT_ID,
       clientSecret: CLIENT_SECRET,
       refreshToken:REFRESH_TOKEN,
       accessToken: accessToken
     }
   })


   const mailOptions = {
    from:'Portfolio Notification <lucianoagiraudi@gmail.com>',
    to:'lucianoagiraudi@gmail.com',
    subject:'Nuevo Contacto Portfolio',
    text: 'hola',
    html: `<h1>${name}</h1>
          <h2>${email}</h2>
          <h2>${phone}</h2>
          <h2>${msg}</h2>
    `
  }
  const responseToSender ={
    from:'Luciano Giraudi <lucianoagiraudi@gmail.com>',
    to:email,
    subject:'Gracias por Contactarte!',
    text: 'hola',
    html: `<h1>Hola/Hello ${name}!</h1>
          <p>Gracias por haberte contactado conmigo, a la brevedad me estare comunicando con vos, ante cualquier duda podes contestar este email! Que tengas un excelente dia!</p>
          <p>Thank you for contacting me, I will be contacting you shortly, if you have any questions, you can answer this email! Have a great day!</p>
          <a href="https://lucianogiraudi.com/">https://lucianogiraudi.com/</a>
    `
  }

  const respuesta = await transport.sendMail(responseToSender)
  const result = await transport.sendMail(mailOptions)
  // return {result}
 } catch (error) {
   console.log(error);
 }
}





const MailController = {
    sendEmail: async (req, res) => {

try {
    const {name, email, phone, msg} = req.body;
    sendMail(name, email, phone, msg)
   
    res.send({message: `Form enviado satisfactoriamente`, success : true})
} catch (error) {
    res.send({message: error.message, success : false})
}


       
}}

module.exports = { MailController }