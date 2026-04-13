import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import OpenAI from "openai";
import fs from "fs";
import path from "path";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

async function generate() {
  const filePath = path.join(process.cwd(), "data/products.json");
  const rawData = fs.readFileSync(filePath, "utf-8");
  const products = JSON.parse(rawData);

  const updatedProducts = [];

  for (const product of products) {
    console.log("Generating embedding for:", product.name);

    const response = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: product.name + " " + product.description,
    });

    updatedProducts.push({
      ...product,
      embedding: response.data[0].embedding,
    });
  }

  fs.writeFileSync(
    path.join(process.cwd(), "data/products-with-embeddings.json"),
    JSON.stringify(updatedProducts, null, 2)
  );

  console.log("✅ Embeddings generated!");
}

generate();