from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient, DESCENDING
from dotenv import load_dotenv
from datetime import datetime
import os

# Load environment variables from .env
load_dotenv()

app = FastAPI()

# Enable CORS for all origins (adjust in production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB connection details from environment variables
MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = os.getenv("DB_NAME")
COLLECTION_NAME = os.getenv("COLLECTION_NAME")

client = MongoClient(MONGO_URI)
db = client[DB_NAME]
collection = db[COLLECTION_NAME]

# Device IDs
DEVICE_IDS = {
    "dashboard": os.getenv("DEVICE_ID_DASH"),
    "new_dashboard": os.getenv("DEVICE_ID_NEW_DASH"),
    "dashboard_3": os.getenv("DEVICE_ID_NEW_DASH_3"),
    "dashboard_4": os.getenv("DEVICE_ID_NEW_DASH_4"),
    "dashboard_5": os.getenv("DEVICE_ID_NEW_DASH_5"),
}

def fetch_latest_data(device_id: str):
    """Fetch the latest data for a given device_id from MongoDB."""
    latest = collection.find_one({"device_id": device_id}, sort=[("timestamp", DESCENDING)])
    if not latest:
        return None

    # Safely extract sensor values with defaults
    data = latest.get("data", {})
    return {
        "temperature": int(data.get("temperature", 0)),
        "humidity": int(data.get("humidity", 0)),
        "co2": int(data.get("co2", 0)),
        "pm25": int(data.get("pm25", 0)),
        "pm10": int(data.get("pm10", 0)),
        "pm1": int(data.get("pm1", 0)),
        "co": int(data.get("co", 0)),
        "tvoc": float(data.get("formaldehyde", 0)),
        "aqi": int(data.get("aqi", 0)),
        "device_id": latest.get("device_id"),
        "timestamp": latest.get("timestamp"),
    }

def get_aqi_status_description(aqi: int):
    """Return AQI status and description based on AQI value."""
    if aqi <= 50:
        return "Good", "Air quality is considered satisfactory."
    elif aqi <= 100:
        return "Moderate", "Air quality is acceptable."
    elif aqi <= 150:
        return "Unhealthy for Sensitive Groups", "Some pollutants may affect sensitive individuals."
    elif aqi <= 200:
        return "Unhealthy", "Everyone may begin to experience health effects."
    elif aqi <= 300:
        return "Very Unhealthy", "Health alert: everyone may experience more serious effects."
    else:
        return "Hazardous", "Serious health effects. Avoid outdoor activity."

@app.get("/data/dashboard_3")
def get_dashboard_3_data():
    """Return enhanced data format for dashboard_3 frontend."""
    data = fetch_latest_data(DEVICE_IDS["dashboard_3"])
    if not data:
        return {"error": "No data found"}

    aqi_value = data["aqi"]
    aqi_status, aqi_description = get_aqi_status_description(aqi_value)

    metrics = [
        {
            "title": "Temp",  # Changed from "Temperature"
            "desc": "Ambient Temperature",
            "value": data["temperature"],
            "unit": "°C",
            "scale": "Normal" if 18 <= data["temperature"] <= 28 else "Elevated",
            "max": 50
        },
        {
            "title": "RH",  # Changed from "Humidity"
            "desc": "Relative Humidity",
            "value": data["humidity"],
            "unit": "%",
            "scale": "Optimal" if 30 <= data["humidity"] <= 60 else "Elevated",
            "max": 100
        },
        {
            "title": "CO₂",
            "desc": "Carbon Dioxide",
            "value": data["co2"],
            "unit": "ppm",
            "scale": "Safe" if data["co2"] <= 1000 else "Elevated",
            "max": 5000
        },
        {
            "title": "PM2.5",
            "desc": "Fine Particulate Matter",
            "value": data["pm25"],
            "unit": "µg/m³",
            "scale": "Good" if data["pm25"] <= 35 else "Moderate",
            "max": 500
        },
        {
            "title": "PM10",
            "desc": "Particulate Matter",
            "value": data["pm10"],
            "unit": "µg/m³",
            "scale": "Good" if data["pm10"] <= 50 else "Moderate",
            "max": 500
        },
        {
            "title": "PM1",
            "desc": "Ultrafine Particles",
            "value": data["pm1"],
            "unit": "µg/m³",
            "scale": "Good" if data["pm1"] <= 30 else "Moderate",
            "max": 500
        },
        {
            "title": "CO",
            "desc": "Carbon Monoxide",
            "value": data["co"],
            "unit": "ppm",
            "scale": "Safe" if data["co"] <= 9 else "Elevated",
            "max": 50
        },
        {
            "title": "CH₂O",
            "desc": "Formaldehyde / TVOC",
            "value": data["tvoc"],
            "unit": "ppm",
            "scale": "Safe" if data["tvoc"] <= 0.5 else "Elevated",
            "max": 5
        }
    ]

    return {
        "datetime": data["timestamp"].strftime("%Y-%m-%d %H:%M:%S") if isinstance(data["timestamp"], datetime) else str(data["timestamp"]),
        "aqi_value": aqi_value,
        "aqi_status": aqi_status,
        "aqi_description": aqi_description,
        "metrics": metrics
    }

# Basic raw endpoints for other dashboards
@app.get("/data/dashboard")
def get_dashboard_data():
    data = fetch_latest_data(DEVICE_IDS["dashboard"])
    if data:
        data["location"] = "Seminar Hall"
        return data
    return {"error": "No data found"}

@app.get("/data/new_dashboard")
def get_new_dashboard_data():
    data = fetch_latest_data(DEVICE_IDS["new_dashboard"])
    if data:
        data["location"] = "Exhibition Hall"
        return data
    return {"error": "No data found"}

@app.get("/data/dashboard_4")
def get_dashboard_4_data():
    data = fetch_latest_data(DEVICE_IDS["dashboard_4"])
    if data:
        data["location"] = "Exhibition Hall"
        return data
    return {"error": "No data found"}

@app.get("/data/dashboard_5")
def get_dashboard_5_data():
    data = fetch_latest_data(DEVICE_IDS["dashboard_5"])
    if data:
        data["location"] = "Exhibition Hall"
        return data
    return {"error": "No data found"}
