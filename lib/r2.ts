import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  HeadBucketCommand,
} from "@aws-sdk/client-s3";
import { SiteContentSchema } from "./types/content";

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

const CONTENT_OBJECT_KEY = "site-content.json";

/**
 * Menyimpan seluruh data konten website (JSON) secara permanen ke bucket Cloudflare R2
 */
export async function saveContentToR2(content: SiteContentSchema): Promise<boolean> {
  if (!isR2Configured()) return false;

  try {
    const client = getR2Client();
    const serialized = JSON.stringify(content, null, 2);

    const command = new PutObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: CONTENT_OBJECT_KEY,
      Body: serialized,
      ContentType: "application/json; charset=utf-8",
      CacheControl: "no-cache, no-store, must-revalidate",
    });

    await client.send(command);
    return true;
  } catch (err) {
    console.error("Gagal menyimpan site-content.json ke Cloudflare R2:", err);
    return false;
  }
}

/**
 * Mengambil data konten website dari bucket Cloudflare R2
 */
export async function getContentFromR2(): Promise<SiteContentSchema | null> {
  if (!isR2Configured()) return null;

  try {
    const client = getR2Client();
    const command = new GetObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: CONTENT_OBJECT_KEY,
    });

    const response = await client.send(command);
    if (!response.Body) return null;

    const bodyString = await response.Body.transformToString("utf-8");
    const parsed = JSON.parse(bodyString) as SiteContentSchema;

    if (parsed && parsed.hero && parsed.portfolios) {
      return parsed;
    }
    return null;
  } catch (err: any) {
    // Jika file belum ada di bucket (NoSuchKey / 404), return null agar fallback ke file lokal
    if (err?.name === "NoSuchKey" || err?.$metadata?.httpStatusCode === 404) {
      return null;
    }
    console.warn("Notice saat mengambil konten dari Cloudflare R2:", err?.message || err);
    return null;
  }
}

/**
 * Memeriksa status kesehatan koneksi Cloudflare R2
 */
export async function checkR2Health(): Promise<{
  success: boolean;
  message: string;
  isConfigured: boolean;
  bucket?: string;
}> {
  if (!isR2Configured()) {
    return {
      success: false,
      isConfigured: false,
      message: "Kredensial Cloudflare R2 belum lengkap di environment variables.",
    };
  }

  try {
    const client = getR2Client();
    const command = new HeadBucketCommand({
      Bucket: R2_BUCKET_NAME,
    });
    await client.send(command);
    return {
      success: true,
      isConfigured: true,
      bucket: R2_BUCKET_NAME,
      message: `Koneksi ke bucket '${R2_BUCKET_NAME}' berhasil & aktif.`,
    };
  } catch (err: any) {
    return {
      success: false,
      isConfigured: true,
      bucket: R2_BUCKET_NAME,
      message: `Gagal mengakses bucket '${R2_BUCKET_NAME}': ${err?.message || "Koneksi ditolak"}`,
    };
  }
}

