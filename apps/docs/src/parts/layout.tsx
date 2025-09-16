import { useLocation } from "@solidjs/router";
import { Scrollbar } from "jige-ui";
import type { ParentComponent } from "solid-js";
import { defaultSections, Sidebar, type SideSection } from "./sidebar";
import "../styles/mdx.css";

interface LayoutProps {
  sections?: SideSection[];
  showSidebar?: boolean;
}

export const Layout: ParentComponent<LayoutProps> = (props) => {
  const location = useLocation();
  const sections = () => props.sections || defaultSections;
  const showSidebar = () => props.showSidebar !== false;

  // Detect if current route is an MDX file by checking common MDX routes
  const isMDXRoute = () => {
    const path = location.pathname;
    return (
      path.startsWith("/components/") ||
      path.startsWith("/installation") ||
      path.startsWith("/quick-start") ||
      path.startsWith("/about") ||
      path.startsWith("/theming") ||
      path.startsWith("/customization") ||
      path.startsWith("/typescript") ||
      path.startsWith("/examples") ||
      path.startsWith("/migration") ||
      path.startsWith("/contributing")
    );
  };

  return (
    <div class="flex h-[calc(100vh-4rem)] w-full">
      {showSidebar() && <Sidebar sections={sections()} />}
      <main class="flex-1 h-full bg-t-bg1">
        <Scrollbar>
          <div
            class={`max-w-4xl mx-auto p-6 ${isMDXRoute() ? "mdx-content" : ""}`}
          >
            {props.children}
          </div>
        </Scrollbar>
      </main>
    </div>
  );
};
