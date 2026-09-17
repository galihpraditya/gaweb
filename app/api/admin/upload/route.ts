import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { getSiteContent, saveSiteContent } from "@/lib/content-service";
import { isR2Configured, uploadFileToR2, deleteFileFromR2 } from "@/lib/r2";

export const dynamic = "force-dynamic";
export const revalidate = 0;

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

  // Cek apakah kredensial Cloudflare R2 sudah dikonfigurasi
  if (!isR2Configured()) {
    return NextResponse.json(
      {
        success: false,
        error:
          "Koneksi Cloudflare R2 belum dikonfigurasi. Mohon tambahkan variabel R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME, dan R2_PUBLIC_URL di file .env.local atau di Environment Variables Vercel.",
        isNotConfigured: true,
      },
      { status: 400 }
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
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/svg+xml",
      "image/gif",
    ];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Format file harus berupa gambar (JPG, PNG, WebP, SVG, GIF).",
        },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Format nama file unik dan aman untuk URL S3/R2
    const ext = path.extname(file.name) || ".webp";
    const safeBaseName = file.name
      .replace(ext, "")
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, "-")
      .slice(0, 40);
    const fileName = `${Date.now()}-${safeBaseName}${ext}`;

    // Upload langsung ke Cloudflare R2
    const { url: publicUrl } = await uploadFileToR2(buffer, fileName, file.type);

    // Daftarkan metadata ke mediaLibrary di site content
    const mediaItem = {
      id: `img-${Date.now()}`,
      name: customName || file.name,
      url: publicUrl,
      category: (category as "hero" | "showcase" | "dashboard" | "logo" | "uploads") || "uploads",
      uploadedAt: new Date().toISOString(),
    };

    try {
      const currentContent = getSiteContent();
      currentContent.mediaLibrary = [
        mediaItem,
        ...(currentContent.mediaLibrary || []),
      ];
      saveSiteContent(currentContent);
    } catch (saveErr) {
      console.warn("Gagal sinkronisasi otomatis mediaLibrary:", saveErr);
    }

    return NextResponse.json({
      success: true,
      message: "Gambar berhasil diunggah ke Cloudflare R2.",
      item: mediaItem,
    });
  } catch (error: any) {
    console.error("Cloudflare R2 upload error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Gagal mengunggah gambar ke Cloudflare R2.",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json(
      { success: false, error: "Akses ditolak. Silakan login terlebih dahulu." },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(req.url);
    const fileUrl = searchParams.get("url");

    if (!fileUrl) {
      return NextResponse.json(
        { success: false, error: "URL gambar harus disertakan." },
        { status: 400 }
      );
    }

    // Hapus file dari bucket Cloudflare R2 jika file berasal dari R2
    await deleteFileFromR2(fileUrl);

    // Hapus dari mediaLibrary lokal
    try {
      const currentContent = getSiteContent();
      currentContent.mediaLibrary = (currentContent.mediaLibrary || []).filter(
        (m) => m.url !== fileUrl
      );
      saveSiteContent(currentContent);
    } catch {
      // Abaikan jika content service sedang read-only
    }

    return NextResponse.json({
      success: true,
      message: "Aset gambar berhasil dihapus dari Cloudflare R2 dan pustaka media.",
    });
  } catch (error: any) {
    console.error("Cloudflare R2 delete error:", error);
    return NextResponse.json(
      { success: false, error: "Gagal menghapus aset gambar." },
      { status: 500 }
    );
  }
}
