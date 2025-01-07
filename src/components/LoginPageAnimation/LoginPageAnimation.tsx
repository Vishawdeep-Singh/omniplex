import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoginPageAnimation = () => {
  const [currentGroup, setCurrentGroup] = useState(0);
  const [mounted, setMounted] = useState(false);
  const timerRef = useRef<null | NodeJS.Timeout>(null);

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

  useEffect(() => {
    setMounted(true);

    return () => {
      setMounted(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!mounted) return;

    timerRef.current = setInterval(() => {
      setCurrentGroup((prev) => (prev + 1) % data.length);
    }, 6000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [mounted, data.length]);

  if (!mounted) return null;

  return (
    <div className="transform translate-y-[20%]">
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {data[currentGroup] && (
          <motion.div
            key={currentGroup}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-black bg-black bg-opacity-10 flex rounded-xl py-2.5 pl-5 pr-4 bg-gradient-to-b from-[rgba(0,0,0,0)] to-[rgba(0,0,0,0.025)] leading-tight w-[24rem]"
              >
                <div className="h-6 w-6 mr-4 flex-shrink-0 rounded-full bg-black" />
                {data[currentGroup].text}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="font-serif relative mt-12 text-black bg-gradient-to-b bg-stone-50 from-[rgba(201,192,161,0)] to-[rgba(201,192,161,0.1)] z-50 flex rounded-xl py-3.5 px-2 w-fit"
              >
                {data[currentGroup].reply}
              </motion.div>

              <motion.img
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: -40 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                src={data[currentGroup].imgSrc}
                alt=""
                className="transform z-0 translate-x-2 -translate-y-10"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LoginPageAnimation;
