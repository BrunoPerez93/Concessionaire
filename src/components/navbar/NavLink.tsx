import Link from "next/link"
import { NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from "../ui/navigation-menu"

interface NavLinkProps {
    text: string;
    href: string;
}

export const NavLink: React.FC<NavLinkProps> = ({ text, href }) => {
    return (
        <NavigationMenuItem>
            <Link href={href} legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {text}
                </NavigationMenuLink>
            </Link>
        </NavigationMenuItem>
    )
}