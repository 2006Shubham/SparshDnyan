export default function NextButton({ step, setStep }) {
  return (
    <button
      onClick={() => setStep((prev) => Math.min(prev + 1, 3))}
      className="mt-6 px-8 py-3 bg-green-600 text-white text-lg font-bold rounded-full shadow-lg hover:bg-green-700 transition"
    >
      {step < 3 ? "Next" : "Level Complete"}
    </button>
  );
}
