import { NextResponse } from "next/server";

// Server-side fallback for share target when service worker doesn't intercept
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const image = formData.get("image") as File | null;

    if (image) {
      // The service worker should normally handle this, but as a fallback
      // redirect to analyze page which will prompt the user to re-upload
      return NextResponse.redirect(new URL("/analyze?source=share", request.url), 303);
    }

    const link = formData.get("link") as string | null;
    if (link) {
      return NextResponse.redirect(
        new URL(`/analyze?url=${encodeURIComponent(link)}`, request.url),
        303
      );
    }

    return NextResponse.redirect(new URL("/", request.url), 303);
  } catch {
    return NextResponse.redirect(new URL("/", request.url), 303);
  }
}
