"use client"
import customTheme from "@/utils/theme/custom-theme";
import { useContext, useEffect } from "react";
import { CustomFooter } from "../components/frontend-pages/layout/CustomFooter";
import { AnnouncementBar } from "../components/frontend-pages/layout/header/AnnouncementBar";
import Header from "../components/frontend-pages/layout/header/Header";
import { ThemeProvider } from "flowbite-react";




export default function HomeLayout({ children, }: { children: React.ReactNode }) {

    return (
        <div className="frontend-page" >
            <ThemeProvider theme={customTheme}>
                <AnnouncementBar />
                <Header />
                <section>
                    {children} 
                </section>
                <CustomFooter/>
            </ThemeProvider>
        </div>
    )
}