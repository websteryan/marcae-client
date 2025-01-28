import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full max-w-screen-xl mx-auto px-4 py-28 gap-5 md:px-8 flex flex-col justify-between items-center">
      <h5 className="font-medium bg-gradient-to-b from-foreground to-muted-foreground text-transparent bg-clip-text">
        Siga-nos para mais atualizações e novidades!
      </h5>

      <Button
        as={Link}
        href="https://www.instagram.com/marcaebr"
        target="_blank"
        rel="noopener noreferrer"
        color="primary"
        variant="light"
        size="sm"
        className="flex items-center gap-2"
      >
        <Instagram size={16} className="text-primary" />
        Siga no Instagram
      </Button>
    </footer>
  );
};

export default Footer;