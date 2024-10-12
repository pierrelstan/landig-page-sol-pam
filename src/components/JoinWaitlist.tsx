"use client";

import { useState } from "react";
import Image from "next/image";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import phoneSvg from "@/app/img/phoneImage.svg";

export default function JoinWaitList() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(email);
    try {
      console.log(process.env);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_ENV_URL}/api/join-waitlist`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );
      console.log(response);
      if (response.ok) {
        toast.success("Thank you for joining the waitlist!");
        setEmail(""); // Reset input
      } else {
        toast.error("There was an error. Please try again.");
      }
    } catch (error: unknown) {
      console.warn(error);
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <div>
      <main>
        <section className="grid  grid-cols-1 lg:grid-cols-2  lg:items-center lg:m-20   justify-between  max-md:bg-slate lg:bg-phone  sm:rounded-sm lg:rounded-3xl ">
          <div className="px-6 mt-20 lg:mt-0 ">
            <h1 className="text-6xl  text-white font-extrabold text-wrap">
              Get Ready for Sol Pam!
            </h1>
            <p className=" text-2xl text-white  font-light my-4 text-wrap mt-8">
              Enter your email to get notified when we launch and receive
              exclusive updates.
            </p>

            <form onSubmit={handleSubmit}>
              <input
                className="placeholder:italic placeholder:text-slate-400 block bg-white w-full  border 
                border-slate-300 rounded-md py-2 pl-9 pr-3  mt-10 shadow-sm focus:outline-none
                 focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="example@example.com"
              />

              <button
                className="bg-tropicalRainForest active:bg-black text-white disabled:opacity-75  font-light py-2 px-5  rounded-md mt-5"
                type="submit"
              >
                Join the Waitlist
              </button>
            </form>
          </div>
          <div className="justify-self-end self-end">
            <Image
              src={phoneSvg}
              alt="Next.js logo"
              sizes="100vw"
              width={400}
              height={650}
              quality={75}
              priority
            />
          </div>

          <ToastContainer position="bottom-center" autoClose={5000} />
        </section>
      </main>
    </div>
  );
}
