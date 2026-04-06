const API_BASE = 'http://localhost:8080/api/v1';

export const api = {
  // Medicine identification via image upload
  identifyByImage: async (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);
    const res = await fetch(`${API_BASE}/medicine/identify`, {
      method: 'POST',
      body: formData,
    });
    if (!res.ok) throw new Error('Failed to identify medicine from image');
    return res.json();
  },

  // Medicine identification via name
  identifyByName: async (name) => {
    const res = await fetch(`${API_BASE}/medicine/identify/manual?name=${encodeURIComponent(name)}`, {
      method: 'POST',
    });
    if (!res.ok) throw new Error('Failed to identify medicine');
    return res.json();
  },

  // Get prices for a medicine
  getPrices: async (medicineId) => {
    const res = await fetch(`${API_BASE}/prices/${medicineId}`);
    if (!res.ok) throw new Error('Failed to fetch prices');
    return res.json();
  },

  // Get generic alternatives
  getAlternatives: async (medicineId) => {
    const res = await fetch(`${API_BASE}/generics/${medicineId}`);
    if (!res.ok) throw new Error('Failed to fetch alternatives');
    return res.json();
  },

  // Search medicines
  searchMedicines: async (query) => {
    const res = await fetch(`${API_BASE}/medicine/search?q=${encodeURIComponent(query)}`);
    if (!res.ok) throw new Error('Failed to search');
    return res.json();
  },
};
