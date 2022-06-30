import { useSession } from "next-auth/react";
import { SVGProps } from "react";
import handleIsLogedIn from "../utils/helpers/handleIsLogedIn";

interface Props {
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  bg: string;
  id: string;
  count: number;
  color: string;
  onClick?: () => void;
}

const TweetButton = ({ Icon, bg, color, count, onClick, id }: Props) => {
  const { data: session }: { data: any } = useSession();

  return (
    <div
      className={`group flex space-x-1 items-center transition-all duration-200 ${color}`}>
      <Icon
        className={`secondary-icon sm:w-10 sm:h-10 rounded-full p-1 ${bg} ${color}`}
        onClick={handleIsLogedIn(session, onClick)}
        role="button"
      />
      {count > 0 && <small>{count}</small>}
    </div>
  );
};

export default TweetButton;
