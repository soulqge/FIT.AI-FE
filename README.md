This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Available Features

- Sign-in
- Sign-up
- Nutrition Plan
- Track Food Consumption (Add food is not implemented yet)
- Recommendations
- Track Progress Graph (Still dummy, not implemented yet)

# FitAI – Asisten Nutrisi Cerdas Berbasis AI 🍽️🤖

*FitAI* adalah aplikasi berbasis kecerdasan buatan yang memberikan rekomendasi makanan secara otomatis sesuai dengan tujuan pengguna: bulking, cutting, atau maintenance. Cukup dengan mengisi data dasar seperti berat badan, tinggi, umur, dan frekuensi olahraga, pengguna akan mendapatkan menu harian yang sesuai kebutuhan nutrisi mereka.

---

## 🚀 Fitur Utama

- Perhitungan kebutuhan kalori & makronutrien otomatis
- Rekomendasi menu harian berbasis AI
- Personalisasi berdasarkan preferensi makanan, alergi, dan budget
- Didukung oleh algoritma genetika untuk hasil optimal

---

## 🧠 Teknologi yang Digunakan

- *Backend:* Node.js / Python (bisa disesuaikan)
- *AI Engine:* Algoritma Genetika untuk pemilihan menu terbaik
- *Database:* MongoDB / PostgreSQL (untuk menyimpan makanan & user profile)
- *Frontend:* Next Js
- *Deployment:* Vercel / Netlify (untuk frontend), Docker / VPS (backend)

---

## 🛠️ Cara Menjalankan Proyek Ini
```bash
git clone https://github.com/username/fitai.git
cd fitai

touch .env

vim .env

## Tambahkan variabel ini
DATABASE_URL=
LLM_URL=
JWT_SECRET=
ALGHORITH=
SECRET_KEY=
PORT=

npm run build

npm start

## atau kamu dapat menggunakan docker
docker build -t <image name> .

docker run -d -p yourport:containerport <image name> <container name>


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
