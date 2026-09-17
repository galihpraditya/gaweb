import fs from "fs";
import path from "path";
import { SiteContentSchema } from "./types/content";
import { isR2Configured, saveContentToR2, getContentFromR2 } from "./r2";

const DATA_FILE_PATH = path.join(process.cwd(), "data", "site-content.json");
const TMP_FILE_PATH = path.join("/tmp", "site-content.json");

// In-memory cache untuk performa tinggi & respons cepat (<2ms)
let inMemoryContentCache: SiteContentSchema | null = null;
let lastCacheTimestamp = 0;
const CACHE_TTL_MS = 20 * 1000; // 20 detik TTL antar instance serverless

/**
 * Membaca data konten website terkini secara asynchronous.
 * Urutan prioritas:
 * 1. In-memory cache jika masih segar (<20 detik)
 * 2. Cloudflare R2 bucket jika kredensial terkonfigurasi (Penyimpanan Permanen Cloud)
 * 3. File /tmp jika ada update sesi Vercel
 * 4. File data/site-content.json di repository lokal
 */
export async function getSiteContent(): Promise<SiteContentSchema> {
  const now = Date.now();

  // 1. Cek in-memory cache jika masih segar
  if (inMemoryContentCache && now - lastCacheTimestamp < CACHE_TTL_MS) {
    return inMemoryContentCache;
  }

  // 2. Ambil dari Cloudflare R2 jika terkonfigurasi (Sumber Kebenaran Cloud Permanen)
  if (isR2Configured()) {
    try {
      const r2Data = await getContentFromR2();
      if (r2Data && r2Data.hero && r2Data.portfolios) {
        inMemoryContentCache = r2Data;
        lastCacheTimestamp = now;
        return r2Data;
      }
    } catch (r2Err) {
      console.warn("Gagal membaca konten dari Cloudflare R2, mencoba fallback disk:", r2Err);
    }
  }

  // 3. Cek apakah ada update di /tmp (khusus serverless Vercel)
  try {
    if (fs.existsSync(TMP_FILE_PATH)) {
      const tmpData = fs.readFileSync(TMP_FILE_PATH, "utf-8");
      const parsed = JSON.parse(tmpData) as SiteContentSchema;
      inMemoryContentCache = parsed;
      lastCacheTimestamp = now;
      return parsed;
    }
  } catch {
    // Abaikan jika tidak ada di /tmp
  }

  // 4. Baca dari data/site-content.json di repository
  try {
    if (fs.existsSync(DATA_FILE_PATH)) {
      const fileData = fs.readFileSync(DATA_FILE_PATH, "utf-8");
      const parsed = JSON.parse(fileData) as SiteContentSchema;
      inMemoryContentCache = parsed;
      lastCacheTimestamp = now;
      return parsed;
    }
  } catch (error) {
    console.error("Gagal membaca site-content.json dari disk:", error);
  }

  // 5. Fallback jika inMemoryContentCache ada sebelumnya
  if (inMemoryContentCache) {
    return inMemoryContentCache;
  }

  throw new Error("File data/site-content.json tidak ditemukan.");
}

/**
 * Fallback sinkron darurat jika dibutuhkan komponen sinkron
 */
export function getSiteContentSync(): SiteContentSchema {
  if (inMemoryContentCache) {
    return inMemoryContentCache;
  }

  try {
    if (fs.existsSync(DATA_FILE_PATH)) {
      const fileData = fs.readFileSync(DATA_FILE_PATH, "utf-8");
      const parsed = JSON.parse(fileData) as SiteContentSchema;
      inMemoryContentCache = parsed;
      lastCacheTimestamp = Date.now();
      return parsed;
    }
  } catch (err) {
    console.error("Gagal membaca sync dari data/site-content.json:", err);
  }

  throw new Error("File data/site-content.json tidak ditemukan.");
}

export interface SaveContentResult {
  success: boolean;
  persistedToCloud: boolean;
  persistedToRepoFile: boolean;
  storageEngine: "r2" | "local" | "ephemeral";
  message: string;
  data: SiteContentSchema;
}

/**
 * Menyimpan data konten website.
 * - Menyimpan ke Cloudflare R2 secara permanen jika R2 terkonfigurasi.
 * - Menyimpan ke file disk data/site-content.json jika running di local development.
 * - Mengupdate in-memory cache secara instan.
 */
export async function saveSiteContent(newContent: SiteContentSchema): Promise<SaveContentResult> {
  newContent.lastUpdated = new Date().toISOString();
  inMemoryContentCache = newContent;
  lastCacheTimestamp = Date.now();

  const serialized = JSON.stringify(newContent, null, 2);
  let persistedToRepo = false;
  let persistedToR2 = false;

  // 1. Simpan ke Cloudflare R2 (Permanen di cloud Vercel)
  if (isR2Configured()) {
    try {
      persistedToR2 = await saveContentToR2(newContent);
    } catch (r2Err) {
      console.error("Gagal menyimpan ke Cloudflare R2:", r2Err);
    }
  }

  // 2. Coba simpan ke folder data/ (berhasil di local development / server dengan write permission)
  try {
    const dataDir = path.dirname(DATA_FILE_PATH);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE_PATH, serialized, "utf-8");
    persistedToRepo = true;
  } catch {
    // Normal di Vercel read-only filesystem
  }

  // 3. Fallback /tmp jika R2 belum terkonfigurasi
  if (!persistedToR2 && !persistedToRepo) {
    try {
      fs.writeFileSync(TMP_FILE_PATH, serialized, "utf-8");
    } catch (tmpErr) {
      console.warn("Write to /tmp failed:", tmpErr);
    }
  }

  if (persistedToR2) {
    return {
      success: true,
      persistedToCloud: true,
      persistedToRepoFile: persistedToRepo,
      storageEngine: "r2",
      message: persistedToRepo
        ? "Konten berhasil disimpan permanen ke Cloudflare R2 dan repository lokal!"
        : "Konten berhasil disimpan secara permanen ke Cloudflare R2 Cloud Storage!",
      data: newContent,
    };
  }

  if (persistedToRepo) {
    return {
      success: true,
      persistedToCloud: false,
      persistedToRepoFile: true,
      storageEngine: "local",
      message: "Konten berhasil disimpan langsung ke file repository (data/site-content.json).",
      data: newContent,
    };
  }

  return {
    success: true,
    persistedToCloud: false,
    persistedToRepoFile: false,
    storageEngine: "ephemeral",
    message:
      "Konten berhasil diperbarui untuk sesi aktif. Pastikan variabel lingkungan Cloudflare R2 telah diset di Vercel agar tersimpan otomatis & permanen di cloud.",
    data: newContent,
  };
}
