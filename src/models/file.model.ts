import { model, Schema } from "mongoose";

const fileSchema: Schema = new Schema(
  {
    fileName: { type: String, required: true, trim: true },
    path: { type: String, required: true, trim: true },
    size: { type: Number, required: true },
    uuid: { type: String, required: true },
    sender: { type: String, trim: true },
    receiver: { type: String, trim: true },
  },
  { timestamps: true }
);

const File = model("File", fileSchema);
export { File };
