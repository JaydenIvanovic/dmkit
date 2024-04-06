export function D4Die() {
  return (
    <div className="[transform-style:preserve-3d] relative">
      <TriangleDieFace value={4} />
      {/* <TriangleDieFace value={2} />
      <TriangleDieFace value={3} />
      <TriangleDieFace value={4} /> */}
    </div>
  );
}

type TriangleDieFaceProps = {
  value: number;
};
function TriangleDieFace({ value }: TriangleDieFaceProps) {
  return (
    <div className="[clip-path:polygon(0%_100%,_50%_0%,_100%_100%)] w-[70px] h-[60px] bg-green-700 flex justify-center items-center absolute">
      <span className="pt-3">{value}</span>
    </div>
  );
}
