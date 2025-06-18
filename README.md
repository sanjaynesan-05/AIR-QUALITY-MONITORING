# Air Quality Monitoring Dashboard 🌫️

A responsive, real-time indoor **Air Quality Monitoring Dashboard** built with **React**, **Tailwind CSS**, **Framer Motion**, and **FastAPI**. The system collects air quality data from MongoDB and dynamically displays it through beautifully designed metric cards and animated AQI gauges.

---
## 📸 Dashboard Preview

![Dashboard Preview](https://raw.githubusercontent.com/sanjaynesan-05/AIR-QUALITY-MONITORING/main/dashboard.png)
---
---

## 📦 Tech Stack

### 🌐 Frontend

[![React](https://img.shields.io/badge/React.js-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-EF008F?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Chart.js](https://img.shields.io/badge/Chart.js-F5788D?style=for-the-badge&logo=chartdotjs&logoColor=white)](https://www.chartjs.org/)
[![Recharts](https://img.shields.io/badge/Recharts-FF7448?style=for-the-badge&logo=recharts&logoColor=white)](https://recharts.org/)
[![Heroicons](https://img.shields.io/badge/Heroicons-000000?style=for-the-badge&logo=heroicons&logoColor=white)](https://heroicons.com/)
[![Lucide](https://img.shields.io/badge/Lucide-000000?style=for-the-badge&logo=lucide&logoColor=white)](https://lucide.dev/)

### ⚙️ Backend

[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![MongoDB Atlas](https://img.shields.io/badge/MongoDB_Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/cloud/atlas)
[![Pymongo](https://img.shields.io/badge/PyMongo-306998?style=for-the-badge&logo=python&logoColor=white)](https://pymongo.readthedocs.io/)

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

## 🤝 Contribution

Pull requests are welcome. For major changes, open an issue first to discuss what you would like to change.

---

## 📄 License

MIT © [Sanjay Nesan J](https://github.com/sanjaynesan-05)

---

## 💬 Community

Join discussions, share feedback or contribute:
[GitHub Discussions](https://github.com/sanjaynesan-05/AIR-QUALITY-MONITORING/discussions)
