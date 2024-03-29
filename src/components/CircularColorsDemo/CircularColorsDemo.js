"use client";
import React from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import { Play, Pause, RotateCcw } from "react-feather";

import Card from "@/components/Card";
import VisuallyHidden from "@/components/VisuallyHidden";

import styles from "./CircularColorsDemo.module.css";

const COLORS = [
  { label: "red", value: "hsl(348deg 100% 60%)" },
  { label: "yellow", value: "hsl(50deg 100% 55%)" },
  { label: "blue", value: "hsl(235deg 100% 65%)" },
];

function CircularColorsDemo() {
  const [timeElapsed, setTimeElapsed] = React.useState(0);
  const [stop, setStop] = React.useState(false);

  // Every second, increase timeElapsed by 1
  React.useEffect(() => {
    const intervalId = window.setInterval(() => {
      setTimeElapsed((prevTimeElapsed) => {
        if (!stop) {
          return prevTimeElapsed + 1;
        }
        return prevTimeElapsed;
      });
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [stop]);

  // This value should cycle through the colors in the COLORS array:
  const selectedColor = getSelectedColor();

  function getSelectedColor() {
    // Use Modulo operator to get corresponding color
    // Mod by 3 (number of colors), then use the remainder as the crap?
    const colorIndex = timeElapsed % COLORS.length;
    return COLORS[colorIndex];
  }

  function toggleTimer() {
    setStop((prev) => !prev);
  }

  function resetTimer() {
    setTimeElapsed(0);
  }

  return (
    <Card as="section" className={styles.wrapper}>
      <ul className={styles.colorsWrapper}>
        {COLORS.map((color, index) => {
          const isSelected = color.value === selectedColor.value;

          return (
            <li className={styles.color} key={index}>
              {isSelected && (
                <motion.div
                  className={styles.selectedColorOutline}
                  layoutId={index}
                />
              )}
              <div
                className={clsx(
                  styles.colorBox,
                  isSelected && styles.selectedColorBox
                )}
                style={{
                  backgroundColor: color.value,
                }}
              >
                <VisuallyHidden>{color.label}</VisuallyHidden>
              </div>
            </li>
          );
        })}
      </ul>

      <div className={styles.timeWrapper}>
        <dl className={styles.timeDisplay}>
          <dt>Time Elapsed</dt>
          <dd>{timeElapsed}</dd>
        </dl>
        <div className={styles.actions}>
          <button onClick={toggleTimer}>
            {!stop ? <Pause /> : <Play />}
            <VisuallyHidden>Play</VisuallyHidden>
          </button>
          <button onClick={resetTimer}>
            <RotateCcw />
            <VisuallyHidden>Reset</VisuallyHidden>
          </button>
        </div>
      </div>
    </Card>
  );
}

export default CircularColorsDemo;
