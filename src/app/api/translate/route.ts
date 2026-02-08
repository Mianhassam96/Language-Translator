import { NextRequest, NextResponse } from "next/server";
import { Translate } from "@google-cloud/translate/build/src/v2";

const translate = new Translate({
  key: process.env.GOOGLE_TRANSLATE_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { text, source, target } = await req.json();

    if (!text || !target) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const [translation] = await translate.translate(text, {
      from: source,
      to: target,
    });

    return NextResponse.json({ translatedText: translation });
  } catch (error) {
    console.error("Translation error:", error);
    return NextResponse.json(
      { error: "Translation failed" },
      { status: 500 }
    );
  }
}
