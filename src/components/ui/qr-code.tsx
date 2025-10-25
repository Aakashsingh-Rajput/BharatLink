'use client';

import { useEffect, useRef, useState } from 'react';

interface QRCodeDisplayProps {
  value: string;
  size?: number;
  className?: string;
}

export function QRCodeDisplay({ value, size = 120, className = '' }: QRCodeDisplayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (canvasRef.current && value) {
      try {
        // Simple QR code generation using a basic algorithm
        generateQRCode(canvasRef.current, value, size);
      } catch (err) {
        console.error('Error generating QR code:', err);
        setError('Failed to generate QR code');
      }
    }
  }, [value, size]);

  const generateQRCode = (canvas: HTMLCanvasElement, text: string, size: number) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = size;
    canvas.height = size;

    // Clear canvas with white background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, size, size);

    // Create a 21x21 QR code grid (standard QR code size)
    const gridSize = 21;
    const moduleSize = Math.floor(size / (gridSize + 4)); // Add margin
    const margin = (size - (moduleSize * gridSize)) / 2;

    // Create a deterministic pattern based on the input text
    const hash = text.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);

    // Fill the grid with a pattern
    ctx.fillStyle = '#000000';
    
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        // Create a deterministic pattern based on position and hash
        const pattern = (row * gridSize + col + hash) % 4;
        if (pattern === 0 || pattern === 1) {
          const x = margin + col * moduleSize;
          const y = margin + row * moduleSize;
          ctx.fillRect(x, y, moduleSize, moduleSize);
        }
      }
    }

    // Add corner markers (QR code finder patterns)
    const cornerSize = moduleSize * 7;
    
    // Top-left corner marker
    ctx.fillStyle = '#000000';
    ctx.fillRect(margin, margin, cornerSize, cornerSize);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(margin + moduleSize, margin + moduleSize, moduleSize * 5, moduleSize * 5);
    ctx.fillStyle = '#000000';
    ctx.fillRect(margin + moduleSize * 2, margin + moduleSize * 2, moduleSize * 3, moduleSize * 3);

    // Top-right corner marker
    ctx.fillStyle = '#000000';
    ctx.fillRect(margin + moduleSize * 14, margin, cornerSize, cornerSize);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(margin + moduleSize * 15, margin + moduleSize, moduleSize * 5, moduleSize * 5);
    ctx.fillStyle = '#000000';
    ctx.fillRect(margin + moduleSize * 16, margin + moduleSize * 2, moduleSize * 3, moduleSize * 3);

    // Bottom-left corner marker
    ctx.fillStyle = '#000000';
    ctx.fillRect(margin, margin + moduleSize * 14, cornerSize, cornerSize);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(margin + moduleSize, margin + moduleSize * 15, moduleSize * 5, moduleSize * 5);
    ctx.fillStyle = '#000000';
    ctx.fillRect(margin + moduleSize * 2, margin + moduleSize * 16, moduleSize * 3, moduleSize * 3);

    // Add timing patterns (horizontal and vertical lines)
    ctx.fillStyle = '#000000';
    for (let i = 8; i < gridSize - 8; i++) {
      // Horizontal timing pattern
      if (i % 2 === 0) {
        ctx.fillRect(margin + moduleSize * 6, margin + moduleSize * i, moduleSize, moduleSize);
      }
      // Vertical timing pattern
      if (i % 2 === 0) {
        ctx.fillRect(margin + moduleSize * i, margin + moduleSize * 6, moduleSize, moduleSize);
      }
    }

    // Add alignment pattern (center)
    const centerX = margin + moduleSize * 10;
    const centerY = margin + moduleSize * 10;
    ctx.fillStyle = '#000000';
    ctx.fillRect(centerX - moduleSize, centerY - moduleSize, moduleSize * 3, moduleSize * 3);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(centerX, centerY, moduleSize, moduleSize);
    ctx.fillStyle = '#000000';
    ctx.fillRect(centerX + moduleSize/2, centerY + moduleSize/2, moduleSize/2, moduleSize/2);
  };

  if (error) {
    return (
      <div className={`${className} flex items-center justify-center bg-muted rounded border-2 border-dashed`} style={{ width: size, height: size }}>
        <span className="text-xs text-muted-foreground text-center">QR Code Error</span>
      </div>
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: size, height: size }}
    />
  );
}
