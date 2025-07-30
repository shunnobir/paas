"use client";

import React, { useState } from "react";

function Task4() {
  const [nums, setNums] = useState("");
  const [nth, setNth] = useState("");
  const [result, setResult] = useState("");
  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const numArray = nums.split(",").map((val) => Number.parseInt(val));
    let n = Number.parseInt(nth);
    if (Number.isInteger(n)) {
      n = n > numArray.length ? numArray.length : n;
      setNth(n.toString());
    }

    numArray.sort((a, b) => a - b);
    setResult(numArray[n - 1].toString());
  };

  return (
    <main className="sm:w-[650px] w-full max-h-full overflow-y-auto grid grid-cols-1 gap-5 px-5 sm:px-10 py-10 rounded-md bg-white shadow-2xl">
      <form onSubmit={handleOnSubmit} className="flex flex-col gap-2">
        <label className="w-full text-3xl font-bold text-center">
          Find Nth Largest Number
        </label>
        <div className="flex flex-col gap-1">
          <label>Enter Numbers (comma separated)</label>
          <input
            className="px-5 py-2.5 rounded-md border border-solid border-black focus-within:outline-none"
            placeholder="e.g. 9, 2, 12, 100"
            value={nums}
            onChange={(e) => setNums(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label>Enter N</label>
          <input
            className="px-5 py-2.5 rounded-md border border-solid border-black focus-within:outline-none"
            placeholder="e.g. 10"
            value={nth}
            onChange={(e) => setNth(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className={"px-5 py-2.5 rounded-md text-white bg-black"}
        >
          Find
        </button>
      </form>
      <div className="flex flex-col justify-start flex-wrap mt-10 gap-2">
        <label className="w-full text-center">Nth Largest Number</label>
        <span className="border border-solid mx-auto border-black rounded-md w-20 h-20 inline-flex items-center justify-center">
          {result}
        </span>
      </div>
    </main>
  );
}

export default Task4;
