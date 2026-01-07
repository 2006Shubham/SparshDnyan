export default function InfoCard({ step, isPortrait }) {
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
    <div className={`relative bg-white shadow-md rounded-xl p-3 ${isPortrait ? 'border-2' : 'border-3'} border-green-400 h-full flex flex-col`}>

      {/* Arrow indicator */}
      {!isPortrait && (
        <div className="absolute -left-6 top-1/2 -translate-y-1/2 text-3xl">
          👉
        </div>
      )}

      <h2 className="text-sm sm:text-base font-semibold text-green-700 mb-1 text-center">
        {steps[step-1].title}
      </h2>

      <div className="flex-1 flex items-center">
        <p className="text-gray-700 text-xs sm:text-sm text-center leading-tight">
          {steps[step-1].text}
        </p>
      </div>
      
      {/* Step indicator */}
      <div className="mt-2 text-center">
        <div className="inline-block bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-[10px] font-bold">
          माहिती {step} / 4
        </div>
      </div>
    </div>
  );
}