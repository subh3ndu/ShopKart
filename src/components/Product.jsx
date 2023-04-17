import React from "react";
import { Rating, Chip } from "@mui/material";
import { Link } from "react-router-dom";

export default function Product({ item }) {
  return (
    <Link to={`/products/${item.id}`}>
      <div className="flex items-center gap-x-8 w-[400] px-10 py-8 shadow-md rounded-md cursor-pointer">
        <img
          src={item.image}
          alt={item.title}
          style={{
            width: 210,
          }}
        />
        <div className="flex flex-col gap-y-4">
          <h1 className="text-2xl font-bold">{item.title}</h1>
          <p className="text-sm">{item.description}</p>
          <div className="flex items-center gap-x-2">
            <Rating value={item.rating.rate} readOnly />
            <p className="font-bold text-xl text-slate-600">•</p>
            <p className="font-bold text-sm mt-1">{item.rating.count}</p>
          </div>
          <div className="block">
            <Chip label={item.category} onClick={() => {}} />
          </div>
        </div>
      </div>
    </Link>
  );
}
