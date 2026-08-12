'use client';

import { useEffect, useState } from "react";
import { extractColors } from "extract-colors";

interface DynamicColorBackgroundProps {
  imageUrl?: string | null;
}

export default function DynamicColorBackground({ imageUrl }: DynamicColorBackgroundProps) {
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
        const glow = `rgba(${primaryObj.red}, ${primaryObj.green}, ${primaryObj.blue}, 0.45)`;

        setColors({ primary, secondary, glow });
        setIsLoaded(true);
      })
      .catch((err) => {
        if (!isMounted) return;
        console.warn("extract-colors fallback triggered:", err);
        const hash = Array.from(imageUrl).reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const hue = hash % 360;
        setColors({
          primary: `hsl(${hue}, 70%, 45%)`,
          secondary: `hsl(${hue}, 60%, 15%)`,
          glow: `hsla(${hue}, 80%, 55%, 0.35)`,
        });
        setIsLoaded(true);
      });

    return () => {
      isMounted = false;
    };
  }, [imageUrl]);

  return (
    <div className="absolute inset-x-0 top-0 h-[650px] sm:h-[800px] pointer-events-none overflow-hidden -z-10 transition-opacity duration-1000">
      {/* YouTube Ambient Cinematic Blurred Backdrop */}
      {imageUrl && (
        <div
          className="absolute inset-0 bg-cover bg-center filter blur-[90px] scale-125 opacity-40 transition-opacity duration-1000"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
      )}

      {/* Dynamic Vibrant Gradient Mesh */}
      <div
        className="absolute inset-0 transition-colors duration-700 ease-out"
        style={{
          background: `
            radial-gradient(ellipse 85% 55% at 50% -5%, ${colors.glow} 0%, transparent 80%),
            radial-gradient(circle 480px at 12% 18%, ${colors.primary} 0%, transparent 70%),
            radial-gradient(circle 420px at 88% 12%, ${colors.secondary} 0%, transparent 70%),
            linear-gradient(to bottom, rgba(9,9,11,0.15) 0%, rgba(9,9,11,0.75) 50%, #09090b 100%)
          `,
        }}
      />

      {/* Glassmorphic Fade Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background" />
    </div>
  );
}
