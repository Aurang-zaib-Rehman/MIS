import { createServer } from "vite";

async function main() {
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
  });

  try {
    const mod = await vite.ssrLoadModule("./test-phase3.mjs");
    await mod.runTests();
  } finally {
    await vite.close();
  }
}

main().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
