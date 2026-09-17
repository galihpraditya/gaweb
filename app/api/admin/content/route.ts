import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getSiteContent, saveSiteContent } from "@/lib/content-service";
import { SiteContentSchema } from "@/lib/types/content";
import { isR2Configured } from "@/lib/r2";

const SESSION_COOKIE_NAME = "gaweb_admin_session";
const SESSION_TOKEN = "authenticated_gaweb_admin_session_token_2026";

function isAuthorized(req: NextRequest): boolean {
  const sessionCookie = req.cookies.get(SESSION_COOKIE_NAME)?.value;
  return sessionCookie === SESSION_TOKEN;
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req: NextRequest) {
  try {
    const content = await getSiteContent();
    return NextResponse.json(
      {
        success: true,
        data: content,
        storage: {
          isR2Configured: isR2Configured(),
          engine: isR2Configured() ? "r2" : "local",
        },
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );
  } catch (error) {
    console.error("Error reading content:", error);
    return NextResponse.json(
      { success: false, error: "Gagal memuat data website." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  return PUT(req);
}

export async function PUT(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json(
      { success: false, error: "Sesi tidak valid atau telah berakhir. Silakan login kembali." },
      { status: 401 }
    );
  }

  try {
    const body = (await req.json()) as SiteContentSchema;

    if (!body || !body.hero || !body.portfolios) {
      return NextResponse.json(
        { success: false, error: "Format data website tidak valid." },
        { status: 400 }
      );
    }

    const result = await saveSiteContent(body);

    // Revalidasi cache halaman utama Next.js secara instan
    try {
      revalidatePath("/");
    } catch {
      // Abaikan jika revalidatePath tidak aktif di lingkungan tertentu
    }

    return NextResponse.json({
      success: true,
      persistedToCloud: result.persistedToCloud,
      persistedToRepoFile: result.persistedToRepoFile,
      storageEngine: result.storageEngine,
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    console.error("Error saving content:", error);
    return NextResponse.json(
      { success: false, error: "Gagal menyimpan perubahan konten." },
      { status: 500 }
    );
  }
}

