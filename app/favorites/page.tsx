"use client";

import { useEffect, useState } from "react";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFavorites() {
      const res = await fetch("/api/favorites");
      const data = await res.json();
      setFavorites(data.favorites ?? []);
      setLoading(false);
    }

    fetchFavorites();
  }, []);

  return (
    <div className="min-h-screen bg-pink-50 p-6">
      <h1 className="text-2xl font-bold text-pink-600 mb-6">
        ❤️ お気に入り一覧
      </h1>

      {loading && <p>読み込み中...</p>}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {favorites.map((fav) => (
          <div
            key={fav.id}
            className="bg-white p-4 rounded-xl shadow"
          >
            {fav.products?.image && (
              <img
                src={fav.products.image}
                className="rounded-lg mb-3"
                alt=""
              />
            )}

            <p className="font-semibold">
              {fav.products?.brand}
            </p>
            <p>¥{fav.products?.price}</p>
            <p className="text-sm text-gray-500">
              {fav.products?.category}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}