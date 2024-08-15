"use client";
import {
  PanInfo,
  motion,
  useAnimation,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";

const menuItems = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const angleIncrement = 360 / menuItems.length;
const dragFactor = 0.01;
const correctCombination = ["9", "7", "5"];

export default function Vault() {
  const controls = useAnimation();
  const rotation = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [middleItem, setMiddleItem] = useState(menuItems[0]);
  const [combination, setCombination] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  useMotionValueEvent(rotation, "change", (value) => {
    const adjustedRotation = ((value % 360) + 360) % 360;
    const middleIndex =
      Math.round(adjustedRotation / angleIncrement) % menuItems.length;
    const actualMiddleItem =
      menuItems[(menuItems.length - middleIndex) % menuItems.length];
    setMiddleItem(actualMiddleItem);
  });

  const onDrag = (_: any, info: PanInfo) => {
    const currentRotation = rotation.get() + info.offset.y * dragFactor;

    rotation.set(currentRotation);
  };

  const onDragEnd = (_: any, info: PanInfo) => {
    const endRotation = rotation.get() + info.velocity.y * dragFactor;
    controls.start({
      rotate: endRotation,
      transition: { type: "spring", mass: 0.1 },
    });
    updateCombination();
  };

  const updateCombination = () => {
    setCombination((prev) => {
      const newCombination = [...prev, middleItem];
      if (newCombination.length === correctCombination.length) {
        if (
          JSON.stringify(newCombination) === JSON.stringify(correctCombination)
        ) {
          setMessage("Safe opened successfully!");
        } else {
          setMessage("Incorrect combination. Please try again. :(");
        }
        return [];
      }
      return newCombination;
    });
  };

  const transform = useTransform(rotation, (value) => {
    return `rotate(${value}deg)`;
  });

  return (
    <div
      className="relative flex h-screen w-full items-center justify-center overflow-hidden"
      ref={containerRef}
    >
      <div className="pointer-events-none absolute left-0 top-0 z-50 bg-neutral-100 to-transparent backdrop-blur-xl [-webkit-mask-image:linear-gradient(to_bottom,black,transparent)] dark:bg-neutral-900"></div>
      <motion.div
        className="relative flex h-[150px] w-[150px] cursor-grab items-center justify-center active:cursor-grabbing"
        animate={controls}
        style={{
          transformOrigin: "center center",
          transform,
          rotate: rotation,
        }}
        drag="y"
        onDrag={onDrag}
        onDragEnd={onDragEnd}
      >
        {menuItems.map((item, index) => {
          const rotate = angleIncrement * index;

          return (
            <motion.div
              transition={{ duration: 0.8 }}
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(10px)" }}
              key={`${item}-${index}`}
              className={`absolute ${
                item === middleItem
                  ? "dark:text-green-400 font-semibold text-lg"
                  : "dark:text-neutral-900 font-semibold text-lg"
              } transition-colors duration-150 `}
              style={{
                left: "50%",
                transform: `rotate(${rotate}deg) translateX(130px)`,
                transformOrigin: "left center",
              }}
              tabIndex={0}
              onFocus={() => console.log(`Focused on: ${item}`)}
            >
              {item}
            </motion.div>
          );
        })}
      </motion.div>
      <motion.div
        transition={{ duration: 0.1 }}
        initial={{ opacity: 0, filter: "blur(10px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, filter: "blur(10px)" }}
        className="pointer-events-none absolute bottom-0 left-0 z-50 bg-neutral-100 to-transparent backdrop-blur-xl [-webkit-mask-image:linear-gradient(to_top,black,transparent)] dark:bg-neutral-900"
      ></motion.div>
      {message && (
        <motion.div
          transition={{ duration: 0.8 }}
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, filter: "blur(10px)" }}
          className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-white p-4 shadow-lg rounded-xl text-center"
        >
          {message}
        </motion.div>
      )}
      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-white border border-neutral-100 p-2 rounded-xl">
        <h2>Current combination</h2>
        <div className="flex space-x-2 items-center justify-center">
          {combination.map((num, index) => (
            <motion.span
              transition={{ duration: 0.8 }}
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(10px)" }}
              key={index}
              className="text-lg font-bold mt-4"
            >
              {num}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
}
