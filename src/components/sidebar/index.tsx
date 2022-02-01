import React from "react";
import SidebarButton from "./sidebar-button";

interface SidebarAxisAndRefs {
  profileRef: HTMLDivElement;
  name: string;
  id: string;
  yAxis: number;
}

interface ContentProps {
  content: SidebarAxisAndRefs[];
  focusedSidebarName: number;
}

const Sidebar = React.memo(({ content, focusedSidebarName }: ContentProps) => {
  const sidebarContent = content?.map(
    ({ name, id, profileRef, yAxis }: SidebarAxisAndRefs) => (
      <SidebarButton
        key={id}
        text={name}
        isFocused={focusedSidebarName === yAxis}
        onClick={() => profileRef.scrollIntoView()}
      />
    )
  );

  return (
    <div className='sidebar' data-testid='sidebar'>
      {sidebarContent}
    </div>
  );
});

export default Sidebar;
