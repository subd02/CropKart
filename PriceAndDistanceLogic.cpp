// ==========================================
// BUSINESS LOGIC REQUESTED BY USER
// ==========================================

#include <iostream>
#include <vector>
#include <string>
#include <cmath>
#include <algorithm>

using namespace std;

// 1. Weather-Impact Algorithm for Aaj Ka Bhav
class CropPricing {
public:
    string cropName;
    double currentPrice;

    CropPricing(string name, double price) : cropName(name), currentPrice(price) {}

    // Calculates predicted price based on weather parameters
    double calculatePredictedPrice(double rainfallMm, double tempCelsius, bool isDroughtWarning) {
        double impactFactor = 1.0;

        if (isDroughtWarning) {
            impactFactor += 0.15; 
        } else if (rainfallMm > 150) {
            impactFactor += 0.05;
        } else if (rainfallMm > 40 && rainfallMm <= 150) {
            impactFactor -= 0.05;
        }

        if (tempCelsius > 40.0 || tempCelsius < 10.0) {
            impactFactor += 0.08;
        }

        return currentPrice * impactFactor;
    }
};

// 2. Distance Sorting Logic for Thanda Ghar
class StorageUnit {
public:
    string name;
    double latitude;
    double longitude;

    StorageUnit(string n, double lat, double lon) : name(n), latitude(lat), longitude(lon) {}
};

// Haversine formula implementation
double haversineCalculateDistance(double lat1, double lon1, double lat2, double lon2) {
    const double R = 6371.0; // Radius of the earth in km
    const double TO_RAD = M_PI / 180.0;
    
    double latDistance = (lat2 - lat1) * TO_RAD;
    double lonDistance = (lon2 - lon1) * TO_RAD;
    
    double a = sin(latDistance / 2) * sin(latDistance / 2) + 
               cos(lat1 * TO_RAD) * cos(lat2 * TO_RAD) * 
               sin(lonDistance / 2) * sin(lonDistance / 2);
               
    double c = 2 * atan2(sqrt(a), sqrt(1 - a));
    return R * c;
}

// Sorts list of Thanda Ghar units
void sortStorageLocators(double farmerLat, double farmerLon, vector<StorageUnit>& units) {
    sort(units.begin(), units.end(), [farmerLat, farmerLon](const StorageUnit& a, const StorageUnit& b) {
        double distA = haversineCalculateDistance(farmerLat, farmerLon, a.latitude, a.longitude);
        double distB = haversineCalculateDistance(farmerLat, farmerLon, b.latitude, b.longitude);
        return distA < distB;
    });
}

int main() {
    // Example Usage
    CropPricing wheat("Wheat", 2200.0);
    double predicted = wheat.calculatePredictedPrice(160.0, 35.0, false);
    cout << "Predicted Wheat Price: " << predicted << endl;

    vector<StorageUnit> storages = {
        StorageUnit("Kisan Storage", 28.7041, 77.1025),
        StorageUnit("AgriCold", 28.5355, 77.3910)
    };
    
    // Sort and output nearby units
    sortStorageLocators(28.6139, 77.2090, storages);
    for (const auto& s : storages) {
        cout << "Storage: " << s.name << endl;
    }

    return 0;
}
