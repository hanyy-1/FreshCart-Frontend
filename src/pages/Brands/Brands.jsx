import React, { useContext, useEffect, useState } from "react";
import Loading from "../../components/Loading/Loading";
import { BrandContext } from "../../context/brand.context";
import { X, Tag } from "lucide-react";

export default function Brands() {
  const { getBrandSpecific, brands, selectedBrand, getAllBrands } = useContext(BrandContext);
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    getAllBrands();
  }, []);

  return (
    <div className='py-10'>
      {/* Header */}
      <div className='flex items-center gap-4 mb-10'>
        <div className='w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center'>
          <Tag className='text-green-600' size={22} />
        </div>
        <div>
          <h1 className='text-3xl font-black text-gray-900'>All Brands</h1>
          <p className='text-gray-400 text-sm mt-0.5'>Discover your favourite brands</p>
        </div>
      </div>

      {/* Brand Popup Modal */}
      {popup && selectedBrand && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setPopup(false)}
            className='fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-all'
          />

          {/* Modal */}
          <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90vw] max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden'>
            {/* Modal Header */}
            <div className='flex justify-between items-center p-5 border-b border-gray-100'>
              <h3 className='text-lg font-black text-gray-900'>{selectedBrand.name}</h3>
              <button
                onClick={() => setPopup(false)}
                className='w-8 h-8 bg-gray-100 hover:bg-red-100 hover:text-red-500 rounded-full flex items-center justify-center transition-colors'
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Body */}
            <div className='p-6 flex items-center gap-6'>
              <div className='flex-1'>
                <p className='text-gray-400 text-sm capitalize'>{selectedBrand.slug?.replace(/-/g, ' ')}</p>
                <div className='mt-3 inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full'>
                  <div className='w-1.5 h-1.5 bg-green-500 rounded-full' />
                  Official Brand
                </div>
              </div>
              <div className='w-32 h-32 rounded-2xl overflow-hidden bg-gray-50 flex items-center justify-center border border-gray-100 shrink-0'>
                <img
                  className='w-full h-full object-contain p-2'
                  src={selectedBrand.image}
                  alt={selectedBrand.name}
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className='px-6 pb-6'>
              <button
                onClick={() => setPopup(false)}
                className='w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 rounded-2xl transition-colors'
              >
                Close
              </button>
            </div>
          </div>
        </>
      )}

      {/* Brands Grid */}
      {brands == null ? (
        <Loading />
      ) : (
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5'>
          {brands.map((brand) => (
            <div
              key={brand._id}
              onClick={async () => {
                await getBrandSpecific(brand._id);
                setPopup(true);
              }}
              className='group bg-white rounded-3xl border border-gray-100 hover:border-green-300 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer overflow-hidden'
            >
              {/* Brand Image */}
              <div className='h-40 bg-gray-50 flex items-center justify-center p-5 group-hover:bg-green-50 transition-colors duration-300'>
                <img
                  src={brand.image}
                  alt={brand.name}
                  className='w-full h-full object-contain group-hover:scale-110 transition-transform duration-500'
                />
              </div>

              {/* Brand Name */}
              <div className='px-4 py-3 border-t border-gray-100 group-hover:border-green-100 transition-colors'>
                <h2 className='text-sm font-bold text-gray-700 group-hover:text-green-700 text-center transition-colors truncate'>{brand.name}</h2>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
