"use client";

import { useState, useEffect } from "react";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);

  const [favorites, setFavorites] = useState<any[]>([]);
  
  useEffect(() => {
  const fav = localStorage.getItem("fav");
  if (fav) setFavorites(JSON.parse(fav));
}, []);

  useEffect(() => {
  fetch("/api/auto-items")
    .then(async (res) => {
      const text = await res.text();
      if (!text) return [];
      return JSON.parse(text);
    })
    .then((data) => {
      if (Array.isArray(data)) {
        setResults(data);
      } else {
        setResults([]);
      }
    })
    .catch(() => setResults([]));
}, []);

  useEffect(() => {
  // 初期表示でおすすめ
  fetch("/api/image-search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: "" }),
  })
    .then((res) => res.json())
    .then((data) => setResults(data));
}, []);

  // 🔵 テキスト検索
  const handleSearch = async () => {
    const res = await fetch("/api/image-search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    const data = await res.json();
    setResults(data);
  };

  // 🔵 画像検索
  const handleImage = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/image-search", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setResults(data);
  };
 

  return (
    <div className="p-10">
      <a
  href="https://instagram.com/あなた"
  target="_blank"
  className="text-pink-500 underline"
>
  👉 コーデはインスタでも公開中
</a>
      <h1 className="text-xl font-bold">
  似てるプチプラコーデ見つける💖
</h1>

      {/* 🔵 テキスト検索 */}
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="例：黒 パンツ"
        className="border p-2"
      />

      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 ml-2"
      >
        検索
      </button>

      {/* 🔴 これが画像検索UI */}
      <div className="mt-4">
        <input type="file" accept="image/*" onChange={handleImage} />
      </div>

      {/* 🔵 結果表示 */}
      <div className="mt-6 grid grid-cols-2 gap-4">
  {results.map((item: any, i: number) => (
  <div key={i} className="bg-white p-2 mb-2">

    <img
  src={item.image || "https://via.placeholder.com/300"}
  className="w-full h-40 object-cover"
/>

    <p>{item.name}</p>

    <button
      onClick={() => {
        console.log("クリックURL:", item.link); // ←ここ重要

        if (item.link) {
          window.open(item.link, "_blank");
        } else {
          alert("リンクなし");
        }
      }}
      className="bg-pink-500 text-white px-3 py-1 mt-2"
    >
      楽天で見る
    </button>

  </div>
))}
</div>
    </div>
  );
}