import BackHeader from "@/components/BackHeader";
import Footer from "@/components/Footer";
import HomeHeader from "@/components/HomeHeader";
import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

export default function Layout() {
  const location = useLocation();
  const DisalbedFooterPaths = ["/camera", "/loading", "/login", "/signup"];
  const BackHeaderPaths = ["/history", "/document", "/profile"];
  const HomeHeaderPaths = ["/login", "/signup", "/result"];

  const [isFooterDisplayed, setIsFooterDisplayed] = useState<boolean>(false);
  const [isBackHeaderDisplayed, setIsBackHeaderDisplayed] =
    useState<boolean>(false);
  const [isHomeHeaderDisplayed, setIsHomeHeaderDisplayed] =
    useState<boolean>(false);

  useEffect(() => {
    const shouldDisableFooter = DisalbedFooterPaths.some((path) =>
      location.pathname.startsWith(path)
    );
    setIsFooterDisplayed(!shouldDisableFooter);

    const shoudDisplayedBackHeader = BackHeaderPaths.some((path) =>
      location.pathname.startsWith(path)
    );
    setIsBackHeaderDisplayed(shoudDisplayedBackHeader);

    const shoudDisplayedHomeHeader = HomeHeaderPaths.some((path) =>
      location.pathname.startsWith(path)
    );
    setIsHomeHeaderDisplayed(shoudDisplayedHomeHeader);
  }, [location.pathname]);

  return (
    <>
      <div
        className={`bg-slate-100 w-lvw h-lvh mx-auto overflow-hidden ${
          isFooterDisplayed ? "pb-[80px]" : ""
        } ${isBackHeaderDisplayed || isHomeHeaderDisplayed ? "pt-[60px]" : ""}`}
      >
        {" "}
        {isHomeHeaderDisplayed && <HomeHeader />}
        {isBackHeaderDisplayed && <BackHeader />}
        <Outlet />
        {isFooterDisplayed && <Footer />}
      </div>
    </>
  );
}
