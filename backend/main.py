# backend_api.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import random
import datetime

app = FastAPI()

# Allow CORS to enable Streamlit frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Metric(BaseModel):
    title: str
    desc: str
    value: float
    unit: str
    scale: str
    max: float

class DashboardData(BaseModel):
    datetime: str
    aqi_value: int
    aqi_status: str
    aqi_description: str
    metrics: List[Metric]

@app.get("/air-quality", response_model=DashboardData)
def get_air_quality():
    now = datetime.datetime.now().strftime("%A, %b %d, %Y, %I:%M %p")
    aqi_value = random.randint(15, 80)
    if aqi_value <= 50:
        aqi_status = "Good"
        aqi_description = "The current air quality is good and poses little or no risk."
    elif aqi_value <= 100:
        aqi_status = "Moderate"
        aqi_description = "Air quality is acceptable; however, for some pollutants, there may be a moderate health concern."
    else:
        aqi_status = "Unhealthy"
        aqi_description = "Everyone may begin to experience health effects."

    metrics = [
        {"title": "PM1", "desc": "Particulate Matter ≤ 1µm", "value": round(random.uniform(5, 30), 1), "unit": "µg/m³", "scale": "Low", "max": 100},
        {"title": "PM2.5", "desc": "Particulate Matter ≤ 2.5µm", "value": round(random.uniform(15, 50), 1), "unit": "µg/m³", "scale": "Moderate", "max": 100},
        {"title": "PM10", "desc": "Particulate Matter ≤ 10µm", "value": round(random.uniform(20, 60), 1), "unit": "µg/m³", "scale": "Low", "max": 100},
        {"title": "Temperature", "desc": "Indoor Temperature", "value": round(random.uniform(22, 28), 1), "unit": "°C", "scale": "Normal", "max": 50},
        {"title": "CO₂", "desc": "Carbon Dioxide", "value": round(random.uniform(600, 1200), 1), "unit": "ppm", "scale": "Elevated", "max": 2000},
        {"title": "CO", "desc": "Carbon Monoxide", "value": round(random.uniform(0.3, 1.2), 2), "unit": "ppm", "scale": "Safe", "max": 10},
        {"title": "CH₂O", "desc": "Formaldehyde", "value": round(random.uniform(5, 30), 1), "unit": "ppb", "scale": "Low", "max": 100},
        {"title": "RH", "desc": "Relative Humidity", "value": round(random.uniform(35, 60), 1), "unit": "%", "scale": "Optimal", "max": 100},
    ]

    return DashboardData(
        datetime=now,
        aqi_value=aqi_value,
        aqi_status=aqi_status,
        aqi_description=aqi_description,
        metrics=metrics
    )
