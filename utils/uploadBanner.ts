import { db } from '../firebase/firebase'; // Importe a instância do Firestore
import { doc, updateDoc } from 'firebase/firestore';

const uploadBannerImgBB = async (file: File, estabelecimentoId: string) => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await fetch('https://api.imgbb.com/1/upload?key=YOUR_API_KEY', {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();
  if (data.success) {
    const imageUrl = data.data.url;

    // Salvar a URL do banner no Firestore
    const estabelecimentoRef = doc(db, 'estabelecimentos', estabelecimentoId);
    await updateDoc(estabelecimentoRef, {
      bannerUrl: imageUrl, // Atualizando a URL do banner
    });

    return imageUrl;
  } else {
    throw new Error('Erro ao fazer upload da imagem');
  }
};