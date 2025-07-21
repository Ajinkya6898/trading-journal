export async function getFiiDiiData(): Promise<any> {
  const res = await fetch("/api/fii-dii");
  if (!res.ok) throw new Error("Failed to fetch FII/DII data");
  return res.json();
}
