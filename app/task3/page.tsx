"use client";

import React, { useState } from "react";
import {
  collection,
  getDocs,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { firestore } from "@/app/firebase.config";

function Task3() {
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
    const q = query(
      collection(firestore, "users"),
      where("email", "==", user.email)
    );
    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      const data = doc.data();
      setUser((prev) => ({
        ...prev,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        createdAt: data.createdAt,
        uid: data.uid,
        password: "",
      }));
    });
    setProcessing(false);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <main className="sm:w-[650px] w-full max-h-full overflow-y-auto grid grid-cols-1 gap-5 px-5 sm:px-10 py-10 rounded-md bg-white shadow-2xl">
      <form onSubmit={handleOnSubmit} className="flex flex-col gap-2">
        <label className="w-full text-3xl font-bold text-center">
          User login
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
          {processing ? "Logging in..." : "Log in"}
        </button>
      </form>
      {user.firstName.length > 0 ? (
        <div className="flex flex-col gap-1 justify-start flex-wrap mt-10">
          <label className="text-center font-medium text-lg">
            User Information
          </label>
          <div className="flex flex-col gap-1">
            <label>Email</label>
            <input
              className="px-5 py-2.5 rounded-md border border-solid border-black focus-within:outline-none"
              placeholder="e.g. yourname@email.com"
              type="email"
              name="email"
              value={user.email}
              readOnly
            />
          </div>
          {/* <div className="flex flex-col sm:flex-row justify-between gap-2 items-center"> */}
          <div className="flex flex-col gap-1">
            <label>Full Name</label>
            <input
              className="px-5 py-2.5 rounded-md border border-solid border-black focus-within:outline-none"
              placeholder="e.g. Steve"
              name="firstName"
              value={user.firstName}
              readOnly
            />
          </div>
          <div className="flex flex-col gap-1">
            <label>Age</label>
            <input
              className="px-5 py-2.5 rounded-md border border-solid border-black focus-within:outline-none"
              placeholder="e.g. Smith"
              name="lastName"
              value={user.lastName}
              readOnly
            />
          </div>
          {/* </div> */}
          {/* <div className="flex flex-col gap-1">
            <label>Created At</label>
            <input
              className="px-5 py-2.5 rounded-md border border-solid border-black focus-within:outline-none"
              name="createdAt"
              value={user.createdAt.toDate().toTimeString()}
              readOnly
            />
          </div> */}
        </div>
      ) : null}
    </main>
  );
}

export default Task3;
