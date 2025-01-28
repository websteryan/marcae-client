import React, { ReactNode } from "react";

export interface PopoverFormProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  showSuccess: boolean;
  children: ReactNode;  // Permite que o componente aceite o conteúdo de "children"
}

export const PopoverForm: React.FC<PopoverFormProps> = ({
  open,
  setOpen,
  title,
  showSuccess,
  children,
}) => {
  if (!open) return null; // Se não estiver aberto, nada será renderizado

  return (
    <div className="popover-form">
      {/* Título do popover */}
      <h3>{title}</h3>
      {/* Mostrar o conteúdo do form */}
      <div>{children}</div>
      {/* Talvez algum conteúdo de sucesso ou erro */}
      {showSuccess && <div>Cadastro realizado com sucesso!</div>}
    </div>
  );
};