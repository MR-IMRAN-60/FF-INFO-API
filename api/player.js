// GET /api/player?uid=123456789
// Also: GET /api/info/123456789
// No region needed - region is auto-detected and returned in the response.

const UPSTREAM = "https://imran.bro.bd/api/imu";
const AUTHOR = "Your Name"; // <-- change this to your name
const TIMEOUT_MS = 10000;

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "GET") {
    return res.status(405).json({ success: false, author: AUTHOR, error: "Only GET is allowed" });
  }

  const uid = String(req.query.uid || "").trim();
  if (!/^\d{5,14}$/.test(uid)) {
    return res.status(400).json({ success: false, author: AUTHOR, error: "Invalid or missing uid (5-14 digits)" });
  }

  const url = new URL(UPSTREAM);
  url.searchParams.set("uid", uid);

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);

  try {
    const r = await fetch(url, { signal: ctrl.signal, headers: { Accept: "application/json" } });
    const json = await r.json();

    if (!r.ok || json.success === false || !json.data) {
      return res.status(r.ok ? 404 : 502).json({
        success: false, author: AUTHOR, error: "Player not found or upstream error"
      });
    }

    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300");
    return res.status(200).json({
      success: true,
      author: AUTHOR,
      data: json.data
    });
  } catch (e) {
    const timedOut = e.name === "AbortError";
    return res.status(timedOut ? 504 : 500).json({
      success: false, author: AUTHOR,
      error: timedOut ? "Upstream timeout" : "Internal error"
    });
  } finally {
    clearTimeout(timer);
  }
};
