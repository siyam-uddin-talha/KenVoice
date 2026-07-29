'use client';

import React, { useRef, useState, useEffect } from 'react';
import { PenTool, Type, Upload, RotateCcw, Trash2, CheckCircle2 } from 'lucide-react';

interface SignaturePadProps {
  signatureType: 'none' | 'draw' | 'type' | 'upload';
  onTypeChange: (type: 'none' | 'draw' | 'type' | 'upload') => void;
  signatureText: string;
  onTextChange: (text: string) => void;
  signatureImage: string;
  onImageChange: (image: string) => void;
}

export function SignaturePad({
  signatureType,
  onTypeChange,
  signatureText,
  onTextChange,
  signatureImage,
  onImageChange,
}: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef(false);
  const lastPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (signatureType !== 'draw' || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    ctx.strokeStyle = '#161917';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.clearRect(0, 0, rect.width, rect.height);
  }, [signatureType]);

  const getCoordinates = (e: any) => {
    if (!canvasRef.current) return { x: 0, y: 0 };
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    if (e.touches && e.touches[0]) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    isDrawingRef.current = true;
    const pos = getCoordinates(e);
    lastPosRef.current = pos;
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawingRef.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const currentPos = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
    ctx.lineTo(currentPos.x, currentPos.y);
    ctx.stroke();
    lastPosRef.current = currentPos;
  };

  const stopDrawing = () => {
    if (!isDrawingRef.current || !canvasRef.current) return;
    isDrawingRef.current = false;
    onImageChange(canvasRef.current.toDataURL('image/png'));
  };

  const clearCanvas = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(
      0,
      0,
      canvas.width / (window.devicePixelRatio || 1),
      canvas.height / (window.devicePixelRatio || 1)
    );
    onImageChange('');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onImageChange(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-[#161917]">
          Signature Option
        </label>
        <span className="text-xs text-[#626a64]">
          {signatureType === 'none' ? 'Default (No signature)' : 'Signature Enabled'}
        </span>
      </div>

      {/* Signature Type Tabs */}
      <div className="grid grid-cols-4 gap-2">
        <button
          type="button"
          onClick={() => {
            onTypeChange('none');
            onImageChange('');
            onTextChange('');
          }}
          className={`py-2 px-2 rounded-lg text-xs font-serif font-semibold border transition-all cursor-pointer text-center ${
            signatureType === 'none'
              ? 'bg-[#2b4c33] text-white border-[#2b4c33]'
              : 'bg-[#f5f4ef] text-[#626a64] border-[#c4cbc5] hover:bg-[#d1ded3]/40'
          }`}
        >
          None
        </button>
        <button
          type="button"
          onClick={() => onTypeChange('draw')}
          className={`py-2 px-2 rounded-lg text-xs font-serif font-semibold flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
            signatureType === 'draw'
              ? 'bg-[#2b4c33] text-white border-[#2b4c33]'
              : 'bg-[#f5f4ef] text-[#626a64] border-[#c4cbc5] hover:bg-[#d1ded3]/40'
          }`}
        >
          <PenTool className="w-3.5 h-3.5" /> Draw
        </button>
        <button
          type="button"
          onClick={() => onTypeChange('type')}
          className={`py-2 px-2 rounded-lg text-xs font-serif font-semibold flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
            signatureType === 'type'
              ? 'bg-[#2b4c33] text-white border-[#2b4c33]'
              : 'bg-[#f5f4ef] text-[#626a64] border-[#c4cbc5] hover:bg-[#d1ded3]/40'
          }`}
        >
          <Type className="w-3.5 h-3.5" /> Type
        </button>
        <button
          type="button"
          onClick={() => onTypeChange('upload')}
          className={`py-2 px-2 rounded-lg text-xs font-serif font-semibold flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
            signatureType === 'upload'
              ? 'bg-[#2b4c33] text-white border-[#2b4c33]'
              : 'bg-[#f5f4ef] text-[#626a64] border-[#c4cbc5] hover:bg-[#d1ded3]/40'
          }`}
        >
          <Upload className="w-3.5 h-3.5" /> Upload
        </button>
      </div>

      {/* Signature Method Body */}
      {signatureType === 'draw' && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#626a64]">Sign inside the box below:</span>
            <button
              type="button"
              onClick={clearCanvas}
              className="text-[#2b4c33] hover:underline flex items-center gap-1 cursor-pointer font-semibold"
            >
              <RotateCcw className="w-3 h-3" /> Clear Pad
            </button>
          </div>
          <div className="border border-[#c4cbc5] rounded-lg bg-white relative h-28 overflow-hidden touch-none">
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className="w-full h-full cursor-crosshair"
            />
          </div>
        </div>
      )}

      {signatureType === 'type' && (
        <div className="space-y-2">
          <input
            type="text"
            value={signatureText}
            onChange={(e) => onTextChange(e.target.value)}
            placeholder="Type your full legal name..."
            className="w-full bg-[#f5f4ef] border border-[#c4cbc5] text-[#161917] focus:border-[#2b4c33] focus:ring-1 focus:ring-[#2b4c33] transition-all rounded-lg text-sm px-3.5 py-2 outline-none"
          />
          {signatureText && (
            <div className="p-3 bg-white border border-[#c4cbc5] rounded-lg">
              <span className="text-[10px] text-[#626a64] block font-mono uppercase mb-1">
                Cursive Signature Preview
              </span>
              <span className="font-serif italic text-2xl font-bold text-[#161917] tracking-wider block">
                {signatureText}
              </span>
            </div>
          )}
        </div>
      )}

      {signatureType === 'upload' && (
        <div className="space-y-2">
          {signatureImage ? (
            <div className="flex items-center justify-between p-3 bg-white border border-[#c4cbc5] rounded-lg">
              <img
                src={signatureImage}
                alt="Signature Preview"
                className="max-h-12 object-contain"
              />
              <button
                type="button"
                onClick={() => onImageChange('')}
                className="text-red-700 hover:text-red-900 text-xs font-semibold flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" /> Remove
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-[#c4cbc5] hover:border-[#2b4c33] rounded-lg cursor-pointer bg-[#f5f4ef] transition-colors">
              <Upload className="w-5 h-5 text-[#626a64] mb-1" />
              <span className="text-xs font-semibold text-[#161917]">
                Upload Signature Image
              </span>
              <span className="text-[10px] text-[#626a64]">PNG or JPG transparent image</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          )}
        </div>
      )}
    </div>
  );
}
