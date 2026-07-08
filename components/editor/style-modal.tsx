'use client';

import { useState } from 'react';
import { useResumeStore } from '@/store/resume-store';
import { X } from 'lucide-react';

interface StyleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const COLOR_PRESETS = [
  { name: 'Indigo', value: '#4F46E5' },
  { name: 'Purple', value: '#7C3AED' },
  { name: 'Blue', value: '#0EA5E9' },
  { name: 'Cyan', value: '#06B6D4' },
  { name: 'Teal', value: '#14B8A6' },
  { name: 'Green', value: '#10B981' },
  { name: 'Emerald', value: '#059669' },
  { name: 'Red', value: '#EF4444' },
  { name: 'Pink', value: '#EC4899' },
  { name: 'Orange', value: '#F97316' },
  { name: 'Amber', value: '#F59E0B' },
  { name: 'Black', value: '#000000' },
];

export function StyleModal({ isOpen, onClose }: StyleModalProps) {
  const { resumeData, updateCustomization } = useResumeStore();
  const currentColor = resumeData.customization.accentColor || '#4F46E5';
  const [selectedColor, setSelectedColor] = useState(currentColor);
  const [customColor, setCustomColor] = useState(currentColor);

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    setCustomColor(color);
    updateCustomization({ accentColor: color });
  };

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    setCustomColor(color);
    setSelectedColor(color);
    updateCustomization({ accentColor: color });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#0D0D20] border border-white/10 rounded-xl shadow-2xl max-w-md w-full mx-4 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-white">Customize Style</h2>
          <button
            onClick={onClose}
            className="text-white/40 hover:text-white transition-colors p-1.5 hover:bg-white/10 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Color Presets Section */}
        <div className="mb-6">
          <label className="text-sm font-semibold text-white mb-3 block">
            Accent Color
          </label>
          <div className="grid grid-cols-4 gap-3">
            {COLOR_PRESETS.map((preset) => (
              <button
                key={preset.value}
                onClick={() => handleColorSelect(preset.value)}
                className={`w-full aspect-square rounded-lg transition-all transform hover:scale-110 ${
                  selectedColor === preset.value
                    ? 'ring-2 ring-offset-2 ring-offset-[#0D0D20] ring-white scale-110'
                    : 'hover:ring-1 hover:ring-white/20'
                }`}
                style={{ backgroundColor: preset.value }}
                title={preset.name}
              />
            ))}
          </div>
        </div>

        {/* Custom Color Picker */}
        <div className="mb-6">
          <label className="text-sm font-semibold text-white mb-3 block">
            Custom Color
          </label>
          <div className="flex gap-3">
            <input
              type="color"
              value={customColor}
              onChange={handleCustomColorChange}
              className="w-12 h-12 rounded-lg cursor-pointer border border-white/10"
            />
            <input
              type="text"
              value={customColor}
              onChange={(e) => {
                setCustomColor(e.target.value);
                try {
                  if (/^#[0-9A-F]{6}$/i.test(e.target.value)) {
                    setSelectedColor(e.target.value);
                    updateCustomization({ accentColor: e.target.value });
                  }
                } catch {
                  // Invalid color, ignore
                }
              }}
              placeholder="#4F46E5"
              className="flex-1 bg-white/5 border border-white/10 text-white placeholder-white/30 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Template Preview */}
        <div className="mb-6">
          <label className="text-sm font-semibold text-white mb-3 block">
            Preview
          </label>
          <div
            className="w-full h-24 rounded-lg border border-white/10 p-4 text-white/90 flex flex-col justify-center"
            style={{ backgroundColor: selectedColor + '20', borderColor: selectedColor + '40' }}
          >
            <div className="font-bold" style={{ color: selectedColor }}>
              Sample Text
            </div>
            <div className="text-xs text-white/60 mt-2">
              Your resume will use this color
            </div>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full px-4 py-2 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 font-semibold transition-all duration-200"
        >
          Done
        </button>
      </div>
    </div>
  );
}
