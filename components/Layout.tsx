import { ReactNode } from "react";
import Searchbar from "./Searchbar";
import Sidebar from "./Sidebar";

interface ILayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: ILayoutProps) => {
  return (
    <>
      <main className="grid grid-cols-9">
        <Sidebar />
        <div className="col-span-7">
          <header className="p-3 sticky top-0 z-50">
            <Searchbar />
          </header>
          {children}
        </div>
      </main>
    </>
  );
};

export default Layout;
