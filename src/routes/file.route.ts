import { Request, Response, Router } from "express";
import { uploads } from "../helpers";
import { FileController } from "../controllers";
import { EmailService, mailTemplate } from "../services";
import { ISendMail } from "../entities";
import { get } from "config";
import { File } from "../models";
import dotenv from "dotenv";
dotenv.config();

const router = Router();

router.post("/api/file", uploads, FileController.onUploadFile);

router.get("/file/:uuid", async (req: Request, res: Response) => {
  try {
    const uuid = req.params.uuid;
    const fileData: any = await File.findOne({ uuid: uuid });

    if (fileData) {
      const file = {
        uuid: fileData.uuid,
        fileName: fileData.fileName,
        size: fileData.size,
        downloadLink: `${process.env.APP_BASE_URL}/file/download/${fileData.uuid}`,
      };
      return res.render("download", file);
    } else {
      return res.render("download", { err: "Link has been expired" });
    }
  } catch (error) {
    return res.status(500).send({ status: false, error: error.message });
  }
});

router.get("/file/download/:uuid", async (req: Request, res: Response) => {
  try {
    const uuid = req.params.uuid;
    const fileData: any = await File.findOne({ uuid: uuid });

    if (fileData) {
      const filePath = `${__dirname}/../../public/uploads/${fileData.fileName}`;
      return res.download(filePath);
    } else {
      return res.render("download", { err: "Link has been expired" });
    }
  } catch (error) {
    return res.status(500).send({ status: false, error: error.message });
  }
});

router.post("/api/file/send", async (req: Request, res: Response) => {
  try {
    const { uuid, emailTo, emailFrom } = req.body;
    if (!uuid || !emailTo || !emailFrom)
      return res
        .status(500)
        .send({ status: false, error: "All fields are required" });

    const fileData: any = await File.findOne({ uuid: uuid });
    if (fileData) {
      if (fileData.sender) {
        return res
          .status(422)
          .send({ status: false, message: "Email already sent" });
      }

      fileData.sender = emailFrom;
      fileData.receiver = emailTo;
      const response = await fileData.save();

      const mailData: ISendMail = {
        from: emailFrom,
        to: emailTo,
        subject: "File Sharing",
        text: `${emailFrom} shared file with you`,
        html: mailTemplate(
          emailFrom,
          `${process.env.APP_BASE_URL}/file/${fileData.uuid}`,
          fileData.size + "KB",
          "24 hours"
        ),
      };
      const info = await EmailService.sendMail(mailData);
      if (info)
        return res.status(200).send({ status: true, message: "Mail sent" });
      return res
        .status(500)
        .send({ status: false, error: "something went wrong" });
    }
  } catch (error) {
    return res.status(500).send({ status: false, error: error.message });
  }
});

export default router;
