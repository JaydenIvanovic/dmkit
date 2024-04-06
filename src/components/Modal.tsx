type ModalProps = {
  children: React.ReactNode;
  onCloseCallback: () => void;
};
export function Modal({ children, onCloseCallback }: ModalProps) {
  return (
    <div className="flex flex-col absolute bg-[color:#352337e8] w-full sm:w-4/5 h-screen p-4 max-w-[1200px]">
      <div className="flex">
        <button className="ml-auto self-end" onClick={onCloseCallback}>
          <CloseIcon />
        </button>
      </div>
      <div className="overflow-y-auto h-full">{children}</div>
    </div>
  );
}

function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-12 h-12"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  );
}
