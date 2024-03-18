"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import ContainerHeader from "./containerHeader";
import LanguageHeader from "./languageHeader";

interface SidebarContainerProps {
  children: React.ReactNode;
  header: Boolean;
  sidebar?: Boolean;
  type?: "default" | "language";
  languageName?: string;
}

export default function SidebarContainer({
  children,
  header,
  sidebar = true,
  type = "default",
  languageName,
}: SidebarContainerProps) {
  return (
    <div className="w-full flex flex-col items-center pt-24 pb-20">
      <div className="flex justify-center gap-3 px-4 w-full sm:max-w-full md:max-w-[899px]">
        <div className="flex flex-col w-full lg:w-4/5 gap-3 mb-10">
          {header && type == "default" ? (
            <ContainerHeader type="default" />
          ) : null}
          {header && type == "language" ? (
            <LanguageHeader languageName={languageName || ""} />
          ) : null}
          {children}
        </div>
        {sidebar && (
          <div
            className="  flex-col w-full lg:w-1/5 hidden lg:flex gap-3"
            id="sidebar"
          >
            <Sidebar />
          </div>
        )}
      </div>
    </div>
  );
}
