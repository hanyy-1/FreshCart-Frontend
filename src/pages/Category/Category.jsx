import React from "react";
import axios from "axios";
import Loading from "../../components/Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import CategCard from "../../components/CategCard/CategCard";
import { LayoutGrid } from "lucide-react";

// Extra fashion/lifestyle categories shown alongside API ones
// (used to fill the page if API returns few categories)
const EXTRA_CATEGORIES = [
  
  
  {
    _id: "extra-3",
    name: "Sneakers & Shoes",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
    productCount: "85+",
    tag: "Hot 🔥",
  },
 
 
  {
    _id: "extra-6",
    name: "Sportswear",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",
    productCount: "110+",
  },
  
 
];

export default function Category() {
  async function getCateImage() {
    try {
      const options = {
        url: "http://localhost:5143/api/v1/categories",
        method: "GET",
      };
      return await axios.request(options);
    } catch (error) {
      console.log(error);
    }
  }

  const { data, isLoading } = useQuery({
    queryKey: "category",
    queryFn: getCateImage,
    staleTime: 2000000,
    refetchOnMount: false,
  });

  if (isLoading) return <Loading />;

  // Merge API categories with extra ones
  const apiCategories = data?.data?.data?.map((c) => ({
    _id: c._id,
    name: c.name,
    image: c.image,
    productCount: null,
    tag: null,
  })) || [];

  // Avoid duplicating by name (case-insensitive)
  const apiNames = new Set(apiCategories.map((c) => c.name.toLowerCase()));
  const filteredExtras = EXTRA_CATEGORIES.filter(
    (e) => !apiNames.has(e.name.toLowerCase())
  );

  const allCategories = [...apiCategories, ...filteredExtras];

  return (
    <div className="py-10">
      {/* Header */}
      <div className="flex items-center gap-4 mb-10">
        <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
          <LayoutGrid className="text-green-600" size={22} />
        </div>
        <div>
          <h1 className="text-3xl font-black text-gray-900">Categories</h1>
          <p className="text-gray-400 text-sm mt-0.5">
            {allCategories.length} categories — browse what you need
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {allCategories.map((categ) => (
          <CategCard categInfo={categ} key={categ._id} />
        ))}
      </div>
    </div>
  );
}
