export default function Person({ person, onClick }) {
  return (
    <div
      className={`w-20 h-20 flex items-center justify-center rounded-full text-center font-bold cursor-pointer border-4 transition-all duration-300 
        ${
          person.selected
            ? person.safe
              ? "border-green-500 bg-green-100 ring-4 ring-green-300 animate-pulse"
              : "border-red-500 bg-red-100 ring-4 ring-red-300 animate-pulse"
            : "border-gray-400 bg-gray-200 hover:ring-2 hover:ring-blue-300"
        }`}
      style={{ position: "absolute", top: person.top, left: person.left, transform: "translate(-50%, -50%)" }}
      onClick={() => onClick(person)}
      title={`${person.name} (${person.type})`}
    >
      {person.name}
    </div>
  );
}
