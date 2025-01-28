import { useState } from "react";
import { db } from "@/firebase/firebase"; // Importe as funções do Firebase
import { PopoverForm } from "@/components/ui/popover-form"; // O PopoverForm existente
import { addDoc, collection } from "firebase/firestore";

export function LeadPopoverForm({
  open,
  setOpen,
  title = "Sign up",
  showSuccess,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  title?: string;
  showSuccess: boolean;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, "leads"), {
        name,
        email,
        createdAt: new Date(),
      });
      setLoading(false);
      setOpen(false); // Fecha o popover após o envio
    } catch (error) {
      console.error("Error adding document: ", error);
      setLoading(false);
    }
  };

  return (
    <PopoverForm
      open={open}
      setOpen={setOpen}
      title={title}
      showSuccess={showSuccess}
    >
      <div className="p-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nome
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              E-mail
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md"
              required
            />
          </div>

        </form>
      </div>
    </PopoverForm>
  );
}