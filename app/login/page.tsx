"use client";

import { createClient } from "@supabase/supabase-js";
import { useState } from "react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function LoginPage() {
  const [email, setEmail] = useState("");

  async function handleLogin() {
    await supabase.auth.signInWithOtp({
      email,
    });
    alert("メール送信しました！");
  }

  return (
    <div className="p-6">
      <h1 className="text-xl mb-4">ログイン</h1>

      <input
        type="email"
        placeholder="メールアドレス"
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 mb-3"
      />

      <button
        onClick={handleLogin}
        className="bg-purple-500 text-white px-4 py-2"
      >
        ログイン
      </button>
    </div>
  );
}