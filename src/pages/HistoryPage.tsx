import { useTranslation } from "react-i18next";

import axios from "axios";
import React, { MutableRefObject, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { useInfiniteQuery } from "@tanstack/react-query";

import DocumentItem from "@/components/DocumentItem";
import DocumentSkeleton from "@/components/DocumentSkeleton";

import NoData from "@/assets/images/no-data.png";

interface UseObserverProps {
  target: MutableRefObject<Element | null>;
  rootMargin?: string;
  threshold?: number | number[];
  onIntersect: IntersectionObserverCallback;
}

export default function HistoryPage() {
  const { t } = useTranslation("page");

  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_URL;
  const pageLimit = 6;

  const fetchDocuments = async ({ pageParam }: { pageParam: number }) => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await axios.get(
          apiUrl + `/auth/docs?page=${pageParam}&size=${pageLimit}&sort=desc`,
          {
            headers: { Authorization: token },
          }
        );
        const documents = response.data.data || [];
        return documents;
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
          throw new Error(response.message);
        }
      }
    }
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["documents"],
    queryFn: fetchDocuments,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage && lastPage.length < pageLimit) {
        return undefined;
      }
      return allPages.length + 1;
    },
  });

  const useObserver = ({
    target,
    rootMargin = "0px",
    threshold = 1.0,
    onIntersect,
  }: UseObserverProps) => {
    useEffect(() => {
      let observer: IntersectionObserver | undefined;

      if (target && target.current) {
        observer = new IntersectionObserver(onIntersect, {
          root: null,
          rootMargin,
          threshold,
        });

        observer.observe(target.current);
      }
      return () => observer && observer.disconnect();
    }, [target, rootMargin, threshold, onIntersect]);
  };

  const onIntersect = ([entry]: IntersectionObserverEntry[]) => {
    entry.isIntersecting && !isError && fetchNextPage();
  };

  const bottomRef = useRef<HTMLDivElement>(null);

  useObserver({
    target: bottomRef,
    onIntersect,
  });

  return (
    <>
      <div className="mt-[20px] h-full overflow-auto">
        <div className="w-10/12 mx-auto flex flex-col gap-6">
          {isLoading && <DocumentSkeleton />}
          {isError && <div className="text-red-500">{t("HistoryErrMsg")}</div>}
          {data && data.pages[0][0]?.id ? (
            data.pages.map((group, i) => (
              <React.Fragment key={i}>
                {group.map(
                  (document: {
                    url: string;
                    id: number;
                    title: string;
                    createdAt: string;
                  }) => (
                    <DocumentItem key={document.id} document={document} />
                  )
                )}
              </React.Fragment>
            ))
          ) : (
            <div className="w-full h-[80vh] flex flex-col justify-center items-center gap-4">
              <img src={NoData} alt="No data" className="w-32 opacity-50" />
              <p className="text-slate-400 font-bold">{t("NoHistory")}</p>
            </div>
          )}
          {isFetchingNextPage ? (
            <DocumentSkeleton />
          ) : (
            hasNextPage && <div ref={bottomRef}></div>
          )}
        </div>
      </div>
    </>
  );
}
