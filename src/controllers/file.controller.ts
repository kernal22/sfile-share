import { Request, Response } from "express";
import { FileService } from "../services";

export class FileController {
  public static async onUploadFile(req: Request, res: Response) {
    try {
      if (!req.file) {
        return res
          .status(500)
          .send({ status: false, error: "File is required" });
      }
      const result: any = await FileService.onUploadFile(req);
      if (result.status) {
        return res.status(201).send(result);
      } else {
        return res.status(500).send(result);
      }
    } catch (error) {
      FileController.handleError(req, res, error);
    }
  }

  public static handleError(req: Request, res: Response, error: any) {
    console.error(error);
    return res.status(500).json({ status: false, error: error.message });
  }
}
