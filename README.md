<div align="center">

<img src="https://raw.githubusercontent.com/MR-IMRAN-60/ImranBypass/refs/heads/main/file_0000000002908211a8e422d9cda83254.png" alt="FF Info API Banner" width="100%" />

# 🔥 FF Info API 🌍

**Fast, global, serverless Free Fire player-info API — built for Vercel**

![Method](https://img.shields.io/badge/METHOD-GET-22c55e?style=for-the-badge)
![Runtime](https://img.shields.io/badge/Node-18%2B-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Deploy](https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel)
![Regions](https://img.shields.io/badge/Regions-All%20Countries-f97316?style=for-the-badge)

*Zero database · No env vars · One click deploy*

</div>

---

## ✨ Features

- 🌐 **All-country support** – no region needed, just send the UID and the region is auto-detected
- ⚡ **Edge cached** – 60s cache + stale-while-revalidate for blazing speed
- 🛡️ **Input validation** – clean errors for bad UID
- 🔓 **CORS enabled** – use it straight from any frontend
- ⏱️ **10s timeout guard** – never hangs your app
- 🏷️ **Your branding** – set your author name in one line

---

## 🚀 One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

Or via CLI:

```bash
npm i -g vercel
vercel --prod
```

### ✏️ Set your name

No environment variables needed. Open `api/player.js` and change one line:

```js
const AUTHOR = "IMRAN";
```

---

## 📡 Endpoints

### `GET /api/player`

| Param | Type | Required | Example |
|-------|------|----------|---------|
| `uid` | number | ✅ | `6605263063` |

> No `region` parameter needed. The player's region is returned inside `data.region`.

```bash
curl "https://YOUR-APP.vercel.app/api/player?uid=6605263063"
curl "https://YOUR-APP.vercel.app/api/info/6605263063"   # short URL
```

---

## 📦 Sample Response

```json
{
  "success": true,
  "author": "Your Name",
  "data": {
    "uid": "6605263063",
    "region": "BD",
    "name": "ᥫ᭡It's⚠ME",
    "level": 68,
    "likes": 12053,
    "account": { "created_at": "...", "last_login": "..." },
    "rank": { "br_max_rank": 323, "cs_max_rank": 321 },
    "guild": { "name": "...", "members": 40 }
  }
}
```

## ❌ Errors

| Code | Meaning |
|------|---------|
| 400 | Invalid or missing `uid` |
| 404 | Player not found |
| 405 | Method not GET |
| 502/504 | Upstream error / timeout |

---

## 🗂️ Structure

```
ff-info-api/
├── api/
│   └── player.js     # main GET endpoint
├── package.json
├── vercel.json       # CORS + short route
└── README.md
```

## ⚠️ Notes

- This project is a **wrapper** – data availability depends on the upstream source set as `UPSTREAM` in `api/player.js`. Region coverage follows what that source supports.
- Not affiliated with Garena or Free Fire. Use responsibly.

---

<div align="center">

Made with ❤️ by **IMRAN** · Edit `AUTHOR` in `api/player.js` to put your own name

</div>
