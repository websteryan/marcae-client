"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import ThemeSwitcher from "@/components/theme-switcher";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function NavBar() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Para evitar erros de hidratação, asseguramos que o componente só seja renderizado após o cliente montar.
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // ou um fallback, como um "loading spinner"
  }

  // Defina os itens de menu uma vez
  const menuItems = [
    { label: "Estabelecimentos", href: "/estabelecimentos" },
    { label: "Funcionalidades", href: "#funcionalidades" },
    { label: "Preços", href: "#precos" },
    { label: "Perguntas Frequentes", href: "#faq"}

  ];

  const logoSrc = theme === "dark" ? "/logo-clara.svg" : "/logo-escura.svg";

  return (
    <Navbar isBlurred maxWidth="xl">
      {/* Menu de Celular */}
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>
      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <a href="/"> <img src={logoSrc} alt="Ícone" className="w-full h-auto max-w-[120px]" /></a>
          
        </NavbarBrand>
      </NavbarContent>

      {/* Menu de Desktop */}
      <NavbarContent className="hidden sm:flex gap-8 " justify="center">
        <NavbarBrand>
        <a href="/"> <img src={logoSrc} alt="Ícone" className="w-full h-auto max-w-[120px]" /></a>

        </NavbarBrand>
        {menuItems.map((item) => (
          <NavbarItem key={item.label} className="justify-c">
            <Button as={Link} href={item.href} variant="light" size="md">
              {item.label}
            </Button>
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* Menu de Links e Botões Extras */}
      <NavbarContent justify="end">
        <NavbarItem className="hidden sm:flex">
          <Button
            as={Link}
            color="primary"
            variant="solid"
            size="sm"
            className="text-white"
          >
            Saiba mais{" "}
            {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg> */}
           </Button>
        </NavbarItem>
        <NavbarItem>
          {/* <ThemeSwitcher /> */}
        </NavbarItem>
      </NavbarContent>

      {/* Menu de Celular */}
      <NavbarMenu>
        {menuItems.map((item) => (
          <NavbarMenuItem key={item.label}>
            <Link className="w-full" href={item.href} size="lg" color="foreground">
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}