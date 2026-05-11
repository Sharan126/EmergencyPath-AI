export const getAmbulanceLive = (req, res) => {
  try {
    res.json({
      status: "Live",
      speed: "62 km/h",
      vehicleNumber: "KA 01 AB 1234",
      distanceRemaining: "6.2 km"
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch live ambulance data" });
  }
};
