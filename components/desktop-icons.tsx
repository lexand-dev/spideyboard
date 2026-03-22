"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "motion/react";
import Image from "next/image";

interface DesktopIconProps {
  id: string;
  src: string;
  alt: string;
  x: number;
  y: number;
  size: number;
  label: string;
  delay: number;
  draggingId: string | null;
}

function DesktopIcon({
  id,
  src,
  alt,
  x,
  y,
  size,
  label,
  delay,
  draggingId,
}: DesktopIconProps) {
  const isDragging = draggingId === id;

  return (
    <motion.div
      className={`absolute flex flex-col items-center gap-1 cursor-grab select-none ${
        isDragging ? "cursor-grabbing z-50" : "z-10"
      }`}
      style={{
        left: x,
        top: y,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: 1, 
        scale: isDragging ? 1.1 : 1,
      }}
      transition={{
        duration: 0.5,
        delay: delay,
        ease: "backOut",
      }}
      whileHover={{ scale: 1.1 }}
    >
      <div
        className="relative p-2 rounded-lg transition-all duration-200 group-hover:bg-white/10 group-hover:backdrop-blur-sm"
        style={{
          width: size,
          height: size,
        }}
      >
        <Image
          src={src}
          alt={alt}
          width={size - 16}
          height={size - 16}
          className="w-full h-full object-contain drop-shadow-lg pointer-events-none"
          draggable={false}
        />
      </div>
      <span className="text-xs text-white font-medium text-center max-w-[80px] truncate px-1 py-0.5 rounded bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {label}
      </span>
    </motion.div>
  );
}

interface IconConfig {
  id: string;
  src: string;
  x: number;
  y: number;
  size: number;
  label: string;
}

const desktopIcons: IconConfig[] = [
  { id: "icon-1", src: "/icons/1.png", x: 10, y: 25, size: 110, label: "My Files" },
  { id: "icon-2", src: "/icons/2.png", x: 30, y: 20, size: 120, label: "Projects" },
  { id: "icon-3", src: "/icons/3.png", x: 50, y: 30, size: 100, label: "Gallery" },
  { id: "icon-4", src: "/icons/4.png", x: 70, y: 25, size: 115, label: "Documents" },
  { id: "icon-5", src: "/icons/5.png", x: 85, y: 35, size: 105, label: "Videos" },
  { id: "icon-6", src: "/icons/6.png", x: 8, y: 50, size: 110, label: "Music" },
  { id: "icon-7", src: "/icons/7.png", x: 25, y: 55, size: 100, label: "Downloads" },
  { id: "icon-8", src: "/icons/8.png", x: 45, y: 60, size: 120, label: "Photos" },
  { id: "icon-9", src: "/icons/9.png", x: 65, y: 55, size: 105, label: "Settings" },
  { id: "icon-10", src: "/icons/10.png", x: 85, y: 60, size: 110, label: "Notes" },
  { id: "icon-11", src: "/icons/11.png", x: 15, y: 75, size: 115, label: "Calendar" },
  { id: "icon-12", src: "/icons/12.png", x: 40, y: 80, size: 100, label: "Contacts" },
];

const mobileIcons: IconConfig[] = [
  { id: "icon-1", src: "/icons/1.png", x: 20, y: 25, size: 80, label: "My Files" },
  { id: "icon-2", src: "/icons/2.png", x: 50, y: 20, size: 85, label: "Projects" },
  { id: "icon-3", src: "/icons/3.png", x: 80, y: 25, size: 80, label: "Gallery" },
  { id: "icon-4", src: "/icons/4.png", x: 20, y: 50, size: 85, label: "Documents" },
  { id: "icon-5", src: "/icons/5.png", x: 50, y: 50, size: 80, label: "Videos" },
  { id: "icon-6", src: "/icons/6.png", x: 80, y: 50, size: 85, label: "Music" },
];

function getInitialPositions(isMobile: boolean): Record<string, { x: number; y: number }> {
  const icons = isMobile ? mobileIcons : desktopIcons;
  const positions: Record<string, { x: number; y: number }> = {};
  
  icons.forEach((icon) => {
    const x = (icon.x / 100) * window.innerWidth;
    const y = (icon.y / 100) * window.innerHeight;
    positions[icon.id] = { x, y };
  });
  
  return positions;
}

export function DesktopIcons() {
  const [isMobile, setIsMobile] = useState(false);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>({});
  const dragStart = useRef<{ x: number; y: number; iconX: number; iconY: number } | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      if (Object.keys(positions).length === 0) {
        setPositions(getInitialPositions(mobile));
      }
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDragStart = useCallback((id: string, clientX: number, clientY: number, iconX: number, iconY: number) => {
    dragStart.current = {
      x: clientX,
      y: clientY,
      iconX: iconX,
      iconY: iconY,
    };
    setDraggingId(id);
  }, []);

  const handleDragMove = useCallback((clientX: number, clientY: number) => {
    if (!draggingId || !dragStart.current) return;

    const iconConfig = (isMobile ? mobileIcons : desktopIcons).find(i => i.id === draggingId);
    if (!iconConfig) return;

    const deltaX = clientX - dragStart.current.x;
    const deltaY = clientY - dragStart.current.y;
    
    let newX = dragStart.current.iconX + deltaX;
    let newY = dragStart.current.iconY + deltaY;

    const halfSize = iconConfig.size / 2;
    const maxX = window.innerWidth - halfSize;
    const maxY = window.innerHeight - halfSize;

    newX = Math.max(halfSize, Math.min(newX, maxX));
    newY = Math.max(halfSize, Math.min(newY, maxY));

    setPositions(prev => ({
      ...prev,
      [draggingId]: { x: newX, y: newY },
    }));
  }, [draggingId, isMobile]);

  const handleDragEnd = useCallback(() => {
    dragStart.current = null;
    setDraggingId(null);
  }, []);

  useEffect(() => {
    if (!draggingId) return;

    const handleMouseMove = (e: MouseEvent) => {
      handleDragMove(e.clientX, e.clientY);
    };

    const handleMouseUp = () => {
      handleDragEnd();
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handleDragMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleTouchEnd = () => {
      handleDragEnd();
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [draggingId, handleDragMove, handleDragEnd]);

  const icons = isMobile ? mobileIcons : desktopIcons;

  return (
    <div className="absolute inset-0 z-60 overflow-hidden">
      {icons.map((icon, index) => {
        const pos = positions[icon.id];
        if (!pos) return null;
        
        return (
          <div
            key={icon.id}
            onMouseDown={(e) => {
              e.preventDefault();
              handleDragStart(icon.id, e.clientX, e.clientY, pos.x, pos.y);
            }}
            onTouchStart={(e) => {
              if (e.touches.length > 0) {
                handleDragStart(icon.id, e.touches[0].clientX, e.touches[0].clientY, pos.x, pos.y);
              }
            }}
          >
            <DesktopIcon
              id={icon.id}
              src={icon.src}
              alt={icon.label}
              x={pos.x}
              y={pos.y}
              size={icon.size}
              label={icon.label}
              delay={index * 0.1}
              draggingId={draggingId}
            />
          </div>
        );
      })}
    </div>
  );
}

export { desktopIcons, mobileIcons };
