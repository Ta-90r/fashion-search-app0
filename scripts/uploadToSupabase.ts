import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function upload() {
  const filePath = path.join(
    process.cwd(),
    "data/products-with-embeddings.json"
  );

  const raw = fs.readFileSync(filePath, "utf-8");
  const products = JSON.parse(raw);

  for (const product of products) {
    const { error } = await supabase
      .from("products")
      .insert(product);

    if (error) console.log(error);
  }

  console.log("✅ Upload complete");
}

upload();