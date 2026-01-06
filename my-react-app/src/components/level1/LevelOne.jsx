import { useState } from "react";
import Body from "./BodyParts";
import InfoCard from "./InfoCard";
import NextButton from "./NextButton";

export default function LevelOne() {
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-green-100 p-6">
      <h1 className="text-3xl font-bold text-blue-800 mb-8 text-center">
        SparshDnyan – Know Your Body
      </h1>

      <div className="flex flex-col md:flex-row items-center justify-center gap-12">

        {/* LEFT */}
        <div className="flex justify-center w-full md:w-1/2">
          <Body step={step} />
        </div>

        {/* RIGHT */}
        <div className="flex flex-col items-center w-full md:w-1/2 gap-6">
          <InfoCard step={step} />
          <NextButton step={step} setStep={setStep} />
        </div>

      </div>
    </div>
  );
}
