/**
 * Script para migrar imagens do localStorage para o Supabase
 * Execute este script apenas uma vez após configurar o Supabase
 */

import { getCars } from '../services/storageService';
import { saveCarToSupabase } from '../services/supabaseStorage';

export const migrateLocalImagesToSupabase = async () => {
  console.log('🚀 Iniciando migração de imagens para Supabase...');
  
  const localCars = getCars();
  console.log(`📦 Encontrados ${localCars.length} carros no localStorage`);
  
  let success = 0;
  let errors = 0;
  
  for (const car of localCars) {
    try {
      console.log(`⏳ Migrando: ${car.make} ${car.model}...`);
      const result = await saveCarToSupabase(car);
      
      if (result) {
        success++;
        console.log(`✅ Migrado com sucesso!`);
      } else {
        errors++;
        console.log(`⚠️ Falha na migração`);
      }
    } catch (error) {
      errors++;
      console.error(`❌ Erro ao migrar ${car.make} ${car.model}:`, error);
    }
  }
  
  console.log('\n📊 Resumo da migração:');
  console.log(`✅ Sucesso: ${success} carros`);
  console.log(`❌ Erros: ${errors} carros`);
  console.log('🎉 Migração concluída!');
};

// Para executar no console do navegador:
// import { migrateLocalImagesToSupabase } from './scripts/migrateImagesToSupabase';
// migrateLocalImagesToSupabase();
