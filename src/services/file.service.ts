import { File } from "../models";
import { v4 as uuid } from "uuid";
import { get } from "config";

export class FileService {
  public static onUploadFile(requestData: any) {
    return new Promise(async (resolve, reject) => {
      try {
        const { path, filename, size } = requestData.file;
        const obj = {
          fileName: filename,
          uuid: uuid(),
          path: path,
          size: size,
        };
        const newFile = new File(obj);
        const fileSaved = await newFile.save();
        const baseUrl = get("app.appBaseUrl");
        const res = {
          status: true,
          data: { file: `${baseUrl}/files/${fileSaved.uuid}` },
        };
        return resolve(res);
      } catch (error) {
        return reject(error);
      }
    });
  }

  public static async onSendFile(requestData: any) {
    return new Promise(async (resolve, reject) => {
      try {
        const fileData: any = await File.findOne({ uuid: requestData.uuid });
        if (fileData) {
          if (fileData.sender) {
            return resolve({ status: false, message: "Email already sent" });
          }

          const file = {
            uuid: fileData.uuid,
            fileName: fileData.fileName,
            size: fileData.size,
            downloadLink: `${get("app.appBaseUrl")}/files/download/${
              fileData.uuid
            }`,
          };
        }
      } catch (error) {
        return reject(error);
      }
    });
  }
}
