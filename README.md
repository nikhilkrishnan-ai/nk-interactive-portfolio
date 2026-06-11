# 🧠 GeoSense 3D Forensic Lab & Unified Gemini AI Pipeline

Welcome to the **GeoSense Forensic Portal**, an immersive 3D terminal environment driven by a centralized Google Cloud serverless proxy and a live IoT data streaming engine. 

## 🛠️ Unified System Architecture
* **Immersive Client Visuals:** Rendered fully in `Three.js` with retro-tactical CRT aesthetics and adaptive radar systems tracking spatiotemporal coordinates.
* **Serverless AI Proxy Router:** A unified `python_gps_webhook.py` microservice hosted on Google Cloud Run handling dual-channel paths:
    1.  **AI Copilot Route:** Proxies user prompts securely to the `Gemini v2.5` model using environment variables, avoiding client-side API exposure.
    2.  **Telemetry Route:** Captures live spatiotemporal diagnostic packets sent via HTTP from remote `Termux` devices.
* **Enterprise Data Pipeline:** Telemetry streams are processed on the fly and pushed directly through **Azure Event Hubs** into **Microsoft Fabric Eventstream** for downstream forensic analysis.

## 🚀 Key Technical Takeaways
* Zero client-side credential exposure via Cloud RAM environment management.
* Dynamic execution via Python Functions-Framework bound to target host protocols.
* Continuous integration lifecycle powered by custom GitHub Actions.
