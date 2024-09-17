import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import {ThemeSwitcher} from "@/Components/ThemeSwitcher";
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function AppNavbar() {
    return (
        <Navbar shouldHideOnScroll>
            <Link href="/">
            <ApplicationLogo />
            </Link>
            <NavbarBrand>
                <p className="font-bold text-inherit">SHD Cloud</p>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link href="https://shdtw.cloud/">
                        官方網站
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link href="https://dc.shdtw.cloud/">
                        支援社群
                    </Link>
                </NavbarItem>

            </NavbarContent>
            <NavbarContent justify="end">

                <NavbarItem>
                    <Button as={Link} color="primary" href="/login" variant="flat">
                        登入
                    </Button>
                </NavbarItem>
                <ThemeSwitcher />
            </NavbarContent>
        </Navbar>
    );
}
