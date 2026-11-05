import type { ReactNode } from "react";
import Preloader from "./Preloader";
import SiteHeader from "./SiteHeader";
import SceneHost from "./SceneHost";
import Cursor from "./Cursor";
import Runtime from "./Runtime";

export default function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Preloader />
      <SceneHost />
      <SiteHeader />
      <main id="main-content">{children}</main>
      <Cursor />
      <Runtime />
    </>
  );
}
