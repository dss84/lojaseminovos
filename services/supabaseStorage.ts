import { supabase, isSupabaseConfigured } from '../config/supabaseClient';
import { Car } from '../types';
import { getCars, saveCar } from './storageService';

const BUCKET_NAME = 'car-images';
const TABLE_NAME = 'cars';

/**
 * Faz upload de uma imagem para o Supabase Storage
 */
export const uploadCarImage = async (file: File, carId: string): Promise<string | null> => {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase não configurado. Usando armazenamento local.');
    return null;
  }

  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${carId}/${Date.now()}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) throw error;

    // Obter URL pública da imagem
    const { data: { publicUrl } } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(data.path);

    return publicUrl;
  } catch (error) {
    console.error('Erro ao fazer upload da imagem:', error);
    return null;
  }
};

/**
 * Converte base64 para Blob e faz upload
 */
export const uploadBase64Image = async (base64: string, carId: string, index: number): Promise<string | null> => {
  if (!isSupabaseConfigured()) {
    return null;
  }

  try {
    // Converter base64 para blob
    const base64Data = base64.split(',')[1];
    const mimeType = base64.match(/data:([^;]+);/)?.[1] || 'image/jpeg';
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: mimeType });
    
    // Criar File a partir do Blob
    const fileExt = mimeType.split('/')[1];
    const file = new File([blob], `image-${index}.${fileExt}`, { type: mimeType });
    
    return await uploadCarImage(file, carId);
  } catch (error) {
    console.error('Erro ao converter base64:', error);
    return null;
  }
};

/**
 * Salva um carro no Supabase
 */
export const saveCarToSupabase = async (car: Car): Promise<boolean> => {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase não configurado. Salvando localmente.');
    return false;
  }

  try {
    // Upload de imagens se forem base64
    const uploadedImages: string[] = [];
    
    for (let i = 0; i < car.images.length; i++) {
      const image = car.images[i];
      
      if (image.startsWith('data:')) {
        // É base64, fazer upload
        const url = await uploadBase64Image(image, car.id, i);
        if (url) {
          uploadedImages.push(url);
        } else {
          uploadedImages.push(image); // Manter base64 se falhar
        }
      } else {
        // Já é URL
        uploadedImages.push(image);
      }
    }

    // Preparar dados para salvar
    const carData = {
      ...car,
      images: uploadedImages
    };

    // Salvar no Supabase
    const { error } = await supabase
      .from(TABLE_NAME)
      .upsert(carData);

    if (error) throw error;

    console.log('Carro salvo no Supabase com sucesso!');
    return true;
  } catch (error) {
    console.error('Erro ao salvar carro no Supabase:', error);
    return false;
  }
};

/**
 * Busca todos os carros do Supabase
 */
export const fetchCarsFromSupabase = async (): Promise<Car[]> => {
  if (!isSupabaseConfigured()) {
    console.warn('⚠️ Supabase não configurado. Usando dados locais do localStorage.');
    return getCars();
  }

  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('*')
      .order('createdAt', { ascending: false });

    if (error) throw error;

    // Se retornou vazio do Supabase, usar localStorage como fallback
    if (!data || data.length === 0) {
      console.warn('⚠️ Supabase retornou vazio. Usando localStorage.');
      return getCars();
    }

    console.log('✅ Carros carregados do Supabase:', data.length);
    return data as Car[];
  } catch (error) {
    console.error('❌ Erro ao buscar carros do Supabase:', error);
    // Fallback para localStorage
    return getCars();
  }
};

/**
 * Deleta um carro do Supabase
 */
export const deleteCarFromSupabase = async (carId: string): Promise<boolean> => {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase não configurado.');
    return false;
  }

  try {
    // Buscar imagens do carro para deletar
    const { data: car } = await supabase
      .from(TABLE_NAME)
      .select('images')
      .eq('id', carId)
      .single();

    // Deletar imagens do storage
    if (car && car.images) {
      for (const imageUrl of car.images) {
        if (imageUrl.includes(BUCKET_NAME)) {
          const path = imageUrl.split(`${BUCKET_NAME}/`)[1];
          await supabase.storage.from(BUCKET_NAME).remove([path]);
        }
      }
    }

    // Deletar registro do carro
    const { error } = await supabase
      .from(TABLE_NAME)
      .delete()
      .eq('id', carId);

    if (error) throw error;

    console.log('Carro deletado do Supabase com sucesso!');
    return true;
  } catch (error) {
    console.error('Erro ao deletar carro do Supabase:', error);
    return false;
  }
};

/**
 * Sincroniza dados locais com Supabase
 */
export const syncLocalToSupabase = async (): Promise<void> => {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase não configurado. Sincronização cancelada.');
    return;
  }

  try {
    const localCars = getCars();
    
    console.log(`Sincronizando ${localCars.length} carros para Supabase...`);

    for (const car of localCars) {
      await saveCarToSupabase(car);
    }

    console.log('Sincronização concluída!');
  } catch (error) {
    console.error('Erro na sincronização:', error);
  }
};
