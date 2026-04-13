type Result = {
  content: string;
  similarity: number;
};

export default function SearchResultCard({
  result,
}: {
  result: Result;
}) {
  const tags = result.content.split(" ").slice(0, 4);

  return (
    <div className="w-80 h-[520px] bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col">
      {/* 擬似画像エリア */}
      <div className="flex-1 bg-gradient-to-br from-purple-200 to-pink-200 flex items-center justify-center text-purple-500 text-sm">
        IMAGE PREVIEW
      </div>

      {/* 情報 */}
      <div className="p-5">
        <p className="font-semibold text-base mb-3 leading-snug">
          {result.content}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((t, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-full bg-purple-100 text-purple-600 text-xs"
            >
              #{t}
            </span>
          ))}
        </div>

<div className="absolute right-4 bottom-24 flex flex-col gap-4">
  <button className="text-pink-500 text-2xl">❤️</button>
  <button className="text-purple-500 text-2xl">🔖</button>
</div>

        <p className="text-xs text-gray-400 mb-4">
          類似度 {(result.similarity * 100).toFixed(0)}%
        </p>

        <a
          href={`https://www.grl.jp/keyword/${encodeURIComponent(
            tags[0]
          )}/`}
          target="_blank"
          className="block text-center bg-purple-500 hover:bg-purple-600 transition text-white py-3 rounded-full text-sm"
        >
          GRL公式で見る
        </a>
      </div>
    </div>
  );
}



