import { useState, useEffect } from 'react';

export const useAboutAnimations = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedText, setAnimatedText] = useState("");
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  const roles = ["Software Engineer", "Tech Innovator", "Problem Solver"];

  useEffect(() => {
    // Trigger fade in animation
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  // Typewriter effect for roles
  useEffect(() => {
    if (!isVisible) return;

    let currentText = "";
    let currentIndex = 0;
    const currentRole = roles[currentRoleIndex];

    const typeWriter = () => {
      if (currentIndex < currentRole.length) {
        currentText += currentRole.charAt(currentIndex);
        setAnimatedText(currentText);
        currentIndex++;
        setTimeout(typeWriter, 100);
      } else {
        // Wait then move to next role
        setTimeout(() => {
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }, 2000);
      }
    };

    typeWriter();
  }, [isVisible, currentRoleIndex]);

  return {
    isVisible,
    animatedText,
    roles,
    currentRoleIndex
  };
};