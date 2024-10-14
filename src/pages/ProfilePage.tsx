import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useTranslation } from "react-i18next";
import HomeHeader from "@/components/HomeHeader";
import Footer from "@/components/Footer";

export default function ProfilePage() {
  const { t } = useTranslation("page");

  const navigate = useNavigate();

  const [user, setUser] = useState<{ token: string; nickname: string } | null>(
    null
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    const nickname = localStorage.getItem("nickname");
    if (token && nickname) {
      setUser({ token, nickname });
    }
  }, []);

  const onLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("nickname");
    navigate("/");
  };

  return (
    <>
      <HomeHeader />
      <div className="mx-12 pt-[100px] flex flex-col gap-10">
        <div className="flex gap-8">
          <div> {t("Nickname")}</div>
          <div className="font-bold">{user?.nickname}</div>
        </div>
        <hr />
        <ul className="flex flex-col gap-8">
          <li>
            {" "}
            <div onClick={onLogout}>{t("LogOut")}</div>
          </li>
          <li> {t("ResetHistory")}</li>
          <li> {t("DeleteAccount")}</li>
        </ul>
        <hr />
        <div> {t("TermsOfService")}</div>
      </div>
      <Footer />
    </>
  );
}
