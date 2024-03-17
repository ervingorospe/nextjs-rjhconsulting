'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from "framer-motion";

export function HeroBgImageSlideshow({ images }) {
  const [curr, setCurr] = useState(0)
  const [isAnimating, setIsAnimating] = useState(true)

  useEffect(() => {
    let timeoutId;

    const delayedFunction = () => {
      if (curr === images.length - 1) {
        setCurr(0)
      } else {
        setCurr(curr + 1)
      }

      setIsAnimating(true)
    };

    if (isAnimating) {
      timeoutId = setTimeout(() => {
        setIsAnimating(false);
        setTimeout(delayedFunction, 100);
      }, 5000);
    }

    return () => clearTimeout(timeoutId);
  }, [curr, images.length, isAnimating])

  return (
    <>
      <div className="absolute inset-0">
        <motion.div 
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: isAnimating ? 1 : '0', scale: isAnimating ? 1.1 : 0 }}
          transition={{ opacity : { duration: 0.5 }, scale: { duration: 3 } }}
        >
          <Image
            src={images[curr].file.imageUrl}
            alt="RJH Consulting"
            width="1000"
            height="1000"
            className="h-full w-full object-cover object-center"
          />
        </motion.div>
      </div>
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-50"></div>
    </>
  )
}
