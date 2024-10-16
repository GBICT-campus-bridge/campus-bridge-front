import { useTranslation } from "react-i18next";

import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { SegmentedControl } from "@radix-ui/themes";

interface DocumentType {
  id: number;
  original: string;
  translated: string;
}
export default function DocumentPage() {
  const { t } = useTranslation("page");

  const navigate = useNavigate();

  const [selectedTab, setSelectedTab] = useState("text_translated");
  const [document, setDocument] = useState<DocumentType | null>(null);

  const { documentId } = useParams();

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const fetchDocument = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          apiUrl + `/auth/docs/docsId/${documentId}`,
          {
            headers: { Authorization: token },
          }
        );
        setDocument(response.data);
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
          navigate("/history");
          console.error(response.message);
        }
      }
    };
    fetchDocument();
  }, [documentId]);

  return (
    <>
      <div className="w-full flex justify-center pt-4 mt-6">
        <SegmentedControl.Root
          defaultValue="text_translated"
          radius="large"
          size="3"
          className="h-[50px]"
          onValueChange={setSelectedTab}
        >
          <SegmentedControl.Item value="text_original">
            {t("OriginalText")}
          </SegmentedControl.Item>
          <SegmentedControl.Item value="text_translated">
            {t("TranslatedResult")}
          </SegmentedControl.Item>
        </SegmentedControl.Root>
      </div>
      <div className="overflow-auto mt-8 mb-[50px] w-10/12 h-[calc(100vh-300px)] mx-auto flex flex-col gap-6">
        {document &&
          (selectedTab === "text_original" ? (
            <div className="whitespace-pre-line">{document.original}</div>
          ) : (
            <div className="whitespace-pre-line">번역본이 나올 예정...</div>
          ))}
      </div>
    </>
  );
}
