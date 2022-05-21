const { Router } = require('express')
const express = require('express')
const {MailController} = require('../../Controllers/MailController')
const nodemailer = require ("nodemailer")
const routerMail = new Router

routerMail.use(express.json())
routerMail.use(express.urlencoded({ extended: true }))


routerMail.post('/api/mailing', MailController.sendEmail)


module.exports = { routerMail }