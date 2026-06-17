import React from "react";

export default function CategCard({ categInfo }) {
  const { image, name, productCount, tag } = categInfo;

  return (
    <div className="group relative overflow-hidden rounded-3xl cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-gray-100">
      {/* Image */}
      <div className="relative h-72 overflow-hidden">
        <img
          src={image}
          loading="lazy"
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

        {/* Tag badge top-right */}
        {tag && (
          <div className="absolute top-4 right-4">
            <span className="bg-green-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-lg">
              {tag}
            </span>
          </div>
        )}

        {/* Content bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="text-white font-black text-xl tracking-tight drop-shadow-lg leading-tight">
            {name}
          </h3>

          {/* Product count */}
          {productCount && (
            <p className="text-white/60 text-xs mt-1">{productCount} products</p>
          )}

          {/* Browse CTA — shows on hover */}
          <div className="flex items-center gap-2 mt-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <div className="h-px flex-1 bg-green-400/60 rounded-full" />
            <span className="text-green-300 text-xs font-bold whitespace-nowrap">Browse All →</span>
          </div>
        </div>
      </div>
    </div>
  );
}
