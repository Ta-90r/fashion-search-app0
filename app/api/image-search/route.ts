import { NextResponse } from "next/server";
import products from "../../../data/products.json";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function cosineSimilarity(a: number[], b: number[]) {
  const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const magB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  return dot / (magA * magB);
}

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type");
    let query = "";

    // テキスト検索
    if (contentType?.includes("application/json")) {
      const body = await req.json();
      query = body.query || "";
    }

    // 画像検索 → テキスト化
    if (contentType?.includes("multipart/form-data")) {
      const formData = await req.formData();
      const file = formData.get("file") as File;

      const bytes = await file.arrayBuffer();
      const base64 = Buffer.from(bytes).toString("base64");

      const vision = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: "この服の特徴を日本語で説明して" },
              {
                type: "image_url",
                image_url: {
                  url: `data:image/jpeg;base64,${base64}`,
                },
              },
            ],
          },
        ],
      });

      query = vision.choices[0].message.content || "";
      query += " 韓国 ファッション プチプラ";
    }

    if (!query) {
      return NextResponse.json(products);
    }

    // 🔥 クエリembedding
    const queryEmb = await client.embeddings.create({
      model: "text-embedding-3-small",
      input: query,
    });

    const queryVec = queryEmb.data[0].embedding;

    // 🔥 事前embedding使う（高速）
    const results = products.map((item: any) => {
      const itemVec = item.embedding;

      const score = cosineSimilarity(queryVec, itemVec);

      return { ...item, score };
    });

    results.sort((a, b) => b.score - a.score);

    return NextResponse.json(results);

  } catch (error) {
    console.error(error);
    return NextResponse.json([]);
  }
}