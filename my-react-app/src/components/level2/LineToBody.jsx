export default function LineToBody({ from, to, safe }) {
  // from {x, y}, to {x, y} as percentages
  const color = safe ? "bg-green-400" : "bg-red-400";
  const style = {
    left: `${from.x}%`,
    top: `${from.y}%`,
    width: `${Math.hypot(to.x - from.x, to.y - from.y) * 1.5}%`,
    transform: `rotate(${Math.atan2(to.y - from.y, to.x - from.x)}rad)`,
    transformOrigin: "0 0",
  };
  return <div className={`${color} absolute h-1`} style={style}></div>;
}
