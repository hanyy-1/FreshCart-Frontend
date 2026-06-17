import { createContext, useState } from "react";
import axios from "axios";

export const BrandContext = createContext(null);

export default function BrandProvider({ children }) {
  const [brands, setBrands] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);

  async function getAllBrands() {
    try {
      const { data } = await axios.get("http://localhost:5143/api/v1/brands");
      setBrands(data.data);
      console.log(data.data);
    } catch (error) {
      console.error("Error fetching all brands:", error);
    }
  }

  async function getBrandSpecific(id) {
    try {
      const { data } = await axios.get(`http://localhost:5143/api/v1/brands/${id}`);
      setSelectedBrand(data.data);
      console.log(data.data);
      return data.data;
    } catch (error) {
      console.error(`Error fetching brand with ID ${id}:`, error);
    }
  }

  return (
    <BrandContext.Provider
      value={{
        brands,
        getAllBrands,
        getBrandSpecific,
        selectedBrand,
        setSelectedBrand,
      }}
    >
      {children}
    </BrandContext.Provider>
  );
}
