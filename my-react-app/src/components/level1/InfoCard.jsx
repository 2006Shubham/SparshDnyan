export default function InfoCard({ step }) {
  const steps = [
    {
      title: "डोके",
      text: "हे डोके आहे. यामध्ये डोळे, कान, नाक आणि तोंड असते.",
    },
    {
      title: "छाती आणि पोट",
      text: "ही छाती आणि पोट आहे. हा शरीराचा मधला भाग आहे.",
    },
    {
      title: "खासगी शरीर भाग",
      text: "हे खासगी शरीर भाग आहेत. फक्त आई-वडील किंवा डॉक्टरांसमोरच याची चर्चा करावी.",
    },
    {
      title: "संपूर्ण शरीर",
      text: "हे तुमचे संपूर्ण शरीर आहे. जर कोणी अयोग्य स्पर्श करत असेल तर 'नाही' म्हणा आणि कळवा.",
    },
  ];

  return (
    <div className="relative bg-white shadow-xl rounded-2xl p-6 max-w-md border-4 border-green-400">

      {/* बाण */}
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