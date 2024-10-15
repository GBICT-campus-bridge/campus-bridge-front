import axios from "axios";
import React, { MutableRefObject, useEffect, useRef } from "react";

import { useInfiniteQuery } from "@tanstack/react-query";

import BackHeader from "@/components/BackHeader";
import DocumentItem from "@/components/DocumentItem";
import Footer from "@/components/Footer";
import DocumentSkeleton from "@/components/DocumentSkeleton";

interface UseObserverProps {
  target: MutableRefObject<Element | null>; // Ref 객체로 전달되는 DOM 요소
  rootMargin?: string; // rootMargin의 기본값은 "0px"
  threshold?: number | number[]; // threshold는 0~1 사이의 숫자 또는 숫자 배열
  onIntersect: IntersectionObserverCallback; // IntersectionObserver 콜백 타입
}

export default function HistoryPage() {
  const apiUrl = "https://jsonplaceholder.typicode.com";
  const pageLimit = 15;

  const fetchDocuments = async ({ pageParam }: { pageParam: number }) => {
    const response = await axios.get(
      apiUrl + `/posts?_page=${pageParam}&_limit=${pageLimit}`
    );
    const documents = response.data;
    return documents;
  };

  const { data, fetchNextPage, isLoading, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["documents"],
      queryFn: fetchDocuments,
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.length < pageLimit) {
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
    entry.isIntersecting && fetchNextPage();
  };

  const bottomRef = useRef<HTMLDivElement>(null);

  useObserver({
    target: bottomRef,
    onIntersect,
  });

  return (
    <>
      <BackHeader />
      <div className="bg-slate-100 overflow-auto">
        <div className="pt-[80px] pb-[80px] w-10/12 h-[calc(100%-60px)] mx-auto flex flex-col gap-6">
          {isLoading && <DocumentSkeleton />}
          {data?.pages.map((group, i) => (
            <React.Fragment key={i}>
              {group.map((document: any) => (
                <DocumentItem key={document.id} document={document} />
              ))}
            </React.Fragment>
          ))}
          {isFetchingNextPage ? (
            <DocumentSkeleton />
          ) : (
            <div ref={bottomRef}></div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
