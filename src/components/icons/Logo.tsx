import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="180" height="40" viewBox="0 0 180 40" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}> {/* Adjusted width for longer text */}
      <rect width="180" height="40" rx="8" fill="hsl(var(--primary))"/>
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontFamily="var(--font-geist-sans), Arial, sans-serif" fontSize="18" fontWeight="bold" fill="hsl(var(--primary-foreground))"> {/* Adjusted font size */}
        N.Y_GROUP_PVL
      </text>
    </svg>
  );
}
