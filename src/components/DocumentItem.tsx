import { Link } from "react-router-dom";

import DocuImg from "@/assets/images/docu_dummy.jpg";

export default function DocumentItem({
  document,
}: {
  document: {
    id: number;
    title: string;
    body: string;
  };
}) {
  return (
    <>
      <Link to={`/document/${document.id}`}>
        <div className="flex items-center gap-4 h-[100px]">
          <img
            src={DocuImg}
            alt={document.title}
            className="min-w-[80px] max-h-[80px] object-cover rounded"
          />
          <div>
            <p className="font-bold mb-[10px] truncate w-[calc(75vw-80px)]">
              {document.title}
            </p>
            <p className="text-slate-400">2024.10.15</p>
          </div>
        </div>
      </Link>
    </>
  );
}
