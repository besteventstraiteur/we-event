
// Mock data for partner venues
export const partnerVenues = [
  {
    id: "1",
    name: "Château de Versailles",
    partner: "Châteaux Prestige",
    location: "Versailles, Île-de-France",
    capacity: 300,
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
