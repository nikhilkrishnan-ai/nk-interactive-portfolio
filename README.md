# 🛰️ GeoSense: Spatiotemporal Telemetry Anomaly Detection Engine

## 🌐 Live System & Interactive HUD

**Lead Geospatial Forensic Expert**: Nikhil Krishnan (NK)

**Interactive 3D Control Center**: [nikhilkrishnan.dev](https://nikhilkrishnan.dev/)

**Mobile App Simulator**: [Truth_detector](https://nikhilkrishnan.dev/truth_detector.html)

**Professional Profile**: LinkedIn — [Nikhil Krishnan ](https://www.linkedin.com/in/nikhil-krishnan-ai/)


## 🧠 Executive Summary

**GeoSense** is an autonomous geospatial diagnostic and anomaly interception framework designed to detect GNSS / GPS coordinate manipulation and hardware-level signal spoofing.

Typical security systems blindly trust location payloads. GeoSense bypasses this vulnerability by executing low-level spatiotemporal mathematical checks against real-world physical limits, protecting tracking data in real-time.

## 🚀 The Architecture: 2-Machine Production Sync

This project runs continuously on a dedicated, physical dual-node local infrastructure integrated with multi-cloud resources:

                     [ Azure Cloud Database ] 
                                |
                                | (Fetch 76,135 Telemetry Rows)
                                v
                     +-------------------------+
                     |   GEEKOM CLIENT NODE    | (Windows/WSL Client)
                     |   - pipeline.py Engine  |
                     +-------------------------+
                                |
                                | (Secure LAN Route via Port 5432)
                                v
                     +-------------------------+
                     |   UBUNTU SERVER NODE    | (Local IP: 192.168.10.4)
                     |   - Docker Containers   |
                     |   - PostGIS Database    | (project_data / geonode_data)
                     |   - Cockpit Management  | (Port 9090 Console)
                     +-------------------------+


## 🛰️ The Data Pipeline Flow:

**Edge Ingestion**: Telemetry data is simulated via Android hardware nodes (Termux) and posted securely to a serverless gateway.

**Google Cloud Run API**: Serves as a secure API Proxy that processes requests and routes AI queries to Gemini-2.5-Flash (Vertex AI Platform) without exposing client-side API keys.

**Queueing & Lakehouse**: Streams live packets through Azure Event Hubs and directly into Microsoft Fabric Eventstream Delta Tables.

**Local Database Pour**: The python sync pipeline pulls the raw 76,135 spatiotemporal rows and bulk-injects them directly into my local Dockerized PostgreSQL/PostGIS database!

## 🕵️‍♂️ Case #250-KM: Impossible Physics Isolation

During a real-world spatiotemporal audit, GeoSense isolated a critical GPS spoofing attempt on an active vehicle:

**The Anomaly**: The vehicle coordinate points made an instantaneous 250 kilometer jump from an Abu Dhabi residential street directly into the offshore Ruwais oil sector.

**The Math**: The temporal gap between the pings was under 0.8 seconds, indicating an impossible physical velocity of 1,474 km/h.

**The Isolation**: By calculating the Euclidean distance delta and passing it through a Moving Average Buffer, the system automatically identified the signal as "COMPROMISED" and quarantined the payload.

## ⚙️ Core Stack & Technologies

**Languages**: Python, SQL, JavaScript (ES6+), Shell Scripting

**Databases**: PostgreSQL / PostGIS, SQL Server, Azure SQL

**Cloud & DevOps**: Google Cloud Run, Vertex AI Studio, Azure Event Hubs, Microsoft Fabric, Docker Compose, GitHub Actions, Linux / Ubuntu Admin

**Frontend Graphics**: Three.js (3D WebGL), Tailwind CSS, Chart.js

## 🏆 Verified Credentials & Badges

🛡️ **Vertex AI Prompt Design** (Google Cloud)

🛡️ **Gemini Enterprise Agent Ready** (Google Cloud)

🛡️ **ChatGPT Prompt Engineering** (DeepLearning.AI)

🛡️ **Diploma in Warehouse Management** (Alison, Distinction)

🛡️ **100% English Proficiency Score** (EF Standardized Assessment)

## 💼 Let's Build Something Powerful!

I am currently __open for remote or full-time roles as an AI Content & Evaluation Specialist, React / Frontend Developer, or Data Analyst.__ 

Let's optimize your enterprise models together!

**📬 Secure Line**: +91-9048871505

**📧 Encrypted Mail**: nikhilkr51@gmail.com

**🌐 Interactive 3D HUD**: [nikhilkrishnan.dev](https://nikhilkrishnan.dev/)
