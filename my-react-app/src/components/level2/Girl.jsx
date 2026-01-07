export default function Girl({ image, highlights }) {
  return (
    <div className="relative w-48 h-48 flex justify-center items-center z-10">
      <img
        src={image} // /src/assets/girl.jpg
        alt="Girl"
        className="w-48 h-48 rounded-full border-4 border-pink-500 object-cover shadow-lg"
      />
      {highlights.map((part, idx) => (
        <div
          key={idx}
          style={{
            top: part.top,
            left: part.left,
            width: part.size,
            height: part.size,
          }}
          className={`absolute rounded-full border-2 ${
            part.highlight
              ? "border-red-600 ring-4 ring-red-300 animate-pulse"
              : "border-yellow-400"
          }`}
        ></div>
      ))}
    </div>
  );
}
