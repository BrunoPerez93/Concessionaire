import Link from "next/link";
import {
    NavigationMenuItem,
    NavigationMenuLink,
    navigationMenuTriggerStyle,
} from "../ui/navigation-menu";

interface NavLinkProps {
    text: string;
    href?: string;
    onClick?: () => void;
}

export const NavLink: React.FC<NavLinkProps> = ({ text, href, onClick }) => {
    return (
        <NavigationMenuItem>
            {href ? (
                <Link href={href} legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        {text}
                    </NavigationMenuLink>
                </Link>
            ) : (
                <button
                    className={navigationMenuTriggerStyle()}
                    onClick={onClick}
                >
                    {text}
                </button>
            )}
        </NavigationMenuItem>
    );
};
