import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("favorites")
      .select(`
        id,
        product_id,
        products (
          id,
          brand,
          price,
          color,
          category,
          similarity,
          image
        )
      `);

    if (error) throw error;

    return NextResponse.json({
      favorites: data,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}