'use client'
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {Moon, Sun} from "lucide-react";

export function ModeToggle() {
    const { setTheme, theme: currentTheme } = useTheme();
    const [theme, setLocalTheme] = useState(currentTheme);

    useEffect(() => {
        setLocalTheme(currentTheme);
    }, [currentTheme]);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className={"w-auto p-2 bg-transparent"}>
                    <Sun className={`h-5 w-5 ${theme === 'dark' ? 'hidden' : 'block'} `} />
                    <Moon className={`h-5 w-5 ${theme === 'light' ? 'hidden' : 'block'}`} />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}