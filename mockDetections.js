// Mock detection data for AI Detection page and Live Monitor
export const wasteTypes = ['Needle', 'Syringe', 'Gauze', 'Bottle', 'Broken Glass', 'Glove', 'IV Bag', 'Lancet'];
export const locations = ['ICU Ward', 'Emergency Room', 'Surgery Suite A', 'Surgery Suite B', 'Corridor 3B', 'Lab 2', 'Pharmacy', 'Pediatrics', 'Oncology Ward', 'Storage Room'];
export const collectionMethods = ['Robotic Arm', 'Suction', 'Manual Override', 'Magnetic Pickup'];
export const statuses = ['Collected', 'Pending', 'In Progress', 'Flagged'];

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateTimestamp(minutesAgo) {
  const d = new Date();
  d.setMinutes(d.getMinutes() - minutesAgo);
  return d.toISOString();
}

export const initialDetections = [
  { id: 1, object: 'Needle', confidence: 97.4, method: 'Robotic Arm', location: 'ICU Ward', timestamp: generateTimestamp(2), status: 'Collected', risk: 'high' },
  { id: 2, object: 'Syringe', confidence: 94.1, method: 'Robotic Arm', location: 'Emergency Room', timestamp: generateTimestamp(5), status: 'Collected', risk: 'high' },
  { id: 3, object: 'Gauze', confidence: 88.7, method: 'Suction', location: 'Surgery Suite A', timestamp: generateTimestamp(9), status: 'Collected', risk: 'medium' },
  { id: 4, object: 'Bottle', confidence: 76.2, method: 'Robotic Arm', location: 'Lab 2', timestamp: generateTimestamp(14), status: 'Collected', risk: 'low' },
  { id: 5, object: 'Broken Glass', confidence: 91.8, method: 'Magnetic Pickup', location: 'Corridor 3B', timestamp: generateTimestamp(18), status: 'Collected', risk: 'high' },
  { id: 6, object: 'Needle', confidence: 98.2, method: 'Robotic Arm', location: 'Oncology Ward', timestamp: generateTimestamp(23), status: 'Collected', risk: 'high' },
  { id: 7, object: 'IV Bag', confidence: 82.5, method: 'Suction', location: 'Pediatrics', timestamp: generateTimestamp(28), status: 'Collected', risk: 'medium' },
  { id: 8, object: 'Glove', confidence: 73.9, method: 'Robotic Arm', location: 'Pharmacy', timestamp: generateTimestamp(33), status: 'Pending', risk: 'low' },
  { id: 9, object: 'Lancet', confidence: 95.6, method: 'Robotic Arm', location: 'ICU Ward', timestamp: generateTimestamp(40), status: 'Collected', risk: 'high' },
  { id: 10, object: 'Syringe', confidence: 89.3, method: 'Robotic Arm', location: 'Surgery Suite B', timestamp: generateTimestamp(47), status: 'Collected', risk: 'high' },
  { id: 11, object: 'Gauze', confidence: 71.4, method: 'Suction', location: 'Storage Room', timestamp: generateTimestamp(52), status: 'Pending', risk: 'low' },
  { id: 12, object: 'Broken Glass', confidence: 93.7, method: 'Magnetic Pickup', location: 'Emergency Room', timestamp: generateTimestamp(58), status: 'Collected', risk: 'high' },
  { id: 13, object: 'Needle', confidence: 96.1, method: 'Robotic Arm', location: 'ICU Ward', timestamp: generateTimestamp(65), status: 'Collected', risk: 'high' },
  { id: 14, object: 'IV Bag', confidence: 79.8, method: 'Suction', location: 'Oncology Ward', timestamp: generateTimestamp(72), status: 'Collected', risk: 'medium' },
  { id: 15, object: 'Bottle', confidence: 68.3, method: 'Robotic Arm', location: 'Lab 2', timestamp: generateTimestamp(80), status: 'Flagged', risk: 'low' },
  { id: 16, object: 'Lancet', confidence: 92.4, method: 'Robotic Arm', location: 'Pediatrics', timestamp: generateTimestamp(88), status: 'Collected', risk: 'high' },
  { id: 17, object: 'Needle', confidence: 97.9, method: 'Robotic Arm', location: 'Surgery Suite A', timestamp: generateTimestamp(95), status: 'Collected', risk: 'high' },
  { id: 18, object: 'Glove', confidence: 66.1, method: 'Suction', location: 'Pharmacy', timestamp: generateTimestamp(103), status: 'Flagged', risk: 'low' },
  { id: 19, object: 'Syringe', confidence: 90.0, method: 'Robotic Arm', location: 'ICU Ward', timestamp: generateTimestamp(110), status: 'Collected', risk: 'high' },
  { id: 20, object: 'Broken Glass', confidence: 88.5, method: 'Magnetic Pickup', location: 'Corridor 3B', timestamp: generateTimestamp(118), status: 'Collected', risk: 'high' },
];

export function generateNewDetection(id) {
  const waste = randomFrom(wasteTypes);
  const conf = (randomBetween(650, 990) / 10).toFixed(1);
  return {
    id,
    object: waste,
    confidence: parseFloat(conf),
    method: randomFrom(collectionMethods),
    location: randomFrom(locations),
    timestamp: new Date().toISOString(),
    status: Math.random() > 0.2 ? 'Collected' : 'In Progress',
    risk: conf >= 90 ? 'high' : conf >= 75 ? 'medium' : 'low',
  };
}

export const activityEvents = [
  { icon: 'needle', color: 'red', text: 'Needle detected in ICU Ward', action: 'Detected' },
  { icon: 'check', color: 'green', text: 'Needle collected successfully', action: 'Collected' },
  { icon: 'spray', color: 'blue', text: 'Area sanitized — ICU Ward Zone 3', action: 'Sanitized' },
  { icon: 'mission', color: 'blue', text: 'Mission resumed after sanitization', action: 'Resumed' },
  { icon: 'syringe', color: 'orange', text: 'Syringe detected in Emergency Room', action: 'Detected' },
  { icon: 'check', color: 'green', text: 'Syringe collected via Robotic Arm', action: 'Collected' },
  { icon: 'glass', color: 'red', text: 'Broken glass detected in Corridor 3B', action: 'Detected' },
  { icon: 'check', color: 'green', text: 'Glass collected via Magnetic Pickup', action: 'Collected' },
  { icon: 'spray', color: 'blue', text: 'Area sanitized — Corridor 3B', action: 'Sanitized' },
  { icon: 'battery', color: 'orange', text: 'Battery level at 72% — continuing mission', action: 'Alert' },
  { icon: 'gauze', color: 'orange', text: 'Gauze detected in Surgery Suite A', action: 'Detected' },
  { icon: 'check', color: 'green', text: 'Gauze collected via Suction system', action: 'Collected' },
  { icon: 'waypoint', color: 'blue', text: 'Waypoint 4 of 8 reached — Oncology Ward', action: 'Navigation' },
  { icon: 'needle', color: 'red', text: 'Lancet detected in Pediatrics', action: 'Detected' },
  { icon: 'check', color: 'green', text: 'Lancet secured in containment unit', action: 'Collected' },
];

export const cameraDetections = [
  { object: 'Needle', confidence: 97.4, bbox: { x: 35, y: 30, w: 15, h: 6 }, color: '#EF4444' },
  { object: 'Syringe', confidence: 94.1, bbox: { x: 55, y: 50, w: 20, h: 8 }, color: '#F59E0B' },
  { object: 'Gauze', confidence: 88.7, bbox: { x: 20, y: 60, w: 25, h: 15 }, color: '#F59E0B' },
  { object: 'Broken Glass', confidence: 91.8, bbox: { x: 65, y: 25, w: 18, h: 12 }, color: '#EF4444' },
  { object: 'IV Bag', confidence: 82.5, bbox: { x: 40, y: 55, w: 12, h: 22 }, color: '#3B82F6' },
  { object: 'Lancet', confidence: 95.6, bbox: { x: 25, y: 35, w: 10, h: 5 }, color: '#EF4444' },
  { object: 'Glove', confidence: 73.9, bbox: { x: 60, y: 60, w: 22, h: 14 }, color: '#10B981' },
  { object: 'Bottle', confidence: 76.2, bbox: { x: 45, y: 20, w: 10, h: 20 }, color: '#10B981' },
];
