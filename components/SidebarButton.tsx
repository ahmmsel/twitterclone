import React, { SVGProps } from "react";

interface Props {
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  title: string;
  onClick?: () => void;
}

const SidebarButton = ({ Icon, title, onClick }: Props) => {
  return (
    <div
      className="group flex space-x-2 max-w-fit items-center transition-all duration-200 rounded-full hover:bg-gray-200 p-3"
      role="button"
      onClick={onClick}>
      <Icon className="primary-icon" />
      <p className="hidden font-semibold capitalize text-xl group-hover:text-blue-400 md:block">
        {title}
      </p>
    </div>
  );
};

export default SidebarButton;
