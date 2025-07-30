"use client";

import React, { useState } from "react";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { firestore } from "@/app/firebase.config";

function Task5() {
  const [user, setUser] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    createdAt: Timestamp.fromDate(new Date()),
    uid: new Date().getTime(),
  });

  const [processing, setProcessing] = useState(false);
  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProcessing(true);
    await setDoc(doc(firestore, "users", user.uid.toString()), user);
    setProcessing(false);
    setUser({
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      createdAt: Timestamp.fromDate(new Date()),
      uid: new Date().getTime(),
    });
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <main className="sm:w-[650px] w-full max-h-full overflow-y-auto grid grid-cols-1 gap-5 px-5 sm:px-10 py-10 rounded-md bg-white shadow-2xl">
      <form onSubmit={handleOnSubmit} className="flex flex-col gap-2">
        <label className="w-full text-3xl font-bold text-center">
          User register
        </label>
        <div className="flex flex-col gap-1">
          <label>Email</label>
          <input
            className="px-5 py-2.5 rounded-md border border-solid border-black focus-within:outline-none"
            placeholder="e.g. yourname@email.com"
            type="email"
            name="email"
            value={user.email}
            onChange={handleOnChange}
          />
        </div>
        {/* <div className="flex flex-col justify-between gap-2"> */}
        <div className="flex flex-col gap-1">
          <label>Full Name</label>
          <input
            className="px-5 py-2.5 rounded-md border border-solid border-black focus-within:outline-none"
            placeholder="e.g. John Doe"
            name="firstName"
            value={user.firstName}
            onChange={handleOnChange}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label>Age</label>
          <input
            className="px-5 py-2.5 rounded-md border border-solid border-black focus-within:outline-none"
            placeholder="e.g. 25"
            name="lastName"
            value={user.lastName}
            onChange={handleOnChange}
          />
        </div>
        {/* </div> */}
        <div className="flex flex-col gap-1">
          <label>Password</label>
          <input
            className="px-5 py-2.5 rounded-md border border-solid border-black focus-within:outline-none"
            type="password"
            name="password"
            value={user.password}
            onChange={handleOnChange}
          />
        </div>
        <button
          type="submit"
          className={
            "px-5 py-2.5 rounded-md text-white " +
            (processing ? "bg-gray-600" : "bg-black")
          }
          disabled={processing}
        >
          {processing ? "Registering" : "Register"}
        </button>
      </form>
    </main>
  );
}

export default Task5;
