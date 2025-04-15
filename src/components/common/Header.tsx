type Props = {
  onRetry: () => void;
};

export default function Header({ onRetry }: Props) {
  const handleOnClick = () => {
    window.location.reload();
    // onRetry();
  };

  return (
    <header className="flex h-[60px] w-full items-center justify-between text-lg">
      <button className={""} onClick={handleOnClick}>
        Card HL
      </button>
      <button className={"size-12 rounded-full hover:bg-neutral-600/20"}>
        버튼
      </button>
    </header>
  );
}
