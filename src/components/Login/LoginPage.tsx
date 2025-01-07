'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Login.module.css';
import localFont from 'next/font/local';
import {
  selectAuthState,
  setAuthState,
  setUserDetailsState,
} from '@/store/authSlice';
import { doc, getDoc, setDoc, serverTimestamp } from '@firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { db } from '../../../firebaseConfig';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { motion } from 'motion/react';
import LoginPageAnimation from '../LoginPageAnimation/LoginPageAnimation';

const styreneFont = localFont({
  src: '../../fonts/StyreneAWeb-Regular.woff',
});
const copernicusFont = localFont({
  src: '../../fonts/Copernicus.otf',
});

const data = [
  {
    text: ' Hi, make a content calendar for my marketing campaign.',
    reply: "Of Course. Here's the calender!",
    imgSrc: '/calendar.svg',
  },
  {
    text: 'Hi! Can you visualize my sales funnel from awareness to purchase using bar graphs?',
    reply: "Here's your sales funnel.",
    imgSrc: '/graph.svg',
  },
  {
    text: 'Identify code optimizations and performance improvements.',
    reply: "All set. Here's the optimized code.",
    imgSrc: '/code.svg',
  },
  {
    text: 'Create a report to analyze product usage and user feedback.',
    reply: "Here's the report.",
    imgSrc: '/doc.svg',
  },
];

const LoginPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectAuthState);
  const [currentGroup, setCurrentGroup] = useState(0);

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  const handleAuth = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        await setDoc(
          userRef,
          {
            userDetails: {
              email: user.email,
              name: user.displayName,
              profilePic: user.photoURL,
            },
          },
          { merge: true }
        );
      } else {
        await setDoc(userRef, {
          userDetails: {
            email: user.email,
            name: user.displayName,
            profilePic: user.photoURL,
            createdAt: serverTimestamp(),
          },
        });
      }

      dispatch(setAuthState(true));
      dispatch(
        setUserDetailsState({
          uid: user.uid,
          name: user.displayName ?? '',
          email: user.email ?? '',
          profilePic: user.photoURL ?? '',
        })
      );
      router.push('/');
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className="flex-col items-center  min-h-[97vh] w-full py-6 space-y-20">
        <div className="flex justify-center items-center space-x-2">
          <img className="w-8 h-8" src="/Logo.png" alt="" />
          <p
            className={`text-4xl mb-[-7px] ${copernicusFont.className} tracking-widest `}
          >
            Omniplex
          </p>
        </div>
        <h2
          className={`text-center  tracking-widest  font-copernicus  mt-20  leading-[1em]  min-[500px]:text-[3.5rem]  min-[350px]:text-[3.2rem]  text-[1.75rem]  select-none   ${copernicusFont.className}`}
        >
          <div>Your ideas, </div>
          <div>amplified</div>
        </h2>
        <p className="  sm:gap-[0.15em] text-gray-300  items-center  text-center   font-normal  text-pretty  tracking-wider  font-serif mt-4  break-words  leading-[1em]  text-base  md:text-lg  ">
          AI that helps you create in confidence.
        </p>
        <div
          onClick={() => {
            handleAuth();
          }}
          className="mt-8 mx-4 sm:mx-auto max-w-md text-center rounded-[2rem] border-1 cursor-pointer hover:bg-gray-700 border-gray-600"
        >
          <div className="flex items-center justify-center space-x-2 p-2 ">
            <img className="h-5 w-5" src="/googleIcon.svg" alt="" />
            <p className="font-bold">Continue with Google</p>
          </div>
        </div>
      </div>

      <div className={styles.second}>
        <LoginPageAnimation />
      </div>
    </div>
  );
};

export default LoginPage;
