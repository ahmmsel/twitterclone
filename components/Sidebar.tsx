import Image from "next/image";
import { useRouter } from "next/router";
import {
  HomeIcon,
  HashtagIcon,
  BellIcon,
  ChatAlt2Icon,
  BookmarkIcon,
  UserIcon,
  LoginIcon,
} from "@heroicons/react/outline";
import SidebarButton from "./SidebarButton";
import { signIn, signOut, useSession } from "next-auth/react";

interface Session {
  data?: any;
}

const Sidebar = () => {
  const { data: session }: Session = useSession();

  const router = useRouter();

  const handleNavigate = (path: string) => {
    return () => {
      router.push(path);
    };
  };

  return (
    <section className="sticky top-0 flex flex-col h-screen col-span-2 items-center md:items-start border-r border-color px-3">
      <div className="relative m-3 mb-0 w-10 h-10">
        <Image src="/logo.svg" layout="fill" objectFit="contain" />
      </div>
      <div className="my-4 flex flex-col justify-between h-full items-center md:items-start gap-6">
        <div className="my-4 flex flex-col gap-4">
          {session ? (
            <>
              <SidebarButton
                Icon={HomeIcon}
                title="home"
                onClick={handleNavigate("/")}
              />
              <SidebarButton Icon={HashtagIcon} title="explore" />
              <SidebarButton Icon={BellIcon} title="notifiction" />
              <SidebarButton Icon={ChatAlt2Icon} title="message" />
              <SidebarButton Icon={BookmarkIcon} title="bookmark" />
              <SidebarButton Icon={UserIcon} title="profile" />
            </>
          ) : (
            <SidebarButton Icon={LoginIcon} title="login" onClick={signIn} />
          )}
        </div>
        {/* User Information */}
        {session && (
          <div
            className="group flex justify-between items-center gap-4 transition-all duration-200 rounded-full hover:bg-gray-200 p-3"
            role="button"
            onClick={() => signOut()}>
            <img
              src={session.user?.image}
              alt={session.user?.email}
              className="w-8 h-8 md:w-14 md:h-14 object-cover rounded-full"
            />
            <div className="hidden lg:flex flex-col truncate group-hover:text-blue-400">
              <h2 className="text-lg font-semibold">{session.user?.name}</h2>
              <p className="text-xs font-medium">{session.user?.email}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Sidebar;
