import { SearchIcon } from "@heroicons/react/outline";

const Searchbar = () => {
  return (
    <div className="flex space-x-2 items-center rounded-full bg-slate-200 px-2">
      <SearchIcon className="primary-icon text-gray-400" />
      <input
        type="text"
        placeholder="Search twitter"
        className="flex-1 text-lg px-2 py-4 bg-transparent rounded-full outline-none"
      />
    </div>
  );
};

export default Searchbar;
