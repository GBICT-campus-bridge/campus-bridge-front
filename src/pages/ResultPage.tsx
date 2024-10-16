import { useTranslation } from "react-i18next";

import { useState } from "react";

import { SegmentedControl, Button } from "@radix-ui/themes";

export default function ResultPage() {
  const { t } = useTranslation("page");

  const [selectedTab, setSelectedTab] = useState("text_translated");

  return (
    <>
      <div className="w-full flex justify-center mt-6">
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
      <div className="overflow-auto mt-8 w-10/12 h-[calc(100vh-360px)] mx-auto flex flex-col gap-6">
        {selectedTab === "text_original" ? (
          <div>오리지널 텍스트</div>
        ) : (
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl
            tincidunt eget nullam non. Quis hendrerit dolor magna eget est lorem
            ipsum dolor sit. Volutpat odio facilisis mauris sit amet massa.
            Commodo odio aenean sed adipiscing diam donec adipiscing tristique.
            Mi eget mauris pharetra et. Non tellus orci ac auctor augue. Elit at
            imperdiet dui accumsan sit. Ornare arcu dui vivamus arcu felis.
            Egestas integer eget aliquet nibh praesent. In hac habitasse platea
            dictumst quisque sagittis purus. Pulvinar elementum integer enim
            neque volutpat ac. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Nisl tincidunt eget nullam non. Quis hendrerit
            dolor magna eget est lorem ipsum dolor sit. Volutpat odio facilisis
            mauris sit amet massa. Commodo odio aenean sed adipiscing diam donec
            adipiscing tristique. Mi eget mauris pharetra et. Non tellus orci ac
            auctor augue. Elit at imperdiet dui accumsan sit. Ornare arcu dui
            vivamus arcu felis. Egestas integer eget aliquet nibh praesent. In
            hac habitasse platea dictumst quisque sagittis purus. Pulvinar
            elementum integer enim neque volutpat ac. Lorem ipsum dolor sit
            amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua. Nisl tincidunt eget nullam non.
            Quis hendrerit dolor magna eget est lorem ipsum dolor sit. Volutpat
            odio facilisis mauris sit amet massa. Commodo odio aenean sed
            adipiscing diam donec adipiscing tristique. Mi eget mauris pharetra
            et. Non tellus orci ac auctor augue. Elit at imperdiet dui accumsan
            sit. Ornare arcu dui vivamus arcu felis. Egestas integer eget
            aliquet nibh praesent. In hac habitasse platea dictumst quisque
            sagittis purus. Pulvinar elementum integer enim neque volutpat ac.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl
            tincidunt eget nullam non. Quis hendrerit dolor magna eget est lorem
            ipsum dolor sit. Volutpat odio facilisis mauris sit amet massa.
            Commodo odio aenean sed adipiscing diam donec adipiscing tristique.
            Mi eget mauris pharetra et. Non tellus orci ac auctor augue. Elit at
            imperdiet dui accumsan sit. Ornare arcu dui vivamus arcu felis.
            Egestas integer eget aliquet nibh praesent. In hac habitasse platea
            dictumst quisque sagittis purus. Pulvinar elementum integer enim
            neque volutpat ac.
          </div>
        )}
      </div>
      <div className="flex justify-center items-center h-36">
        <Button
          size="3"
          className="w-48 h-[50px] font-suite rounded-xl bg-sky-400 shadow-clay-blue-sm"
        >
          {t("Save")}
        </Button>
      </div>
    </>
  );
}
