export async function niceFetch(
  url: RequestInfo,
  opts?: RequestInit
): Promise<any> {
  const res = await fetch(url, {
    credentials: "include",
    ...opts,
  });
  return res.json();
}
