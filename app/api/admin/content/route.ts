import { NextRequest, NextResponse } from "next/server";
import { getSiteContent, saveSiteContent } from "@/lib/content-service";
import { SiteContentSchema } from "@/lib/types/content";

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
    const content = getSiteContent();
    return NextResponse.json({
      success: true,
      data: content,
    });
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

    const result = saveSiteContent(body);

    return NextResponse.json({
      success: true,
      persistedToRepoFile: result.persistedToRepoFile,
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
