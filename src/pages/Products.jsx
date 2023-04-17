import React, { useContext } from "react";

import { Context } from "../Context";
import Product from "../components/Product";

export default function Products() {
  const { shopData, search } = useContext(Context);

  const searchItem = shopData.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {search ? (
        <div className="flex flex-col gap-y-10 md:w-4/5 lg:w-3/5 mx-auto mb-24">
          {searchItem.map((item, ind) => (
            <Product key={ind} item={item} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-y-10  md:w-4/5 lg:w-3/5 mx-auto mb-24">
          {shopData.map((item, ind) => (
            <Product key={ind} item={item} />
          ))}
        </div>
      )}
    </>
  );
}
