import { NextResponse } from "next/server";
import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST() {
  try {
    const { data: docs } = await supabase
      .from("documents")
      .select("id, content")
      .is("embedding", null);

    if (!docs || docs.length === 0) {
      return NextResponse.json({ message: "No documents to embed" });
    }

    for (const doc of docs) {
      const embeddingRes = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: doc.content,
      });

      await supabase
        .from("documents")
        .update({
          embedding: embeddingRes.data[0].embedding,
        })
        .eq("id", doc.id);
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "embedding failed" }, { status: 500 });
  }
}
