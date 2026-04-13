const fs = require("fs");

const newItem = {
  id: Date.now(),
  name: "韓国風ワンピ",
  description: "韓国 デート モテ 清楚",
  image: "/sample.jpg",
  link: "https://example.com",
  embedding: []
};

const data = JSON.parse(fs.readFileSync("data/products.json"));

data.push(newItem);

fs.writeFileSync("data/products.json", JSON.stringify(data, null, 2));

console.log("追加完了");