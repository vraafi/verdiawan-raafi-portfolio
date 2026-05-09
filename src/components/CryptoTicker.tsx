import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CryptoTicker() {
  const [price, setPrice] = useState<number | null>(null);
  const [prevPrice, setPrevPrice] = useState<number | null>(null);
  const [direction, setDirection] = useState<"up" | "down" | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchPrice = async () => {
    try {
      const res = await fetch("https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT");
      const data = await res.json();
      const newPrice = parseFloat(data.price);
      setPrice((prev) => {
        if (prev !== null) {
          setPrevPrice(prev);
          setDirection(newPrice > prev ? "up" : newPrice < prev ? "down" : null);
        }
        return newPrice;
      });
    } catch {
      // silently fail — keep last known price
    }
  };

  useEffect(() => {
    fetchPrice();
    intervalRef.current = setInterval(fetchPrice, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const glowColor =
    direction === "up"
      ? "rgba(0,255,100,0.5)"
      : direction === "down"
      ? "rgba(255,50,50,0.5)"
      : "rgba(0,255,255,0.3)";

  const textColor =
    direction === "up"
      ? "text-green-400"
      : direction === "down"
      ? "text-red-400"
      : "text-primary";

  return (
    <motion.div
      data-testid="crypto-ticker"
      className="fixed bottom-6 right-6 z-40 glassmorphism border border-primary/30 px-4 py-3 min-w-[200px]"
      style={{ boxShadow: `0 0 20px ${glowColor}, 0 0 60px ${glowColor}33` }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
    >
      {/* Header row */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-green-400"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
          <span className="mono-text text-[10px] text-primary/60 tracking-[0.3em] uppercase">
            LIVE
          </span>
        </div>
        <span className="mono-text text-[10px] text-foreground/40 tracking-widest">
          BTC/USDT
        </span>
      </div>

      {/* Price display */}
      <div className="flex items-end gap-2">
        <AnimatePresence mode="popLayout">
          {price !== null ? (
            <motion.span
              key={price}
              className={`hud-text text-xl font-bold tabular-nums ${textColor}`}
              initial={{ y: direction === "up" ? 10 : -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.25 }}
            >
              ${price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </motion.span>
          ) : (
            <motion.span
              key="loading"
              className="hud-text text-xl font-bold text-primary/40 tabular-nums"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            >
              SYNCING...
            </motion.span>
          )}
        </AnimatePresence>

        {direction && (
          <motion.span
            className={`mono-text text-xs mb-0.5 ${direction === "up" ? "text-green-400" : "text-red-400"}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            {direction === "up" ? "▲" : "▼"}
          </motion.span>
        )}
      </div>

      {/* Corner decorators */}
      <div className="absolute top-0.5 left-0.5 w-2 h-2 border-t border-l border-primary/60" />
      <div className="absolute bottom-0.5 right-0.5 w-2 h-2 border-b border-r border-primary/60" />
    </motion.div>
  );
}
