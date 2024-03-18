import React from "react";

const MenuItem: React.FC = () => {
  return (
    <div className="bg-gray-200 p-4 rounded-lg text-center hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all">
      <div className="text-center ">
        <img
          src="/cocktail-dress.jpg"
          alt="dress"
          className="max-h-auto max-h-36 block mx-auto"
        />
      </div>

      <h4 className="font-semibold text-xl my-4">Cocktail dress</h4>
      <p className="text-gray-500 text-sm">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus,
        optio.
      </p>
      <button className="bg-primary text-white rounded-full mt-4 px-8 py-2">
        Add $20
      </button>
    </div>
  );
};

export default MenuItem;
