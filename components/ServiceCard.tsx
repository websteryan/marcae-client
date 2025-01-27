// src/components/ServiceCard.tsx
import { Button } from '@nextui-org/react';

interface ServiceCardProps {
  nome: string;
  preco: number;
  duracao: number;
  onSelect: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ nome, preco, duracao, onSelect }) => {
  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <h3 className="font-medium text-lg">{nome}</h3>
      <p className="text-sm text-gray-500">Preço: R${preco}</p>
      <p className="text-sm text-gray-500">Duração: {duracao} min</p>
      <Button onClick={onSelect} className="mt-3">Agendar</Button>
    </div>
  );
};

export default ServiceCard;