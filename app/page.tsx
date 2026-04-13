import products from "../data/products.json";

export default function Home() {
  return (
    <main style={{ padding: "20px" }}>
      <h1>高い服 → プチプラ再現</h1>

      {products.map((item: any, index: number) => (
        <div key={index} style={{ marginBottom: "40px" }}>
          <h2>{item.title}</h2>

          <p>
            {item.high_brand} → {item.dupe_brand}
          </p>

          <div style={{ display: "flex", gap: "20px" }}>
            <img src={item.high_image} width="150" />
            <img src={item.dupe_image} width="150" />
          </div>

          <p>¥{item.price}</p>

          <a href={item.link} target="_blank">
            楽天で見る
          </a>
        </div>
      ))}
    </main>
  );
}