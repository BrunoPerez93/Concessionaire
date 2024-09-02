'use client'

import { NavigationMenu, NavigationMenuList } from "../ui/navigation-menu";
import { NavLink } from "./NavLink";
import { BitcoinIcon } from "lucide-react";
import { ThemeToggle } from '../ThemeToggle';
import { useAuth } from "../context/AuthContext";

export const Navbar = () => {
    const { isLoggedIn, logout } = useAuth();

    return (
        <nav className="flex justify-between p-5 items-center">
            <BitcoinIcon size={50} />
            <NavigationMenu>
                <NavigationMenuList>
                    <NavLink text='Inicio' href='/' />
                    <NavLink text='Autos' href='/autos' />
                    <NavLink text='Cotizacion' href='/' />
                    <NavLink text='Contactenos' href='/' />
                    {!isLoggedIn ? (
                        <NavLink text='Login' href='/login' />
                    ) : (
                        <>
                            <NavLink text='Agregar Auto' href='/addCar' />
                            <NavLink text='Logout' onClick={logout} />
                        </>
                    )}

                </NavigationMenuList>
            </NavigationMenu>
            <ThemeToggle />
        </nav>
    );
}
