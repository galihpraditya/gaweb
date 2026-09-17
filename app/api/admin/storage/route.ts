import { NextRequest, NextResponse } from "next/server";
import { isR2Configured, checkR2Health } from "@/lib/r2";

const SESSION_COOKIE_NAME = "gaweb_admin_session";
const SESSION_TOKEN = "authenticated_gaweb_admin_session_token_2026";

function isAuthorized(req: NextRequest): boolean {
  const sessionCookie = req.cookies.get(SESSION_COOKIE_NAME)?.value;
  return sessionCookie === SESSION_TOKEN;
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json(
      { success: false, error: "Akses ditolak. Silakan login terlebih dahulu." },
      { status: 401 }
    );
  }

  const configured = isR2Configured();
  if (!configured) {
    return NextResponse.json({
      success: true,
      isR2Configured: false,
      storageEngine: "local",
      message:
        "Kredensial Cloudflare R2 belum lengkap di Environment Variables. Saat ini berjalan dalam mode penyimpanan lokal.",
    });
  }

  const health = await checkR2Health();

  return NextResponse.json({
    success: health.success,
    isR2Configured: true,
    storageEngine: health.success ? "r2" : "local",
    bucket: health.bucket,
    message: health.message,
  });
}
