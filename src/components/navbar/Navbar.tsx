import { NavigationMenu, NavigationMenuList } from "../ui/navigation-menu";
import { NavLink } from "./NavLink";
import { BitcoinIcon } from "lucide-react";
import { ThemeToggle } from '../ThemeToggle';

export const Navbar = () => {
    return (
        <nav className="flex justify-between p-5 items-center">
            <BitcoinIcon size={50} />
            <NavigationMenu>
                <NavigationMenuList>
                    <NavLink text='Inicio' href='/' />
                    <NavLink text='Nuevos' href='/' />
                    <NavLink text='Usados' href='/' />
                    <NavLink text='Cotizacion' href='/' />
                    <NavLink text='Contactenos' href='/' />
                    <NavLink text='Login' href='/login' />
                </NavigationMenuList>
            </NavigationMenu>
            <ThemeToggle />
        </nav>
    );
}
