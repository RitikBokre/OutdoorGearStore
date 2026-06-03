export const productEnhancements = {
  brand: "Ridge & Trail",
  salePrice: 74.95,
  compareAtPrice: 109.95,
  delivery: {
    available: "Order in the next 6 hours for delivery by Monday",
  },
  colors: [
    {
      id: "moss",
      name: "Moss",
      hex: "#3f5a45",
      gallery: [
        {
          src: "https://images.unsplash.com/photo-1548242404-0c774aee869f?auto=format&fit=crop&w=1400&q=85",
          alt: "an alpine trail",
        },
        {
          src: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1400&q=85",
          alt: "Hiker wearing outerwear near mountain terrain",
        },
        {
          src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=85",
          alt: "Weatherproof jacket packed for a backcountry hike",
        },
      ],
    },
    {
      id: "ember",
      name: "Ember",
      hex: "#b2482d",
      gallery: [
        {
          src: "https://images.unsplash.com/photo-1501554728187-ce583db33af7?auto=format&fit=crop&w=1400&q=85",
          alt: "Warm toned hiking shell on rugged ground",
        },
        {
          src: "https://images.unsplash.com/photo-1476611338391-6f395a0ebc7b?auto=format&fit=crop&w=1400&q=85",
          alt: "Outdoor shell beside climbing and hiking gear",
        },
        {
          src: "https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=1400&q=85",
          alt: "Mountain kit arranged before a trail day",
        },
      ],
    },
    {
      id: "graphite",
      name: "Graphite",
      hex: "#343a40",
      gallery: [
        {
          src: "https://images.unsplash.com/photo-1548345233-4557b8809829?auto=format&fit=crop&w=1400&q=85",
          alt: "Cold mountain setting with waterfall",
        },
        {
          src: "https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=1400&q=85",
          alt: "Climber's kit with durable weather protection",
        },
        {
          src: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1400&q=85",
          alt: "Forest path suited for wet weather hiking",
        },
      ],
    },
  ],
  variants: [
    { colorId: "moss", size: "XS", stock: 0 },
    { colorId: "moss", size: "S", stock: 5 },
    { colorId: "moss", size: "M", stock: 2 },
    { colorId: "moss", size: "L", stock: 8 },
    { colorId: "moss", size: "XL", stock: 0 },
    { colorId: "ember", size: "XS", stock: 3 },
    { colorId: "ember", size: "S", stock: 2 },
    { colorId: "ember", size: "M", stock: 0 },
    { colorId: "ember", size: "L", stock: 4 },
    { colorId: "ember", size: "XL", stock: 1 },
    { colorId: "graphite", size: "XS", stock: 0 },
    { colorId: "graphite", size: "S", stock: 6 },
    { colorId: "graphite", size: "M", stock: 9 },
    { colorId: "graphite", size: "L", stock: 2 },
    { colorId: "graphite", size: "XL", stock: 0 },
  ],
  sizes: ["XS", "S", "M", "L", "XL"],
  specs: {
    "Shell fabric": "Recycled ripstop polyester",
    Waterproofing: "DWR finish with sealed critical seams",
    Weight: "590 g",
    Fit: "Regular, hip length",
    Pockets: "Two hand pockets, one internal zip pocket",
    Care: "Machine wash cold, tumble dry low",
  },
  reviews: [
    {
      author: "Maya K.",
      rating: 5,
      title: "Dry without feeling bulky",
      body: "Handled a windy, wet ridge day and still packed down neatly for the hike out.",
    },
    {
      author: "Jon P.",
      rating: 4,
      title: "Great shoulder mobility",
      body: "The cut works well under a pack. I sized up for layering and it was the right call.",
    },
    {
      author: "Nisha R.",
      rating: 5,
      title: "Feels premium",
      body: "The hardware and fabric are better than the price suggests, especially on sale.",
    },
  ],
};
