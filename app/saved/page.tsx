'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type Post = {
  id: number;
  title: string;
  image: string;
};

const POSTS: Post[] = [
  { id: 1, title: '白シャツ × デニム', image: 'https://via.placeholder.com/300x400?text=Style+1' },
  { id: 2, title: '黒ワンピース', image: 'https://via.placeholder.com/300x400?text=Style+2' },
  { id: 3, title: 'カジュアルセットアップ', image: 'https://via.placeholder.com/300x400?text=Style+3' },
];

export default function SavedPage() {
  const [savedIds, setSavedIds] = useState<number[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('saved');
    if (stored) setSavedIds(JSON.parse(stored));
  }, []);

  const savedPosts = POSTS.filter((p) => savedIds.includes(p.id));

  return (
    <main style={{ padding: 20 }}>
      <h1>保存した投稿</h1>
      <Link href="/">← 戻る</Link>

      <hr />

      {savedPosts.length === 0 && <p>まだ保存がありません</p>}

      {savedPosts.map((post) => (
        <div key={post.id} style={{ marginBottom: 20 }}>
          <img src={post.image} style={{ width: 200 }} />
          <p>{post.title}</p>
        </div>
      ))}
    </main>
  );
}

