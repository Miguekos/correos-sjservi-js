"use strict";
const axios = require("axios");
const log = require("../utils/logger");
const renameKeys = require("../utils/renameKeys");
const Raven = require("raven");
const nodemailer = require("nodemailer");
/**
 * Correo adjuntos
 */
exports.correosAdjuntos = async (req, res) => {
  try {
    async function traerInfo(params) {
      const getInfo = await axios({
        method: "GET",
        url: `${process.env.LP_SJ}/api/apis/correos?persona=${params}`
      })

      console.log(getInfo.data[0]);
      // for (let index = 0; index < array.length; index++) {
      //   const element = array[index];

      // }
      main(getInfo.data[0]).catch(console.error);

    }

    async function main(params) {

      // console.log(req.body.de);
      console.log("para", params.no_correo);
      console.log("cc", req.body.cc);
      console.log("bcc", req.body.bcc);
      console.log("asunto", params.no_asunto);
      console.log("mensaje", req.body.mensaje);
      console.log("html", req.body.html);
      console.log("adjuntos", req.body.adjuntos);
      const Adjuntos = [
        {
          "filename": "Test.pdf",
          "path": params.no_arcadj
        }
      ]

      // const Adjuntos = req.body.adjuntos;
      // let testAccount = await nodemailer.createTestAccount();
      let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        pool: true,
        secureConnection: true,
        port: 465,
        secure: true, // true for 465, false for other ports
        transportMethod: 'SMTP',
        auth: {
          user: "miguekos1233@gmail.com", // generated ethereal user
          pass: "Alex2513.", // generated ethereal password
        },
        tls: {
          // do not fail on invalid certs
          rejectUnauthorized: false,
        },
      });

      let info = await transporter.sendMail({
        from: "miguekos1233@gmail.com", // sender address
        to: params.no_correo ? params.no_correo : "", // list of receivers
        cc: req.body.cc ? req.body.cc : "", // list of receivers
        bcc: req.body.bcc ? req.body.bcc : "", // list of receivers
        subject: params.no_asunto ? params.no_asunto : "", // Subject line
        text: req.body.mensaje ? req.body.mensaje : "", // plain text body
        html: params.no_mensaj ? params.no_mensaj : "", // html body
        attachments: Adjuntos,
      });
      console.log(info);
      res.json({
        info,
      });
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      // Preview only available when sending through an Ethereal account
      // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }

    traerInfo(req.params.id)

  } catch (e) {
    Raven.captureException(e, {
      req: req,
      level: "error",
      tags: {
        controller: "correos.js",
      },
    });
    log.error(e.message);
    res.status(500).json({
      codigoRespuesta: 500,
      detalleRespuesta: e.message,
    });
  }
};

exports.correosAdjuntosArray = async (req, res) => {
  try {

    const jsonBody = req.body
    // console.log(jsonBody);

    async function traerInfo(params, archivosParaAdjuntar) {
      const getInfo = await axios({
        method: "GET",
        url: `${process.env.LP_SJ}/api/apis/correos?persona=${params}`
      })

      console.log(getInfo.data[0]);
      // for (let index = 0; index < array.length; index++) {
      //   const element = array[index];

      // }
      let paraAdjuntar = []
      for (let index = 0; index < archivosParaAdjuntar.length; index++) {
        const element = archivosParaAdjuntar[index];
        paraAdjuntar.push({
          "filename": `archivo${index}.pdf`,
          "path": element
        })
      }
      await enviarCorreo(getInfo.data[0], paraAdjuntar).catch(console.error);

    }

    async function enviarCorreo(params, Adjuntos) {

      // console.log(req.body.de);
      console.log("para", params.no_correo);
      console.log("cc", req.body.cc);
      console.log("bcc", req.body.bcc);
      console.log("asunto", params.no_asunto);
      console.log("mensaje", req.body.mensaje);
      console.log("html", req.body.html);
      // console.log("adjuntos", req.body.adjuntos);

      // const Adjuntos = req.body.adjuntos;
      // let testAccount = await nodemailer.createTestAccount();
      let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        pool: true,
        secureConnection: true,
        port: 465,
        secure: true, // true for 465, false for other ports
        transportMethod: 'SMTP',
        auth: {
          user: "miguekos1233@gmail.com", // generated ethereal user
          pass: "Alex2513.", // generated ethereal password
        },
        tls: {
          // do not fail on invalid certs
          rejectUnauthorized: false,
        },
      });

      let info = await transporter.sendMail({
        from: "miguekos1233@gmail.com", // sender address
        to: params.no_correo ? params.no_correo : "", // list of receivers
        cc: req.body.cc ? req.body.cc : "miguekos1233@gmail.com", // list of receivers
        bcc: req.body.bcc ? req.body.bcc : "", // list of receivers
        subject: params.no_asunto ? params.no_asunto : "", // Subject line
        text: req.body.mensaje ? req.body.mensaje : "", // plain text body
        html: params.no_mensaj ? params.no_mensaj : "", // html body
        attachments: Adjuntos,
      });
      console.log(info);
      return info
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      // Preview only available when sending through an Ethereal account
      // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }

    async function main(jsonBody) {
      // console.log(jsonBody);
      for (let index = 0; index < jsonBody.cliente.length; index++) {
        const element = jsonBody.cliente[index];
        console.log("############## -------- element -------- ##############");
        await traerInfo(element, jsonBody.adjuntos)
        console.log("############## -------- element -------- ##############");
      }
      res.json({
        codRes: "00",
        message: "Correos Envioados"
      });
    }

    await main(jsonBody)

  } catch (e) {
    Raven.captureException(e, {
      req: req,
      level: "error",
      tags: {
        controller: "correos.js",
      },
    });
    log.error(e.message);
    res.status(500).json({
      codigoRespuesta: 500,
      detalleRespuesta: e.message,
    });
  }
};
