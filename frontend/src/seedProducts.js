import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase-config";

const products = [
  { name: "Industrial Palladium Ingot", price: 1250000, category: "Precious Metals", description: "99.9% Pure Palladium for industrial manufacturing and catalytic applications.", imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" },
  { name: "Automotive Catalyst Grade A", price: 450000, category: "Automotive", description: "High-efficiency honeycomb catalyst structure for emission control systems.", imageUrl: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e" },
  { name: "Hydraulic Pump Unit", price: 850000, category: "Machinery", description: "Heavy-duty hydraulic power unit for construction and plant operations.", imageUrl: "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad" },
  { name: "Safety Sensor Array", price: 120000, category: "Electronics", description: "Laser-guided proximity sensors for warehouse automation and safety.", imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475" },
  { name: "Industrial Lubricant (20L)", price: 45000, category: "Supplies", description: "Synthetic high-temperature lubricant for heavy machinery maintenance.", imageUrl: "https://images.unsplash.com/photo-1611273233597-39031757ca60" },
  { name: "Carbon Filter Module", price: 280000, category: "Filtration", description: "Professional grade air filtration for chemical processing plants.", imageUrl: "https://images.unsplash.com/photo-1581092160562-40aa08e78837" }
];

export const seedDatabase = async () => {
  try {
    for (const product of products) {
      await addDoc(collection(db, "products"), product);
    }
    alert("Database Seeded Successfully! Refresh your Shop page.");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};