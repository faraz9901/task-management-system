import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsAdmin, useLogout } from "@/features/auth/hooks/useAuth";
import { navLinks } from "@/lib/constants";
import { LogOut, Menu } from "lucide-react";
import { Link, useLocation } from "react-router";
import { Button } from "./ui/button";

export default function NavWidget() {
    const location = useLocation();
    const isAdmin = useIsAdmin();
    const logout = useLogout();

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-10 w-10  transition-all hover:shadow-none"
                    >
                        <Menu />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                    align="end"
                    side="top"
                    className="w-52"
                >
                    {isAdmin && navLinks.map((link) => {
                        const Icon = link.icon;
                        const active = location.pathname === link.path;

                        return (
                            <DropdownMenuItem asChild key={link.path}>
                                <Link
                                    to={link.path}
                                    className={`flex items-center gap-2 ${active ? "font-semibold" : ""
                                        }`}
                                >
                                    <Icon className="h-4 w-4" />
                                    <span>{link.name}</span>
                                </Link>
                            </DropdownMenuItem>
                        );
                    })}



                    <DropdownMenuItem asChild key={"logout-button"}>
                        <span
                            onClick={() => logout.mutateAsync()}
                            className={`flex items-center gap-2 w-full`}
                        >
                            <LogOut className="h-4 w-4" />
                            <span>{"Logout"}</span>
                        </span>
                    </DropdownMenuItem>

                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}