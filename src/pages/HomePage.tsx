import { useTranslation } from "react-i18next";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DropdownMenu, Button } from "@radix-ui/themes";

import MainLogo from "@/assets/images/main-logo.png";
import IconCamera from "@/assets/icons/icon_camera.svg";
import IconAlbum from "@/assets/icons/icon_album.svg";
import IconGlobe from "@/assets/icons/icon_globe.svg";

export default function HomePage() {
  const { t } = useTranslation("page");
  const { i18n } = useTranslation();

  const handleChangeLang = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const checkAuth = () => {
    if (!window.localStorage.getItem("token")) {
      navigate("/login");
    }
  };

  useEffect(() => {
    setSelectedImage(null);
  }, []);

  useEffect(() => {
    if (selectedImage) {
      navigate("/camera", { state: { selectedImage } });
    }
  }, [selectedImage]);

  return (
    <>
      <div className="fixed top-5 left-5">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Button
              variant="soft"
              className="bg-sky-200 text-sky-600 font-bold font-suite"
            >
              <img src={IconGlobe} />
              {t("Language")}
              <DropdownMenu.TriggerIcon />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item
              shortcut="🇰🇷"
              onClick={() => handleChangeLang("ko")}
            >
              {t("KO")}
            </DropdownMenu.Item>
            <DropdownMenu.Item
              shortcut="🇺🇸"
              onClick={() => handleChangeLang("us")}
            >
              {t("US")}
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>
      <div className="text-center w-8/12 lg:w-4/12 h-full flex flex-col justify-center mx-auto">
        <div className="text-4xl font-bold mb-16 text-sky-500 w-100vw mx-auto">
          <img src={MainLogo} alt="Campus Bridge" />
          <span className="text-xl text-sky-400">캠퍼스 브릿지</span>
        </div>
        <div className="flex flex-col gap-4">
          <div
            className="w-full h-24 bg-white rounded-xl shadow-clay-white"
            onClick={() => checkAuth()}
          >
            <label
              htmlFor="camera"
              className="flex justify-center items-center w-full h-full gap-4"
            >
              <img
                src={IconCamera}
                alt="camera"
                width="40px"
                className="ml-[-40px]"
              />
              <span className="text-sky-500 text-xl font-bold ml-[40px]">
                {t("Camera")}
              </span>
            </label>
            <input
              id="camera"
              className="hidden"
              accept="image/*"
              type="file"
              capture="environment"
              onChange={(e) => {
                if (!selectedImage && e.target && e.target.files) {
                  setSelectedImage(e.target.files[0]);
                }
              }}
            />
          </div>

          <div
            className="w-full h-24 bg-sky-400 rounded-xl shadow-clay-blue"
            onClick={() => checkAuth()}
          >
            <label
              htmlFor="gallery"
              className="flex justify-center items-center w-full h-full gap-4"
            >
              <img
                src={IconAlbum}
                alt="album"
                width="40px"
                className="ml-[-40px]"
              />
              <span className="text-white text-xl font-bold ml-[40px]">
                {t("Album")}
              </span>
            </label>
            <input
              id="gallery"
              className="hidden"
              accept="image/*"
              type="file"
              onChange={(e) => {
                if (!selectedImage && e.target && e.target.files) {
                  setSelectedImage(e.target.files[0]);
                }
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
