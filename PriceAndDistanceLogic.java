// ==========================================
// BUSINESS LOGIC REQUESTED BY USER
// ==========================================

import java.util.*;

public class PriceAndDistanceLogic {

    // 1. Weather-Impact Algorithm for Smart Market
    public static class CropPricing {
        String cropName;
        double currentPrice;
        
        public CropPricing(String name, double price) {
            this.cropName = name;
            this.currentPrice = price;
        }

        /**
         * Calculates predicted price based on weather parameters.
         * @param rainfallMm Expected rainfall in mm (e.g. 50.0)
         * @param tempCelsius Expected temperature in Celsius
         * @param isDroughtWarning boolean
         * @return predicted price per Quintal
         */
        public double calculatePredictedPrice(double rainfallMm, double tempCelsius, boolean isDroughtWarning) {
            double impactFactor = 1.0;

            // Simple Logic for demonstration
            if (isDroughtWarning) {
                // Drought increases prices significantly due to scarcity
                impactFactor += 0.15; 
            } else if (rainfallMm > 150) {
                // Heavy rains might damage crops, increasing prices
                impactFactor += 0.05;
            } else if (rainfallMm > 40 && rainfallMm <= 150) {
                // Optimal rain provides good harvest, slight decrease in price
                impactFactor -= 0.05;
            }

            // Extreme temperatures affect yield
            if (tempCelsius > 40.0 || tempCelsius < 10.0) {
                impactFactor += 0.08;
            }

            return this.currentPrice * impactFactor;
        }
    }

    // 2. Distance Sorting Logic for Storage Locator
    public static class StorageUnit {
        String name;
        double latitude;
        double longitude;

        public StorageUnit(String name, double lat, double lon) {
            this.name = name;
            this.latitude = lat;
            this.longitude = lon;
        }
    }

    /**
     * Haversine formula to calculate the distance between two points on the earth
     */
    public static double haversineCalculateDistance(double lat1, double lon1, double lat2, double lon2) {
        final int R = 6371; // Radious of the earth in km
        double latDistance = Math.toRadians(lat2 - lat1);
        double lonDistance = Math.toRadians(lon2 - lon1);
        
        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2) + 
                   Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2)) * 
                   Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
                   
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    /**
     * Sorts list of Cold Storage units based on distance from the Farmer
     */
    public static List<StorageUnit> getSortedStorageLocators(double farmerLat, double farmerLon, List<StorageUnit> storageUnits) {
        storageUnits.sort(Comparator.comparingDouble(
            unit -> haversineCalculateDistance(farmerLat, farmerLon, unit.latitude, unit.longitude)
        ));
        return storageUnits;
    }

    public static void main(String[] args) {
        // Example Usage
        CropPricing wheat = new CropPricing("Wheat", 2200.0);
        double predicted = wheat.calculatePredictedPrice(160, 35.0, false);
        System.out.println("Predicted Wheat Price: " + predicted);

        List<StorageUnit> storages = new ArrayList<>();
        storages.add(new StorageUnit("Kisan Storage", 28.7041, 77.1025)); 
        storages.add(new StorageUnit("AgriCold", 28.5355, 77.3910));
        
        // Output nearest storage locations
        List<StorageUnit> sorted = getSortedStorageLocators(28.6139, 77.2090, storages);
        for(StorageUnit s : sorted) {
            System.out.println("Storage: " + s.name);
        }
    }
}
