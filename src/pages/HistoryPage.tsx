import axios from "axios";
import React, { MutableRefObject, useEffect, useRef } from "react";

import { useInfiniteQuery } from "@tanstack/react-query";

import DocumentItem from "@/components/DocumentItem";
import DocumentSkeleton from "@/components/DocumentSkeleton";

interface UseObserverProps {
  target: MutableRefObject<Element | null>;
  rootMargin?: string;
  threshold?: number | number[];
  onIntersect: IntersectionObserverCallback;
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
      <div className="mt-[20px] h-full overflow-auto">
        <div className="w-10/12 mx-auto flex flex-col gap-6">
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
    </>
  );
}
