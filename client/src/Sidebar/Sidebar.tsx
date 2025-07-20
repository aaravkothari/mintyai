import React from "react";
import { Title } from "./Title";
import { Search } from "./Search";
import { RouteSelect } from "./RouteSelect";
import { HelpSection } from "./HelpSection";

export const Sidebar = ({ selected, setSelected }: { selected: string, setSelected: Function }) => {
  return (
    <div>
      <div className="overflow-y-auto sticky top-4 h-[calc(100vh-32px-48px)]">
        <Title />
        <Search />
        <RouteSelect value={selected} setValue={setSelected} />
      </div>
      <HelpSection setValue={setSelected} />
    </div>
  );
};