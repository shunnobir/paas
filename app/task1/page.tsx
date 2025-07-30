"use client";

import { ChangeEvent, FormEvent, useRef, useState } from "react";

export default function Task1() {
  const [error, setError] = useState("");
  const [nums, setNums] = useState<number[]>([]);
  const ref = useRef<HTMLInputElement>(null);
  const [generating, setGenerating] = useState(false);

  const generateNums = async () => {
    const raw_n = ref?.current?.value;
    const n = Number.parseInt(raw_n ?? "0");
    const _nums: number[] = [];
    for (let i = 1; i <= n; ++i) {
      _nums.push(i * 2);
    }
    setNums(_nums);
  };

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setGenerating(true);
    generateNums().then((_) => setGenerating(false));
  };

  return (
    <form
      className="sm:w-[650px] max-h-full w-full overflow-y-auto grid grid-cols-1 gap-5 px-5 sm:px-10 py-10 rounded-md bg-white shadow-2xl"
      onSubmit={handleOnSubmit}
    >
      <label className="w-full text-3xl font-bold text-center">
        Even Number Generator
      </label>
      <div className="grid grid-cols-1 gap-2">
        <label>Enter a number to generate even numbers:</label>
        <input
          ref={ref}
          type="number"
          placeholder="Enter a number"
          className="h-10 focus-within:outline-0 border border-solid border-black rounded-md px-4 disabled:bg-gray-500/20"
          disabled={generating}
        />
      </div>
      <button
        className="bg-black text-white h-10 rounded-md disabled:bg-gray-500 cursor-pointer"
        disabled={generating}
      >
        {generating ? "Generating..." : "Generate"}
      </button>
      {nums.length > 0 ? (
        <div className="grid grid-cols-5 gap-1 w-full max-h-[450px]">
          <span className="col-span-5 text-center">Generated numbers</span>
          {nums.map((num) => {
            return (
              <span
                key={num}
                className="text-center p-1 h-8 border border-solid border-black/30 bg-black-40 rounded-md"
              >
                {num}
              </span>
            );
          })}
        </div>
      ) : null}
    </form>
  );
}
