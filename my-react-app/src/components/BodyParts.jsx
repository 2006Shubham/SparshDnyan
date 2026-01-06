import React from "react";

export default function BodyParts({ step }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 mt-6">

      {/* HEAD */}
      <div
        className={`
          w-20 h-20 rounded-full bg-pink-400
          transition-all duration-700 ease-out
          ${step >= 1 ? "opacity-100 scale-100" : "opacity-0 scale-0"}
        `}
      />

      {/* TORSO */}
      <div
        className={`
          w-24 h-32 rounded-xl bg-pink-300
          transition-all duration-700 ease-out
          ${step >= 2 ? "opacity-100 scale-100" : "opacity-0 scale-95"}
        `}
      />

      {/* LEGS */}
      <div
        className={`
          flex gap-4
          transition-all duration-700 ease-out
          ${step >= 3 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}
        `}
      >
        <div className="w-8 h-24 bg-pink-200 rounded-xl" />
        <div className="w-8 h-24 bg-pink-200 rounded-xl" />
      </div>

    </div>
  );
}
