"use client";

import { useState } from "react";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import phoneSvg from "@/app/img/phone_image_with_logo.svg";
import "firebase/firestore";
import { initializeApp } from 'firebase/app';
import { getFirestore, setDoc, doc, getDoc } from 'firebase/firestore';
import MailJet from 'node-mailjet';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const mailJetConfig = {
  apiKey: process.env.NEXT_PUBLIC_MAILJET_API_KEY || "",
  secretKey: process.env.NEXT_PUBLIC_MAILJET_SECRET_KEY || "",
  senderEmail: process.env.NEXT_PUBLIC_MAILJET_SENDER || "contactsolpam@gmail.com"
}


const app = initializeApp(firebaseConfig);
const db = getFirestore(app); 

export default function JoinWaitList() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    
    e.preventDefault();

    try {
      const reference = doc(db, "waitlist", email);

      setLoading(true);
      const docSnapshot = await getDoc(reference);
      setLoading(false);
      if (docSnapshot.exists()) {
        // Email already exists, show an error
        toast.error('This email is already on the waitlist.');
      } else {
        // Set the document with the email data
        await setDoc(reference, {
          email
        });

        // SEND EMAIL TO US AND TO THEM
        const mailjet = MailJet.apiConnect(
          mailJetConfig.apiKey,
          mailJetConfig.secretKey
        )
        const request1 = mailjet.post('send', { version: 'v3.1' }).request({
          Messages: [
            {
              From: {
                Email: mailJetConfig.senderEmail,
                Name: 'SòlPam Team',
              },
              To: [
                {
                  Email:email ,
                  Name: 'You',
                },
              ],
              Subject: 'Solpam waitlist',
              HTMLPart:
                'Thank you for subscribing to Solpam waitlist. We will use that email to keep you updated with our progress and eventually you will become our first user! <br></br>Regards, <br></br>SòlPam',
            },
          ],
        })
        request1
          .then(result => {
            console.log(result.body)
          })
          .catch(err => {
            console.log(err.statusCode)
          })

        const request2 = mailjet.post('send', { version: 'v3.1' }).request({
          Messages: [
            {
              From: {
                Email: mailJetConfig.senderEmail,
                Name: 'SòlPam Team',
              },
              To: [
                {
                  Email:'infotorch2014@gmail.com' ,
                  Name: 'You',
                },
              ],
              Subject: 'Solpam waitlist',
              HTMLPart:
                `${email} just joined the waitlist!`,
            },
          ],
        })
        request2
          .then(result => {
            console.log(result.body)
          })
          .catch(err => {
            console.log(err.statusCode)
          })


        toast.success('You have successfully joined the waitlist!');
      }
    } catch (error) {
      console.error('Error joining waitlist: ', error);
      toast.error('Error joining waitlist.');
    }
  };

  return (
    <div className="bg-slate">
      <main>
        <section className="grid  grid-cols-1 lg:grid-cols-2  lg:items-center lg:m-20   justify-between sm:rounded-sm lg:rounded-3xl ">
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
                 focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm text-black"
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
                disabled={loading}
              >
                {loading ? "Joining the waitlist.." : "Join the waitlist"}
              </button>
            </form>
          </div>
          <div className="justify-self-end self-end">
            <Image
              src={phoneSvg}
              alt="Solpam logo"
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
