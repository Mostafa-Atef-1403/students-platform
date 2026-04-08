import React from "react";

export interface PageLayoutProps {
  page: string;
  children: React.ReactNode; // => this It accepts anything that can be rendered for this prop, in our case it's gonna be structure.
}

export interface quizzesTapsProps {
  activeTap: string;
  setActiveTap: (tab: string) => void;
}
