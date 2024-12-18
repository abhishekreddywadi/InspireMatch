import { useEffect, useState } from "react";
import AppBar from "../components/AppBar";

const SavedQuotes = () => {
  const [value, setvalue] = useState<string[]>([]);
  const [filtered, setfiltered] = useState<string[]>([]);
  const keys = Object.keys(localStorage);
  function allStorage() {
    let i = keys.length - 1;
    // eslint-disable-next-line prefer-const

    while (i >= 0) {
      const item = localStorage.getItem(keys[i]);
      if (item) {
        setvalue((prev) => [...prev, item]);
      } else if (localStorage.getItem(keys[i]) === "token") {
        keys.splice(i, 1);
        continue;
      }
      i--;
    }
    const filteredg = value.filter((quote) => quote !== "");
    setfiltered(filteredg);
    console.log(filtered);
  }

  useEffect(() => {
    allStorage();
  }, [keys]);
  return (
    <>
      <AppBar />
      <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-screen h-screen overflow-x-hidden rounded-xl bg-clip-border">
        <nav className="flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700">
          {filtered.map((item, index) => (
            <div
              key={index}
              role="button"
              className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none bg-blue-gray-50/50 text-start text-blue-gray-700 hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
            >
              {item}
            </div>
          ))}
        </nav>
      </div>
    </>
  );
};

export default SavedQuotes;
