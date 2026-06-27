import math
from datetime import datetime

class GeoSenseEngine:
    """
    GeoSense Forensic Engine v1.0
    Developed by: Nikhil Krishnan (NK)
    Role: Lead Geospatial Forensic Intelligence Expert
    """

    def __init__(self, speed_threshold=1000):
        # Speed threshold in km/h (e.g., 1000km/h is impossible for land vehicles)
        self.speed_threshold = speed_threshold

    def calculate_haversine_distance(self, lat1, lon1, lat2, lon2):
        """
        Calculates the great-circle distance between two points on the Earth.
        """
        R = 6371  # Earth radius in kilometers
        
        phi1, phi2 = math.radians(lat1), math.radians(lat2)
        dphi = math.radians(lat2 - lat1)
        dlambda = math.radians(lon2 - lon1)
        
        a = math.sin(dphi / 2)**2 + \
            math.cos(phi1) * math.cos(phi2) * math.sin(dlambda / 2)**2
        
        c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
        return R * c

    def analyze_trajectory(self, point_a, point_b):
        """
        Analyzes two consecutive GPS points for spoofing anomalies.
        point = {'lat': float, 'lon': float, 'timestamp': 'YYYY-MM-DD HH:MM:SS'}
        """
        dist = self.calculate_haversine_distance(
            point_a['lat'], point_a['lon'], 
            point_b['lat'], point_b['lon']
        )
        
        fmt = '%Y-%m-%d %H:%M:%S'
        try:
            t1 = datetime.strptime(point_a['timestamp'], fmt)
            t2 = datetime.strptime(point_b['timestamp'], fmt)
        except ValueError:
            return {"status": "ERROR", "reason": "Invalid timestamp format"}
        
        time_diff = (t2 - t1).total_seconds() / 3600  # converted to hours
        
        if time_diff == 0:
            if dist > 0:
                return {"status": "ANOMALY", "reason": "Zero-time displacement (Teleportation)"}
            return {"status": "STATIC", "reason": "No movement detected"}
            
        velocity = dist / time_diff
        is_spoofed = velocity > self.speed_threshold
        
        return {
            "distance_km": round(dist, 2),
            "calculated_velocity_kmh": round(velocity, 2),
            "status": "SPOOFED" if is_spoofed else "LEGITIMATE",
            "threat_level": "CRITICAL" if dist > 200 and is_spoofed else "NORMAL"
        }

# --- CASE STUDY: RUWAIS 250KM JUMP ANALYSIS ---
if __name__ == "__main__":
    engine = GeoSenseEngine()
    
    # Starting Position: Abu Dhabi Home
    origin = {'lat': 24.4539, 'lon': 54.3773, 'timestamp': '2026-04-07 03:19:00'}
    
    # Reported Position: Ruwais Offshore (Spoofed)
    anomaly = {'lat': 24.1100, 'lon': 52.7300, 'timestamp': '2026-04-07 03:19:01'}
    
    report = engine.analyze_trajectory(origin, anomaly)
    
    print(f"--- GEOSENSE FORENSIC ANALYSIS ENGINE ---")
    print(f"Lead Expert: Nikhil Krishnan NK")
    print(f"Investigation Status: {report['status']}")
    print(f"Jump Magnitude: {report.get('distance_km', 'N/A')} KM")
    print(f"Anomalous Velocity: {report.get('calculated_velocity_kmh', 'N/A')} KM/H")
    print(f"System Recommendation: {report.get('threat_level', 'CHECK')}")
