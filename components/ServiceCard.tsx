// src/components/ServiceCard.tsx
import { Button } from '@nextui-org/react';

interface ServiceCardProps {
  nome: string;
  preco: number;
  duracao: number;
  onSelect: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ nome, preco, duracao }) => {
  return (
    <div className="p-4 bg-white shadow-lg rounded-lg grid gap-1">
      <h3 className="font-medium text-lg">{nome}</h3>
      <p className="text-sm text-gray-500">{duracao >= 60 ? `${Math.floor(duracao / 60)} h` : `${duracao} min`}</p>
      <p className="text-sm ">R$ {preco}</p>
    </div>
  );
};

export default ServiceCard;