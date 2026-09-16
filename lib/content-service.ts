import fs from "fs";
import path from "path";
import { SiteContentSchema } from "./types/content";

const DATA_FILE_PATH = path.join(process.cwd(), "data", "site-content.json");
const TMP_FILE_PATH = path.join("/tmp", "site-content.json");

// In-memory fallback cache for serverless environments where disk writes are restricted
let inMemoryContentCache: SiteContentSchema | null = null;

/**
 * Membaca data konten website terkini.
 * Memeriksa in-memory cache -> /tmp (jika di Vercel) -> data/site-content.json
 */
export function getSiteContent(): SiteContentSchema {
  if (inMemoryContentCache) {
    return inMemoryContentCache;
  }

  // Cek apakah ada update di /tmp (khusus serverless Vercel)
  try {
    if (fs.existsSync(TMP_FILE_PATH)) {
      const tmpData = fs.readFileSync(TMP_FILE_PATH, "utf-8");
      const parsed = JSON.parse(tmpData) as SiteContentSchema;
      inMemoryContentCache = parsed;
      return parsed;
    }
  } catch {
    // Abaikan jika tidak ada di /tmp
  }

  // Baca dari data/site-content.json di repository
  try {
    if (fs.existsSync(DATA_FILE_PATH)) {
      const fileData = fs.readFileSync(DATA_FILE_PATH, "utf-8");
      const parsed = JSON.parse(fileData) as SiteContentSchema;
      inMemoryContentCache = parsed;
      return parsed;
    }
  } catch (error) {
    console.error("Gagal membaca site-content.json:", error);
  }

  throw new Error("File data/site-content.json tidak ditemukan.");
}

export interface SaveContentResult {
  success: boolean;
  persistedToRepoFile: boolean;
  message: string;
  data: SiteContentSchema;
}

/**
 * Menyimpan data konten website.
 * Mencoba menulis ke data/site-content.json.
 * Jika di Vercel (read-only filesystem), otomatis fallback ke /tmp & in-memory cache,
 * serta memberi tahu admin agar mendownload file JSON untuk di-commit ke Git.
 */
export function saveSiteContent(newContent: SiteContentSchema): SaveContentResult {
  newContent.lastUpdated = new Date().toISOString();
  inMemoryContentCache = newContent;

  const serialized = JSON.stringify(newContent, null, 2);

  // 1. Coba simpan ke folder data/ (berhasil di local development / server dengan write permission)
  try {
    const dataDir = path.dirname(DATA_FILE_PATH);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE_PATH, serialized, "utf-8");
    return {
      success: true,
      persistedToRepoFile: true,
      message: "Konten berhasil disimpan langsung ke file repository (data/site-content.json).",
      data: newContent,
    };
  } catch (writeErr: unknown) {
    const errorObj = writeErr as { code?: string };
    console.warn("Write to data/ failed (kemungkinan read-only serverless Vercel):", errorObj?.code);

    // 2. Fallback untuk Vercel / serverless: tulis ke /tmp
    try {
      fs.writeFileSync(TMP_FILE_PATH, serialized, "utf-8");
    } catch (tmpErr) {
      console.warn("Write to /tmp failed, tetap tersimpan di in-memory cache:", tmpErr);
    }

    return {
      success: true,
      persistedToRepoFile: false,
      message:
        "Konten berhasil diperbarui di sesi aktif. Karena hosting Vercel bersifat serverless read-only, silakan klik tombol 'Download Backup JSON' di tab Pengaturan lalu commit ke repository Git untuk menyimpan permanen.",
      data: newContent,
    };
  }
}
