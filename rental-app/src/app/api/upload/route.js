import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import uniqid from "uniqid";
export async function POST(req) {
  console.log("Request received");
  const data = await req.formData();
  console.log("Form Data", data);
  if (data.get("files")) {
    //upload file
    const file = data.get("files");
    console.log("File", file);
    const s3Client = new S3Client({
      region: "ap-southeast-2",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
      },
    });
    const ext = file.name.split(".").slice(-1)[0];
    const newFileName = uniqid() + "." + ext;
    const chunks = [];
    for await (const chunk of file.stream()) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);
    const bucket = "rental-app-alona";
    await s3Client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: newFileName,
        ACL: "public-read",
        ContentType: file.type,
        Body: buffer,
      })
    );
    const link = "https://" + bucket + ".s3.amazonaws.com/" + newFileName;
    return Response.json(link);
  }
  return Response.json(true);
}
