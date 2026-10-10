"use client";

import { useEffect } from "react";

/**
 * Legacy homepage anchors (Phase 3J-AX). The homepage used to be NoorLife's
 * page; its NoorLife-only sections now live at /apps/noorlife. Fragments
 * never reach the server, so links such as /#signal or /#status are forwarded
 * here. #top, #about and #contact still exist on the company homepage.
 */
const MOVED = new Set(["#signal", "#status"]);

export function LegacyNoorLifeAnchors() {
  useEffect(() => {
    if (MOVED.has(window.location.hash)) {
      window.location.replace(`/apps/noorlife${window.location.hash}`);
    }
  }, []);
  return null;
}
