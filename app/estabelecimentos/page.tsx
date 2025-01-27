"use client";

import { useEffect, useState } from "react";
import { db } from "@/firebase/firebase"; // Supondo que você tenha o Firebase configurado
import { collection, getDocs } from "firebase/firestore";
import { Button, Link } from "@nextui-org/react";
import NavBar from "@/components/navbar"; // Assumindo que o Navbar está no diretório components

interface Estabelecimento {
  id: string;
  nome: string;
  url: string;
}

const EstabelecimentosPage = () => {
  const [estabelecimentos, setEstabelecimentos] = useState<Estabelecimento[]>([]);

  // Função para buscar os dados dos estabelecimentos
  const fetchEstabelecimentos = async () => {
    try {
      const infosRef = collection(db, "estabelecimentos");
      const snapshot = await getDocs(infosRef);
      const dados = snapshot.docs.map((doc) => ({
        id: doc.id,
        nome: doc.data().nome,
        url: doc.data().url,
      }));
      setEstabelecimentos(dados);
    } catch (error) {
      console.error("Erro ao buscar estabelecimentos:", error);
    }
  };

  useEffect(() => {
    fetchEstabelecimentos();
  }, []);

  return (
    <div>
      <NavBar />
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">Estabelecimentos</h1>
        <ul className="space-y-4">
          {estabelecimentos.map((estabelecimento) => (
            <li key={estabelecimento.id} className="flex justify-between items-center">
              <span className="text-lg">{estabelecimento.nome}</span>
              <Button as={Link} href={estabelecimento.id}  variant="light" size="sm">
                Visitar
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EstabelecimentosPage;