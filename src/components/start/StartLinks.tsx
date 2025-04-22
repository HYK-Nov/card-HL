import { Link } from "react-router";
import { BiLogoGithub, BiSolidTrophy } from "react-icons/bi";

export default function StartLinks() {
  const handleGithub = () => {
    window.open("https://github.com/HYK-Nov/card-HL", "_blank");
  };

  return (
    <div className={"fixed top-0 mt-4 flex w-3xl justify-between"}>
      <Link to={"/ranking"}>
        <BiSolidTrophy className="size-[48px] cursor-pointer rounded-full p-1 text-amber-400 hover:bg-neutral-100/50" />
      </Link>

      <BiLogoGithub
        onClick={handleGithub}
        className={
          "size-[48px] cursor-pointer rounded-full p-1 hover:bg-neutral-100/50"
        }
      />
    </div>
  );
}
