# Simeon's to-do list

Tasks only you can do — assets, content and business confirmations. Claude adds items here as work surfaces them; tick or delete items as you complete them.

## 1. Create a logo render for social sharing (OG image)

Every page currently uses the 512×512 favicon as its link-preview image. Create a **1200×630 PNG** — e.g. a photorealistic render with the Dream InReality logo — and save it as `public/og-image.png`. Once it exists, ask Claude to swap it into every page's OpenGraph metadata.

## 2. Confirm DFM page FAQ claims

`/services/dfm-consultancy` states: (a) a quote and agreed delivery date come before any work starts, and (b) NDAs are routinely signed. Confirm both match how you actually work, or tell Claude how to reword them.

## 3. Provide Thailand liaison service details

The Thailand factory liaison / prototype coordination page can't be written without your input. Needed: what the service concretely includes (e.g. supplier communication, prototype coordination, inspection photos?), what the client sends, what they receive back, and typical engagement shape. Reminder: described as a dreaminreality sole-trader offering only — no SPP, and the UK–Thailand ETP is an MOU, never an FTA/tariff claim.

## 4. Portfolio content (deferred page)

When ready to build the portfolio page: write-ups and images for the **Halo Gym modular dumbbell system** and the **trading-desk hardware visualisation**.

## 5. Set your git identity (one-off)

Commits are currently attributed to an auto-generated email. Run:

```bash
git config --global user.name "SimSimButDifferent"
git config --global user.email "<your GitHub email>"
```

## 6. Google Maps housekeeping (optional)

From the old maps migration notes: create a production Map ID (the contact map uses `DEMO_MAP_ID`) and check the API key has domain restrictions in Google Cloud Console.
