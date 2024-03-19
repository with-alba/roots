"use client";

import { toast } from "sonner";
import { Button } from "~/components/ui";

export function ShareButton() {
  const handleShare = () => {
    const url = window.location.href;
    void navigator.clipboard.writeText(url);
    toast.success("Link copiado al portapapeles");
  };
  return (
    <Button className="max-sm:hidden" onClick={handleShare} variant="special">
      Compartir búsqueda
    </Button>
  );
}
