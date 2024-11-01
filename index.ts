import axios from "axios";
import { rm, writeFile } from "fs/promises";

const GITHUB_OWNER = "hsinyau";
const GITHUB_REPO = "moments";
const GITHUB_API_ENDPOINT = "https://api.github.com";

const userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36 Edg/130.0.0.0";

axios.defaults.headers.common["User-Agent"] = userAgent;

const api = axios.create({
  baseURL: GITHUB_API_ENDPOINT,
  timeout: 4000,
});

async function main() {
  const data = await api
    .get(`/repos/${GITHUB_OWNER}/${GITHUB_REPO}/issues`)
    .then((res) => res.data);

  await rm("./data/moments.json", { force: true });
  await writeFile("./data/moments.json", JSON.stringify(data), {
    encoding: "utf-8",
  });

  const now = new Date();

  await rm("./README.md", { force: true });
  await writeFile("./README.md",
    `# moments

更新于：${now.toLocaleString(undefined, {
      timeStyle: "short",
      dateStyle: "short",
    })}`,
    { encoding: "utf-8" }
  );
}

main();
