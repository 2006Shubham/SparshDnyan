export default function InfoCard({ info }) {
  return (
    <div className="bg-white shadow-xl rounded-2xl p-4 max-w-xs border-4 border-green-400">
      <h2 className="text-lg font-semibold text-green-700 mb-2">{info.title}</h2>
      <p className="text-gray-700">{info.text}</p>
    </div>
  );
}
