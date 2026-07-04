"use client";

import { useEffect, useState } from "react";

/** Live local time, shown next to the nav's contact email. */
export function Clock({ label }: { label: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () => setTime(new Date().toLocaleTimeString("en-US", { hour12: false }));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span suppressHydrationWarning>
      {label} {time ?? "--:--:--"}
    </span>
  );
}
