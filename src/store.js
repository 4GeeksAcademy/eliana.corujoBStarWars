export const initialStore = () => {
  return {
    people: [],
    planets: [],
    vehicles: [],
    favorites: [] // Aquí guardaremos los objetos completos que el usuario marque como favoritos
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'load_people':
      return {
        ...store,
        people: action.payload
      };

    case 'load_planets':
      return {
        ...store,
        planets: action.payload
      };

    case 'load_vehicles':
      return {
        ...store,
        vehicles: action.payload
      };

    case 'add_favorite':
      // Evitamos duplicados: si ya existe, devolvemos el estado igual
      const exists = store.favorites.find(item => item.uid === action.payload.uid);
      if (exists) return store;

      return {
        ...store,
        favorites: [...store.favorites, action.payload]
      };

    case 'remove_favorite':
      // Filtramos para quitar el elemento que coincida con el UID
      return {
        ...store,
        favorites: store.favorites.filter(item => item.uid !== action.payload.uid)
      };

    default:
      throw Error('Unknown action.');
  }
}