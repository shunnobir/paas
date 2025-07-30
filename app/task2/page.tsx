"use client";

import react, { useRef, useState } from "react";

export default function Task2() {
  const [size, setSize] = useState(0);
  const selectRef = useRef<HTMLSelectElement>(null);
  const [matRefs1, setMatRefs1] = useState<
    react.RefObject<HTMLInputElement | null>[][]
  >([]);
  const [matRefs2, setMatRefs2] = useState<
    react.RefObject<HTMLInputElement | null>[][]
  >([]);
  const [mat1, setMat1] = useState<number[][]>([]);
  const [mat2, setMat2] = useState<number[][]>([]);
  const [result, setResult] = useState<number[][]>([]);
  const [multiplied, setMultiplied] = useState(false);

  const generateMatrix = (
    size: number,
    value:
      | number
      | (() => react.RefObject<HTMLInputElement | null>)
      | (() => number)
  ) => {
    const mat = [];
    for (let i = 0; i < size; ++i) {
      const row = [];
      for (let j = 0; j < size; ++j) {
        const val = typeof value === "number" ? value : value();
        row.push(val);
      }
      mat.push(row);
    }
    return mat;
  };

  const getMatrixValues = (
    refs: react.RefObject<HTMLInputElement | null>[][]
  ) => {
    const mat = [];
    for (let i = 0; i < size; ++i) {
      const row = [];
      for (let j = 0; j < size; ++j) {
        row.push(Number.parseInt(refs[i][j]?.current?.value ?? "0") ?? 0);
      }
      mat.push(row);
    }
    return mat;
  };

  const handleOnChange = (e: react.ChangeEvent<HTMLSelectElement>) => {
    setMultiplied(false);
    setMat1([]);
    setMat2([]);
    setMatRefs1([]);
    setMatRefs2([]);
    const value = e.target.value;
    const size = Number.parseInt(value) ?? 0;
    setSize(size);
    setMat1(generateMatrix(size, -1) as number[][]);
    setMat2(generateMatrix(size, -1) as number[][]);
    setResult(generateMatrix(size, -1) as number[][]);
    setMatRefs1(
      generateMatrix(
        size,
        react.createRef
      ) as react.RefObject<HTMLInputElement | null>[][]
    );
    setMatRefs2(
      generateMatrix(
        size,
        react.createRef
      ) as react.RefObject<HTMLInputElement | null>[][]
    );
  };

  const handleOnSubmit = (e: react.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setMultiplied(false);
    const mat1 = getMatrixValues(matRefs1);
    const mat2 = getMatrixValues(matRefs2);
    const n = size,
      m = size,
      o = size;
    const res = generateMatrix(size, 0) as number[][];
    for (let i = 0; i < m; ++i) {
      for (let k = 0; k < o; ++k) {
        for (let j = 0; j < n; ++j) {
          res[i][j] += mat1[i][k] * mat2[k][j];
        }
      }
    }
    setResult(res);
    setMultiplied(true);
  };

  const handleGenerateRandom = (e: react.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const mat1 = generateMatrix(size, () => Math.ceil(Math.random() * 100 + 1));
    const mat2 = generateMatrix(size, () => Math.ceil(Math.random() * 100 + 1));
    for (let i = 0; i < size; ++i) {
      for (let j = 0; j < size; ++j) {
        if (matRefs1[i][j] && matRefs1[i][j].current)
          matRefs1[i][j].current!.value = mat1[i][j].toString();
        if (matRefs2[i][j] && matRefs2[i][j].current)
          matRefs2[i][j].current!.value = mat2[i][j].toString();
      }
    }
  };

  return (
    <form
      className="sm:w-[650px] w-full max-h-full overflow-y-auto grid grid-cols-1 gap-5 px-5 sm:px-10 py-10 rounded-md bg-white shadow-2xl"
      onSubmit={handleOnSubmit}
    >
      <label className="w-full text-3xl font-bold text-center">
        Multiply Two Matrices
      </label>
      <div className="grid grid-cols-1 gap-2">
        <label>Select matrix size</label>
        <select
          ref={selectRef}
          className="h-10 rounded-md focus-within:outline-0 border border-solid border-black px-4"
          onChange={handleOnChange}
        >
          <option value="0">- Choose a size -</option>
          <option value="3">3x3</option>
          <option value="4">4x4</option>
          <option value="5">5x5</option>
        </select>
      </div>
      <div className="grid grid-cols-1 gap-1">
        <label>Enter matrix entries</label>
        <div className="flex flex-row flex-wrap gap-5">
          <Matrix size={size} mat={mat1} matRefs={matRefs1} />
          <Matrix size={size} mat={mat2} matRefs={matRefs2} />
        </div>
      </div>
      {size > 0 ? (
        <button
          className="bg-black text-white h-10 rounded-md disabled:bg-gray-500 cursor-pointer"
          type="button"
          onClick={handleGenerateRandom}
        >
          Generate Random Matrix
        </button>
      ) : null}
      <button
        className="bg-black text-white h-10 rounded-md disabled:bg-gray-500 cursor-pointer"
        type="submit"
      >
        Multiply
      </button>
      {multiplied ? (
        <div className="grid grid-cols-5 gap-1 w-full max-h-[450px]">
          <label className="col-span-5 text-center font-medium">
            Result Matrix
          </label>
          <Matrix size={size} mat={result} />
        </div>
      ) : null}
    </form>
  );
}

function Matrix(props: {
  size: number;
  mat: number[][];
  matRefs?: react.RefObject<HTMLInputElement | null>[][];
}) {
  const { size, mat, matRefs } = props;
  return (
    <div
      className="grid gap-2"
      style={{
        gridTemplateRows: `repeat(${size}, 1fr)`,
      }}
    >
      {mat.map((row, index) => {
        return (
          <div
            key={index}
            className="grid"
            style={{
              gridTemplateColumns: `repeat(${size}, 1fr)`,
            }}
          >
            {row.map((col, index2) => {
              return matRefs ? (
                <input
                  key={index2}
                  ref={matRefs[index][index2]}
                  type="number"
                  className="border border-solid border-black rounded-sm col-span-1 w-14 sm:w-20 h-10 px-3"
                />
              ) : (
                <span
                  key={index2}
                  className="border border-solid border-black inline-flex items-center justify-center text-center rounded-sm col-span-1 w-14 sm:w-20 h-10"
                >
                  {col}
                </span>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
