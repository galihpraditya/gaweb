import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

// 5 Variabel lingkungan Cloudflare R2
const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME;
const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL;

/**
 * Memeriksa apakah kredensial Cloudflare R2 sudah dikonfigurasi lengkap
 */
export function isR2Configured(): boolean {
  return Boolean(
    R2_ACCOUNT_ID &&
      R2_ACCESS_KEY_ID &&
      R2_SECRET_ACCESS_KEY &&
      R2_BUCKET_NAME &&
      R2_PUBLIC_URL
  );
}

/**
 * Inisialisasi S3 Client untuk Cloudflare R2
 */
function getR2Client(): S3Client {
  if (!isR2Configured()) {
    throw new Error(
      "Kredensial Cloudflare R2 belum lengkap. Mohon periksa file .env.local atau Environment Variables di Vercel."
    );
  }

  return new S3Client({
    region: "auto",
    endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: R2_ACCESS_KEY_ID!,
      secretAccessKey: R2_SECRET_ACCESS_KEY!,
    },
  });
}

/**
 * Mengunggah file buffer ke Cloudflare R2 bucket
 * @returns URL publik permanen dari CDN Cloudflare R2
 */
export async function uploadFileToR2(
  buffer: Buffer,
  fileName: string,
  contentType: string
): Promise<{ key: string; url: string }> {
  const client = getR2Client();

  // Pastikan ekstensi & nama file bersih
  const cleanKey = fileName.replace(/^\/+/, "");

  const command = new PutObjectCommand({
    Bucket: R2_BUCKET_NAME,
    Key: cleanKey,
    Body: buffer,
    ContentType: contentType,
    CacheControl: "public, max-age=31536000, immutable", // Cache 1 tahun di CDN Cloudflare
  });

  await client.send(command);

  // Bentuk URL publik (misal: https://pub-xxx.r2.dev/nama-file.webp)
  const baseUrl = R2_PUBLIC_URL!.replace(/\/+$/, "");
  const publicUrl = `${baseUrl}/${cleanKey}`;

  return {
    key: cleanKey,
    url: publicUrl,
  };
}

/**
 * Menghapus file dari Cloudflare R2 berdasarkan URL atau object key
 */
export async function deleteFileFromR2(fileUrlOrKey: string): Promise<boolean> {
  if (!isR2Configured()) return false;

  try {
    const client = getR2Client();
    const baseUrl = R2_PUBLIC_URL!.replace(/\/+$/, "");

    // Ambil object key dari URL atau gunakan langsung jika berupa key
    let key = fileUrlOrKey;
    if (fileUrlOrKey.startsWith("http://") || fileUrlOrKey.startsWith("https://")) {
      key = fileUrlOrKey.replace(`${baseUrl}/`, "").replace(/^\/+/, "");
    }

    const command = new DeleteObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: key,
    });

    await client.send(command);
    return true;
  } catch (err) {
    console.error("Gagal menghapus file dari Cloudflare R2:", err);
    return false;
  }
}
