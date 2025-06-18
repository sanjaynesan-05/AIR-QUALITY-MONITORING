# Air Quality Monitoring Dashboard 🌫️

A responsive, real-time indoor **Air Quality Monitoring Dashboard** built with **React**, **Tailwind CSS**, **Framer Motion**, and **FastAPI**. The system collects air quality data from MongoDB and dynamically displays it through beautifully designed metric cards and animated AQI gauges.

---

## 📦 Tech Stack

### Frontend
- **React.js** (with Hooks)
- **Tailwind CSS** – utility-first styling with glassmorphism + glow
- **Framer Motion** – for smooth animations
- **Chart.js / Recharts** – for visual parameter trends
- **Heroicons / Lucide** – for modern icons

### Backend
- **FastAPI** – Python-based RESTful API
- **MongoDB Atlas** – cloud NoSQL database
- **Pymongo** – MongoDB client for Python
- **FastMail** – for alert-based email notifications

---

## ✨ Features

- 🎛️ **Dynamic AQI Gauge** with animation and color-coded health status
- 🧪 **Real-time Metrics** for PM2.5, CO₂, Temp, RH, TVOC, etc.
- 📉 **Graphical Trends** (planned)
- 📧 **Email Alerts** based on AQI thresholds
- 💡 **Health-Based Status Emojis**
- 🎨 Futuristic UI with metallic/glassmorphism theme

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/sanjaynesan-05/AIR-QUALITY-MONITORING.git
cd AIR-QUALITY-MONITORING
```

### 2. Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
uvicorn main:app --reload
```

Make sure you configure your `.env` file with your **MongoDB URI** and **email credentials**.

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🌍 Live Location (Coimbatore, Tamil Nadu)

<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3912.4125485427117!2d76.95530727480493!3d11.016844792154399!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859be3f7ddcff%3A0xafe385bdb4364b2!2sCoimbatore%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1718710834012!5m2!1sen!2sin" width="100%" height="300" style="border:0;" allowfullscreen="" loading="lazy"></iframe>

---

## 📂 Folder Structure

```
AIR-QUALITY-MONITORING/
├── backend/
│   ├── main.py
│   ├── db.py
│   ├── alert.py
│   ├── .env
│   └── requirements.txt
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── App.jsx
│   ├── index.css
│   └── tailwind.config.js
└── README.md
```

---

## 🛠️ Roadmap

- [x] Animated AQI Gauge
- [x] Responsive Layout
- [x] Email Alerts for AQI breaches
- [ ] Live Chart for every parameter
- [ ] Device Selection Panel
- [ ] Admin & User Login

---

## 🤝 Contribution

Pull requests are welcome. For major changes, open an issue first to discuss what you would like to change.

---

## 📄 License

MIT © [Sanjay Nesan J](https://github.com/sanjaynesan-05)

---

## 💬 Community

Join discussions, share feedback or contribute:
[GitHub Discussions](https://github.com/sanjaynesan-05/AIR-QUALITY-MONITORING/discussions)
