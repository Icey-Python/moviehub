'use client';

import { useEffect, useState } from "react";
import { extractColors } from "extract-colors";

interface DynamicColorBackgroundProps {
  imageUrl?: string | null;
  className?: string;
}

export default function DynamicColorBackground({ imageUrl, className = "" }: DynamicColorBackgroundProps) {
  const [colors, setColors] = useState<{
    primary: string;
    secondary: string;
    glow: string;
  }>({
    primary: "rgba(39, 39, 42, 0.6)",
    secondary: "rgba(24, 24, 27, 0.9)",
    glow: "rgba(161, 161, 170, 0.15)",
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!imageUrl) return;

    let isMounted = true;

    extractColors(imageUrl, {
      crossOrigin: "anonymous",
      distance: 0.2,
    })
      .then((extracted) => {
        if (!isMounted || !extracted || extracted.length === 0) return;

        // Sort extracted colors by saturation and density area to find the most vibrant dominant color
        const sorted = [...extracted].sort(
          (a, b) => b.saturation * (b.area + 0.1) - a.saturation * (a.area + 0.1)
        );

        const primaryObj = sorted[0] || extracted[0];
        const secondaryObj = sorted[1] || extracted[1] || primaryObj;

        const primary = primaryObj.hex;
        const secondary = secondaryObj.hex;
        const glow = `rgba(${primaryObj.red}, ${primaryObj.green}, ${primaryObj.blue}, 0.65)`;

        setColors({ primary, secondary, glow });
        setIsLoaded(true);
      })
      .catch((err) => {
        if (!isMounted) return;
        console.warn("extract-colors fallback triggered:", err);
        const hash = Array.from(imageUrl).reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const hue = hash % 360;
        setColors({
          primary: `hsl(${hue}, 80%, 50%)`,
          secondary: `hsl(${hue}, 70%, 20%)`,
          glow: `hsla(${hue}, 85%, 60%, 0.55)`,
        });
        setIsLoaded(true);
      });

    return () => {
      isMounted = false;
    };
  }, [imageUrl]);

  return (
    <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-screen h-[750px] xs:h-[850px] sm:h-[950px] pointer-events-none overflow-hidden -z-10 transition-opacity duration-1000 ${className}`}>
      {/* YouTube Ambient Cinematic Blurred Backdrop */}
      {imageUrl && (
        <div
          className="absolute inset-0 bg-cover bg-center filter blur-[75px] scale-130 opacity-60 sm:opacity-65 transition-opacity duration-1000"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
      )}

      {/* Dynamic Vibrant Gradient Mesh */}
      <div
        className="absolute inset-0 transition-colors duration-700 ease-out"
        style={{
          background: `
            radial-gradient(ellipse 95% 65% at 50% -5%, ${colors.glow} 0%, transparent 85%),
            radial-gradient(circle 550px at 15% 15%, ${colors.primary} 0%, transparent 75%),
            radial-gradient(circle 500px at 85% 10%, ${colors.secondary} 0%, transparent 75%),
            linear-gradient(to bottom, transparent 0%, rgba(9,9,11,0.35) 45%, rgba(9,9,11,0.85) 75%, #09090b 100%)
          `,
        }}
      />

      {/* Top Glassmorphic Vignette Fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background" />
    </div>
  );
}
