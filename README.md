# 冬遊西藏 2026

A static trip guide for 24 December 2026 to 3 January 2027. The nine-day Tibet segment runs from 25 December to 2 January, with travel days at either end.

- Open the site at [GitHub Pages](https://helenhung-hue.github.io/Tibet/). To preview locally with offline support, run `python3 -m http.server 8000` here and open `http://localhost:8000/`.
- Update the bookings, timeline and packing checklist in `trip-data.js` (`DAYS` and `LIST`). Edit the weather contingencies, map links and photography credits in `app.js`.
- Link directly to a day with `#day-N`, for example `#day-7` for 納木措. Use `#prep`, `#expect` or `#info` for the other sections.
- The site stores the checklist in browser storage. The service worker saves the guide and photos for offline use after a successful online visit. Maps and external sources require a connection. When changing site files, increment the cache version in `sw.js` so the revised guide is available offline.
- Real photos are resized WebP files from Wikimedia Commons. Each photo's source, creator and original license appear under **相片來源與授權** in the site footer. The source illustration presets are used for other stops.
