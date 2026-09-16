import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getSiteContent, saveSiteContent } from "@/lib/content-service";

const SESSION_COOKIE_NAME = "gaweb_admin_session";
const SESSION_TOKEN = "authenticated_gaweb_admin_session_token_2026";

function isAuthorized(req: NextRequest): boolean {
  const sessionCookie = req.cookies.get(SESSION_COOKIE_NAME)?.value;
  return sessionCookie === SESSION_TOKEN;
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json(
      { success: false, error: "Akses ditolak. Silakan login terlebih dahulu." },
      { status: 401 }
    );
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const category = (formData.get("category") as string) || "uploads";
    const customName = (formData.get("name") as string) || "";

    if (!file) {
      return NextResponse.json(
        { success: false, error: "File gambar tidak ditemukan dalam formulir." },
        { status: 400 }
      );
    }

    // Validasi tipe file
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/svg+xml", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: "Format file harus berupa gambar (JPG, PNG, WebP, SVG, GIF)." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Buat nama file yang aman
    const ext = path.extname(file.name) || ".webp";
    const safeBaseName = file.name
      .replace(ext, "")
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, "-")
      .slice(0, 30);
    const fileName = `${Date.now()}-${safeBaseName}${ext}`;

    const uploadsDir = path.join(process.cwd(), "public", "images", "uploads");
    let fileUrl = `/images/uploads/${fileName}`;
    let isBase64Fallback = false;

    // Coba simpan ke folder public/images/uploads/ (local dev)
    try {
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }
      fs.writeFileSync(path.join(uploadsDir, fileName), buffer);
    } catch (writeErr) {
      console.warn("Write to public/ failed (kemungkinan Vercel serverless read-only). Menggunakan Base64 Data URL:", writeErr);
      // Fallback Vercel: simpan sebagai data URL
      const base64Data = buffer.toString("base64");
      fileUrl = `data:${file.type};base64,${base64Data}`;
      isBase64Fallback = true;
    }

    // Daftarkan ke mediaLibrary di site content
    try {
      const currentContent = getSiteContent();
      const mediaItem = {
        id: `img-${Date.now()}`,
        name: customName || file.name,
        url: fileUrl,
        category: (category as "hero" | "showcase" | "dashboard" | "logo" | "uploads") || "uploads",
        uploadedAt: new Date().toISOString(),
      };

      currentContent.mediaLibrary = [mediaItem, ...(currentContent.mediaLibrary || [])];
      saveSiteContent(currentContent);

      return NextResponse.json({
        success: true,
        message: isBase64Fallback
          ? "Gambar berhasil diunggah (tersimpan dalam format data URL untuk lingkungan Vercel)."
          : "Gambar berhasil diunggah dan disimpan di folder public.",
        item: mediaItem,
        isBase64Fallback,
      });
    } catch (dbErr) {
      return NextResponse.json({
        success: true,
        message: "Gambar berhasil diunggah.",
        item: {
          id: `img-${Date.now()}`,
          name: customName || file.name,
          url: fileUrl,
          category,
          uploadedAt: new Date().toISOString(),
        },
      });
    }
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, error: "Gagal mengunggah gambar ke server." },
      { status: 500 }
    );
  }
}
