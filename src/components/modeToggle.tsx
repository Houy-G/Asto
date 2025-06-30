'use client'

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Moon, Sun, Monitor } from 'lucide-react';

export function ModeToggle() {
    const { setTheme, theme, systemTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Prevent hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    // Don't render until mounted to avoid hydration mismatch
    if (!mounted) {
        return (
            <Button variant="outline" size="icon" className="w-auto p-2 bg-transparent">
                <Sun className="h-5 w-5" />
                <span className="sr-only">Toggle theme</span>
            </Button>
        );
    }

    // Use resolvedTheme to get the actual theme being applied
    const currentTheme = resolvedTheme;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="w-auto p-2 bg-transparent">
                    <Sun className={`h-5 w-5 transition-all ${currentTheme === 'dark' ? 'rotate-90 scale-0' : 'rotate-0 scale-100'}`} />
                    <Moon className={`absolute h-5 w-5 transition-all ${currentTheme === 'dark' ? 'rotate-0 scale-100' : '-rotate-90 scale-0'}`} />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                    <Sun className="mr-2 h-4 w-4" />
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                    <Moon className="mr-2 h-4 w-4" />
                    Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                    <Monitor className="mr-2 h-4 w-4" />
                    System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}