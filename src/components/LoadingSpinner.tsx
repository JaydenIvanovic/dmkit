export function LoadingSpinner() {
  return (
    <div className="animate-spin-1_5">
      <D6Die />
    </div>
  );
}

function D6Die() {
  const defaultFaceStyles = [
    "absolute",
    "w-full",
    "h-full",
    "flex",
    "justify-center",
    "items-center",
    "bg-opacity-70",
    "text-4xl",
  ].join(" ");

  return (
    <div className="flex relative [transform-style:preserve-3d] [transform:rotate3d(1,1,1,60deg)] [width:100px] [height:100px]">
      <div
        className={`${defaultFaceStyles} bg-red-500 [transform:translateZ(50px)]`}
      >
        1
      </div>
      <div
        className={`${defaultFaceStyles} bg-green-500 [transform:rotateY(180deg)_translateZ(50px)]`}
      >
        2
      </div>
      <div
        className={`${defaultFaceStyles} bg-blue-500 [transform:rotateY(90deg)_translateZ(50px)]`}
      >
        3
      </div>
      <div
        className={`${defaultFaceStyles} bg-yellow-500 [transform:rotateY(-90deg)_translateZ(50px)]`}
      >
        4
      </div>
      <div
        className={`${defaultFaceStyles} bg-purple-500 [transform:rotateX(90deg)_translateZ(50px)]`}
      >
        5
      </div>
      <div
        className={`${defaultFaceStyles} bg-orange-500 [transform:rotateX(-90deg)_translateZ(50px)]`}
      >
        6
      </div>
    </div>
  );
}
