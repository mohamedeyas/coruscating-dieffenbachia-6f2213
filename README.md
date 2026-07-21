# Billing App

A React billing/invoicing app (POS, Invoices, Customers, Products, Expenses, Reports).

## Run locally (optional, to test first)
```
npm install
npm run dev
```
Then open the URL it prints (usually http://localhost:5173).

## Publish for free — Option A: Vercel (recommended, easiest)
1. Go to https://vercel.com and sign up (free) with GitHub, Google, or email.
2. Create a new GitHub repository and push this folder to it:
   ```
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```
3. In Vercel, click "Add New Project" → import that GitHub repo.
4. Vercel auto-detects Vite. Leave settings as default and click "Deploy".
5. In ~1 minute you'll get a live link like `your-app.vercel.app` — share that with your customer.

## Publish for free — Option B: Netlify (drag-and-drop, no GitHub needed)
1. On your computer, run:
   ```
   npm install
   npm run build
   ```
   This creates a `dist` folder.
2. Go to https://app.netlify.com/drop
3. Drag the `dist` folder onto the page.
4. Netlify instantly gives you a live link — share that with your customer.

## Notes
- Every time you make changes, repeat the build/deploy step (Vercel does this automatically on every `git push`).
- This app currently stores data in memory only (it resets on page refresh) — let me know if you want it to save data permanently, and I can add that.
