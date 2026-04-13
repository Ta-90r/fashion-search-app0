import fs from "fs";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const products = JSON.parse(
  fs.readFileSync("data/products.json", "utf-8")
);

async function run() {
  for (let item of products) {
    const text = item.name + " " + item.description;

    const res = await client.embeddings.create({
      model: "text-embedding-3-small",
      input: text,
    });

    item.embedding = res.data[0].embedding;
  }

  fs.writeFileSync(
    "data/products.json",
    JSON.stringify(products, null, 2)
  );

  console.log("完了🔥");
}

run();