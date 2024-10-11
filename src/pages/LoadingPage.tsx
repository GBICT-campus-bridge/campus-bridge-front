import { useTranslation } from "react-i18next";

import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Tesseract from "tesseract.js";

import ErrorModal from "@/components/ErrorModal";

export default function LoadingPage() {
  const { t } = useTranslation("page");

  const location = useLocation();
  const navigate = useNavigate();
  const croppedImage = location.state?.croppedImage;

  const [showModal, setShowModal] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (croppedImage) {
      const imageObjectURL = URL.createObjectURL(croppedImage);
      setImageUrl(imageObjectURL);
    } else {
      setShowModal(true);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [croppedImage, navigate]);

  useEffect(() => {
    if (imageUrl) {
      Tesseract.recognize(imageUrl, "kor", {
        logger: (m) => {
          if (m.status === "recognizing text") {
            const progressValue = (m.progress * 100).toFixed(2);
            setProgress(parseFloat(progressValue));
          }
        },
      })
        .then(({ data: { text } }) => {
          navigate("/result", { state: { text } });
        })
        .catch((error) => {
          console.error("OCR error:", error);
          setShowModal(true);
        });
    }
  }, [imageUrl]);

  return (
    <>
      {showModal && <ErrorModal />}
      {croppedImage && (
        <div className="wmx-auto flex justify-center items-center h-lvh">
          <div className="fixed z-10 text-center">
            <iframe src="https://lottie.host/embed/a807f7e6-9b39-48ef-9e50-183909786a6a/3dS6Zu16YD.json"></iframe>{" "}
            <span className="text-white font-bold drop-shadow">
              {t("Translating")} {progress}%
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
