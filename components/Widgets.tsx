import { SearchIcon } from "@heroicons/react/outline";
import React from "react";

const Widgets = () => {
  return (
    <section>
      <div className="flex space-x-2 items-center bg-gray-100 p-3">
        <SearchIcon className="w-5 h-5" />
        <input
          type="text"
          placeholder="search..."
          className="flex-1 bg-transparent outline-none"
        />
      </div>
    </section>
  );
};

export default Widgets;
