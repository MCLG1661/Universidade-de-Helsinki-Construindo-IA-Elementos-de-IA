# Preview security validation — 2026-11-24

Manual evidence supplied by repository owner via Chrome DevTools screenshots. Preview loaded and NLP modules returned 200/304. Following hard reload, response headers showed Permissions-Policy camera=(), microphone=(), geolocation=(); X-Content-Type-Options nosniff; X-Frame-Options DENY; Referrer-Policy strict-origin-when-cross-origin; HSTS max-age=63072000 with includeSubDomains and preload; X-Robots-Tag noindex; Server Vercel.

CSP was present but only partially visible and included Kaspersky domains, consistent with possible local security software modification. Full origin CSP remains unverified. Console errors were visible; their causes have not been fully established. Vercel feedback.js was blocked in the network panel.

Automated preview check run 45509399883 failed on final hostname assertion after redirect. Authentication protection is a hypothesis, not confirmed. Do not weaken deployment protection or mark the automated check as passed. Manual evidence is partial and does not establish full security or production readiness. No real patient data should be used.
