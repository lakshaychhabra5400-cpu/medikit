export const medicines = [
  {
    id: "amlokind-at",
    name: "Amlokind - AT Tablet",
    category: "Calcium & Minerals",
    price: 49,
    dosage: "1 Tablet - After Food",
    usefulness: "Supports prescribed blood-pressure management.",
    description:
      "Amlodipine and Atenolol tablet used as prescribed by your doctor.",
    image:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "vitamin-d3",
    name: "Vitamin D3",
    category: "Vitamins & Supplements",
    price: 189,
    dosage: "1 Capsule - Daily",
    usefulness: "Helps maintain healthy bones, teeth, and immune function.",
    description: "Daily vitamin D support for bones and immunity.",
    image:
      "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "omega-3",
    name: "Omega 3",
    category: "Protein Supplements",
    price: 299,
    dosage: "1 Softgel - Daily",
    usefulness: "Supports heart, brain, and joint health.",
    description: "Fish oil supplement to support heart and brain health.",
    image:
      "https://images.unsplash.com/photo-1550572017-4fcdbb59cc32?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "multivitamin",
    name: "Multivitamin Tablets",
    category: "Vitamins & Supplements",
    price: 210,
    dosage: "1 Tablet - Daily",
    usefulness: "Supports overall health, energy, and immunity.",
    description:
      "Combination of essential vitamins and minerals for daily wellness.",
    image:
      "https://imgs.search.brave.com/nSH-UHUyLxVrobdAziW4CB2twvaJALyYQQk7vVMvICU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9yZXMu/Y2xvdWRpbmFyeS5j/b20vbWluZGJvZHln/cmVlbi9pbWFnZS9m/ZXRjaC9xX2F1dG8s/Zl9hdXRvLGZsX2xv/c3N5LHdfNjAwLGhf/NjAwLGRwcl8yLjAs/Y19maWxsLGdfY2Vu/dGVyL2h0dHBzOi8v/c2hvcC5taW5kYm9k/eWdyZWVuLmNvbS9j/ZG4vc2hvcC9maWxl/cy9nYWxsZXJ5X3Vs/dGltYXRlX211bHRp/dml0YW1pbl90YW5f/aGVyby5wbmc",
  },
  {
    id: "azithromycin",
    name: "Azithromycin",
    category: "Antibiotics",
    price: 120,
    dosage: "1 Tablet - As Prescribed",
    usefulness:
      "Treats bacterial infections like respiratory tract and skin infections.",
    description: "Macrolide antibiotic used for various bacterial infections.",
    image:
      "https://imgs.search.brave.com/VDb_SRgj5PK_F4_uGJS2pRm3Ko_CUmvfYGqh5QFvzyw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy8x/LzE1L1ppdGhyb21h/eF8oQXppdGhyb215/Y2luKV90YWJsZXRz/LmpwZw",
  },
  {
    id: "iron-folic",
    name: "Iron + Folic Acid",
    category: "Calcium & Minerals",
    price: 75,
    dosage: "1 Tablet - Daily",
    usefulness: "Helps prevent anemia and supports red blood cell production.",
    description: "Supplement for iron deficiency and pregnancy support.",
    image:
      "https://imgs.search.brave.com/4NrIXDBkZH1eol50PDgoWSr1fC6xkv5QUVUyZIGmNsE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4w/MS5waGFybWVhc3ku/aW4vZGFtL3Byb2R1/Y3RzX290Yy9NMTYy/Mzgvc2hlbmVlZC1m/b2xpYy1hY2lkLWly/b24tc3VwcGxlbWVu/dHMtZm9yLXN1cHBv/cnRzLXByZWduYW5j/eS1pcm9uLXByb2R1/Y3Rpb24tNjAtdGFi/bGV0cy0yLTE3Njk3/ODA1ODcuanBnP2Rp/bT00ODB4NDgwJnE9/NzU",
  },
];

export const categories = [
  "Multivitamins, Multiminerals",
  "Calcium & Minerals",
  "Vitamins A to Z",
  "Protine Supplements",
  "Supplement",
  "Mineral Supplements",
];

export const initialReminders = [
  {
    id: 1,
    medicine: "Amlokind AT",
    time: "09:00",
    date: "Today",
    complete: false,
  },
  {
    id: 2,
    medicine: "Alfa Alfa",
    time: "09:00",
    date: "Today",
    complete: true,
  },
  {
    id: 3,
    medicine: "Vitamin D3",
    time: "20:00",
    date: "Tomorrow",
    complete: false,
  },
];
