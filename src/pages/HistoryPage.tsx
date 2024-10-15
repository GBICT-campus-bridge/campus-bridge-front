import axios from "axios";
import React from "react";

import { useInfiniteQuery } from "@tanstack/react-query";

import BackHeader from "@/components/BackHeader";
import DocumentItem from "@/components/DocumentItem";
import Footer from "@/components/Footer";

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

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
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

  return (
    <>
      <BackHeader />
      <div className="bg-slate-100 overflow-auto">
        <div className="pt-[80px] pb-[80px] w-10/12 h-[calc(100%-60px)] mx-auto flex flex-col gap-6">
          {data?.pages.map((group, i) => (
            <React.Fragment key={i}>
              {group.map((document: any) => (
                <DocumentItem key={document.id} document={document} />
              ))}
            </React.Fragment>
          ))}
          <div>
            <button
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
            >
              {isFetchingNextPage
                ? "로딩 중.."
                : hasNextPage
                ? "불러오기"
                : "데이터 끝"}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
