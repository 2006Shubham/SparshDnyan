export default function InfoCard({ step }) {
  const steps = [
    {
      title: "Head",
      text: "Yeh Head hai. Isme aankhen, kaan, naak aur muh hote hain.",
    },
    {
      title: "Chest & Stomach",
      text: "Yeh Chest aur Pet hai. Yeh sharir ka beech ka hissa hai.",
    },
    {
      title: "Private Body Part",
      text:
        "Yeh private body part hota hai. Sirf mummy-papa ya doctor ke samne hi theek hota hai.",
    },
    {
      title: "Full Body",
      text:
        "Yeh tumhara poora sharir hai. Agar koi galat touch kare to NO bolo aur batao.",
    },
  ];

  return (
    <div className="relative bg-white shadow-xl rounded-2xl p-6 max-w-md border-4 border-green-400">

      {/* ARROW */}
      <div className="absolute -left-8 top-1/2 -translate-y-1/2 text-4xl animate-bounce">
        👉
      </div>

      <h2 className="text-xl font-semibold text-green-700 mb-2 text-center">
        {steps[step-1].title}
      </h2>

      <p className="text-gray-700 text-lg text-center">
        {steps[step-1].text}
      </p>
    </div>
  );
}
