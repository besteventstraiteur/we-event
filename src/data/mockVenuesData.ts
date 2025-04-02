
// Mock data for partner venues
export const partnerVenues = [
  {
    id: "1",
    name: "Château de Versailles",
    partner: "Châteaux Prestige",
    location: "Versailles, Île-de-France",
    capacity: 300,
    price: "12 000€ - 18 000€",
    coordinates: {
      lat: 48.8049,
      lng: 2.1204
    },
    imageUrl: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800&auto=format&fit=crop",
    floorPlan: JSON.stringify({
      objects: [
        {
          type: 'rect',
          left: 50,
          top: 50,
          width: 700,
          height: 500,
          fill: 'white',
          stroke: '#ccc',
          strokeWidth: 2
        }
      ],
      background: "#f5f5f5"
    })
  },
  {
    id: "2",
    name: "Domaine des Roses",
    partner: "Jardins & Domaines",
    location: "Cannes, PACA",
    capacity: 150,
    price: "8 500€ - 12 000€",
    coordinates: {
      lat: 43.5513,
      lng: 7.0128
    },
    imageUrl: "https://images.unsplash.com/photo-1517176642928-dfc2da661b3f?w=800&auto=format&fit=crop",
    floorPlan: JSON.stringify({
      objects: [
        {
          type: 'rect',
          left: 50,
          top: 50,
          width: 700,
          height: 400,
          fill: 'white',
          stroke: '#ccc',
          strokeWidth: 2
        }
      ],
      background: "#f5f5f5"
    })
  },
  {
    id: "3",
    name: "Le Grand Hôtel",
    partner: "Prestige Hotels Group",
    location: "Paris, Île-de-France",
    capacity: 200,
    price: "15 000€ - 25 000€",
    coordinates: {
      lat: 48.8697,
      lng: 2.3331
    },
    imageUrl: "https://images.unsplash.com/photo-1593053272490-e0ed6d6a42c5?w=800&auto=format&fit=crop",
    floorPlan: JSON.stringify({
      objects: [
        {
          type: 'rect',
          left: 50,
          top: 50,
          width: 600,
          height: 450,
          fill: 'white',
          stroke: '#ccc',
          strokeWidth: 2
        }
      ],
      background: "#f5f5f5"
    })
  },
  {
    id: "4",
    name: "Villa Méditerranée",
    partner: "RivieraEvents",
    location: "Nice, PACA",
    capacity: 120,
    price: "7 500€ - 10 000€",
    coordinates: {
      lat: 43.7034,
      lng: 7.2663
    },
    imageUrl: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&auto=format&fit=crop",
    floorPlan: JSON.stringify({
      objects: [
        {
          type: 'rect',
          left: 50,
          top: 50,
          width: 500,
          height: 400,
          fill: 'white',
          stroke: '#ccc',
          strokeWidth: 2
        }
      ],
      background: "#f5f5f5"
    })
  },
];
