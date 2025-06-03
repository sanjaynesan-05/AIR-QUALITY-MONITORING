import streamlit as st
import datetime

# Page config
st.set_page_config(page_title="Indoor Air Quality Dashboard", layout="wide")

# Sample data
now = datetime.datetime.now().strftime("%A, %b %d, %Y, %I:%M %p")
aqi_value = 25
aqi_status = "Good"
aqi_description = "The current air quality is good and poses little or no risk."

metrics = [
    {"title": "PM1", "desc": "Particulate Matter ≤ 1µm", "value": 12, "unit": "µg/m³", "scale": "Low", "max": 100},
    {"title": "PM2.5", "desc": "Particulate Matter ≤ 2.5µm", "value": 28, "unit": "µg/m³", "scale": "Moderate", "max": 100},
    {"title": "PM10", "desc": "Particulate Matter ≤ 10µm", "value": 35, "unit": "µg/m³", "scale": "Low", "max": 100},
    {"title": "Temperature", "desc": "Indoor Temperature", "value": 23.5, "unit": "°C", "scale": "Normal", "max": 50},
    {"title": "CO₂", "desc": "Carbon Dioxide", "value": 850, "unit": "ppm", "scale": "Elevated", "max": 2000},
    {"title": "CO", "desc": "Carbon Monoxide", "value": 0.8, "unit": "ppm", "scale": "Safe", "max": 10},
    {"title": "CH₂O", "desc": "Formaldehyde", "value": 15, "unit": "ppb", "scale": "Low", "max": 100},
    {"title": "RH", "desc": "Relative Humidity", "value": 45, "unit": "%", "scale": "Optimal", "max": 100},
]

# Custom CSS
st.markdown("""
<style>
.navbar {
    background-color: #4f46e5;
    color: white;
    padding: 0.8rem 2rem;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.metric-container {
    background: white;
    color: black;
    padding: 1rem;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    margin-bottom: 1rem;
}
.metric-title {
    font-weight: 600;
    font-size: 1.1rem;
    color: black;
}
.metric-desc {
    font-size: 0.9rem;
    color: black;
}
.metric-value {
    font-size: 1.5rem;
    font-weight: bold;
    color: black;
}
.status-tag {
    font-size: 0.8rem;
    padding: 0.2rem 0.5rem;
    border-radius: 0.5rem;
    font-weight: 600;
    color: black;
}
.status-Good, .status-Low, .status-Safe, .status-Normal, .status-Optimal {
    background: #d1fae5;
    color: #065f46;
}
.status-Moderate, .status-Elevated {
    background: #fef3c7;
    color: #92400e;
}
.progress-bar {
    background-color: #eee;
    border-radius: 8px;
    overflow: hidden;
    height: 8px;
}
</style>
""", unsafe_allow_html=True)

# NAVIGATION BAR
st.markdown(f"""
<div class="navbar">
    <div><h3 style='margin: 0;'>☁️ Indoor Air Quality Dashboard</h3></div>
    <div style="display: flex; gap: 2rem; align-items: center;">
        <div>📍 <b>Office Location</b></div>
        <div>🕒 <b>{now}</b></div>
    </div>
</div>
""", unsafe_allow_html=True)
st.markdown("")

# MAIN AQI DISPLAY
left_col, right_col = st.columns([1, 2])
with left_col:
    st.markdown("""
    <div style='text-align:center'>
        <div style="background: white; padding: 2rem; border-radius: 15px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <div style="font-size: 2rem; font-weight: bold;color:black;">{aqi}</div>
            <div style="font-size: 1.2rem; color: #000000;">AQI</div>
            <div class="status-tag status-{status}">{status}</div>
        </div>
    </div>
    """.format(aqi=aqi_value, status=aqi_status), unsafe_allow_html=True)

with right_col:
    st.markdown(f"""
    <div class="metric-container">
        <div style="font-weight: bold; font-size: 1.3rem;">Air Quality Index</div>
        <p style="margin: 0.5rem 0;margin:17px;">{aqi_description}</p>
        <div class="progress-bar">
            <div style="width: {(aqi_value/500)*100}%; background-color: green; height: 8px;padding-top:15px;"></div>
        </div>
        <div style="display:flex; justify-content:space-between; font-size: 0.8rem; margin-top: 0.3rem; padding-top:15px;">
            <span>0</span><span>50</span><span>100</span><span>150</span><span>200</span><span>300</span><span>500</span>
        </div>
    </div>
    """, unsafe_allow_html=True)

st.markdown("")

# METRIC GRID
metric_cols = st.columns(4)
for i, metric in enumerate(metrics):
    with metric_cols[i % 4]:
        st.markdown(f"""
        <div class="metric-container">
            <div style="display:flex; justify-content: space-between; align-items: center;">
                <div>
                    <div class="metric-title">{metric['title']}</div>
                    <div class="metric-desc">{metric['desc']}</div>
                </div>
                <div class="status-tag status-{metric['scale']}">{metric['scale']}</div>
            </div>
            <div class="metric-value">{metric['value']} {metric['unit']}</div>
            <div class="progress-bar">
                <div style="width: {(metric['value']/metric['max'])*100}%; background-color: #4f46e5; height: 8px;"></div>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 0.75rem; margin-top: 0.2rem;">
                <span>0</span><span>{metric['max']}</span>
            </div>
        </div>
        """, unsafe_allow_html=True)