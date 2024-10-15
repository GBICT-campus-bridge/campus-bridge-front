export default function DocumentSkeleton() {
  return (
    <>
      {Array.from({ length: 10 }).map((_, index) => (
        <div
          className="flex items-center gap-4 h-[100px] animate-pulse"
          key={index}
        >
          <div className="w-[80px] h-[80px] object-cover rounded bg-slate-200" />
          <div>
            <div className="mb-[20px] w-[calc(75vw-80px)] h-4 bg-slate-200 rounded"></div>
            <div className="h-2 bg-slate-200 col-span-2"></div>
          </div>
        </div>
      ))}
    </>
  );
}
