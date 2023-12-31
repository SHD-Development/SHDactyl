import React, { FC, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Switch } from "@nextui-org/react";
import MoonIcon from "./MoonIcon";
import SunIcon from "./SunIcon";

interface ThemeSwitcherProps {}

export const ThemeSwitcher: FC<ThemeSwitcherProps> = () => {
    const handleModeChange = (isSelected: boolean) => {
        if (isSelected) {
            setTheme("light");
        } else {
            setTheme("dark");
        }
    };

    const [mounted, setMounted] = useState<boolean>(false);
    const { theme, setTheme } = useTheme();
    const [isSelected, setIsSelected] = useState<boolean>(true);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <Switch
            onValueChange={handleModeChange}
            size="lg"
            color="success"
            startContent={<SunIcon />}
            endContent={<MoonIcon />}
        />
    );
};
