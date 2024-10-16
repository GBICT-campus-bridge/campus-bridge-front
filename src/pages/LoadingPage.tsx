import { useTranslation } from "react-i18next";

import axios from "axios";

import { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import ErrorModal from "@/components/ErrorModal";

export default function LoadingPage() {
  const { t } = useTranslation("page");

  const location = useLocation();
  const navigate = useNavigate();
  const croppedImage = location.state?.croppedImage;

  const [showModal, setShowModal] = useState(false);

  useMemo(() => {
    if (!croppedImage) {
      setShowModal(true);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } else {
      const apiUrl = import.meta.env.VITE_API_URL;
      const fetchOCR = async () => {
        const token = localStorage.getItem("token");

        const formData = new FormData();
        formData.append("document", croppedImage);

        try {
          const response = await axios.post(apiUrl + "/auth/docs", formData, {
            headers: { Authorization: token },
          });
          navigate("/result", {
            state: { document: response.data },
          });
        } catch (error: any) {
          const response = error.response.data;
          if (
            response.status === 401 &&
            (response.message === "Token has expired" ||
              response.message === "invalid token Data")
          ) {
            localStorage.removeItem("token");
            localStorage.removeItem("nickname");
            navigate("/login");
          } else {
            alert(
              "이미지 텍스트 인식 중 오류가 발생했습니다. 메인페이지로 돌아갑니다."
            );
            navigate("/");
            console.error(response.message);
          }
        }
      };
      fetchOCR();
    }
  }, [croppedImage, navigate]);

  return (
    <>
      {showModal && <ErrorModal />}
      {croppedImage && (
        <div className="wmx-auto flex justify-center items-center h-lvh">
          <div className="fixed z-10 text-center">
            <iframe src="https://lottie.host/embed/a807f7e6-9b39-48ef-9e50-183909786a6a/3dS6Zu16YD.json"></iframe>{" "}
            <span className="text-white font-bold drop-shadow">
              {t("Translating")}
            </span>
          </div>
          <img
            src={croppedImage ? URL.createObjectURL(croppedImage) : ""}
            width="300px"
            className="rounded brightness-50 opacity-60"
          />
        </div>
      )}
    </>
  );
}
