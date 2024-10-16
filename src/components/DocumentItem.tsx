import { Link } from "react-router-dom";

export default function DocumentItem({
  document,
}: {
  document: {
    url: string;
    id: number;
    title: string;
    createdAt: string;
  };
}) {
  const date = new Date(document.createdAt);
  date.setHours(date.getHours() + 9);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  const formattedDateTime = date
    .toLocaleString("ko-KR", options)
    .replace(",", "")
    .replace(/\./g, ".");
  return (
    <>
      <Link to={`/document/${document.id}`}>
        <div className="flex items-center gap-4 h-[100px]">
          <img
            src={document.url}
            alt={document.title}
            className="min-w-[80px] max-w-[80px] min-h-[80px] max-h-[80px] object-cover rounded"
          />
          <div>
            <p className="font-bold mb-[10px] truncate w-[calc(75vw-80px)]">
              {document.title}
            </p>
            <p className="text-slate-400">{formattedDateTime}</p>
          </div>
        </div>
      </Link>
    </>
  );
}
