import { supabase } from "../supabase";

export interface TacticalGuideline {
  id: number;
  created_at: string;
  category: string;
  formation: string | null;
  play_style: string | null;
  title: string;
  content: string;
}

export const fetchTacticalGuidelines = async (
  formation?: string,
  playStyle?: string,
  category?: string
): Promise<TacticalGuideline[]> => {
  let query = supabase
    .from('tactical_guidelines')
    .select('*');
  
  if (category) {
    query = query.eq('category', category);
  }
  
  if (formation) {
    query = query.or(`formation.eq.${formation},formation.is.null`);
  }
  
  if (playStyle) {
    query = query.or(`play_style.eq.${playStyle},play_style.is.null`);
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error('Error fetching guidelines:', error);
    return [];
  }
  
  return data as TacticalGuideline[];
};

export const groupGuidelinesByCategory = (guidelines: TacticalGuideline[]) => {
  return guidelines.reduce((acc, guideline) => {
    if (!acc[guideline.category]) {
      acc[guideline.category] = [];
    }
    acc[guideline.category].push(guideline);
    return acc;
  }, {} as Record<string, TacticalGuideline[]>);
};

export const searchTacticalGuidelines = async (searchQuery: string): Promise<TacticalGuideline[]> => {
  if (!searchQuery || searchQuery.trim().length < 3) {
    return [];
  }
  
  const { data, error } = await supabase
    .from('tactical_guidelines')
    .select('*')
    .textSearch('content', searchQuery, {
      type: 'websearch',
      config: 'english'
    })
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error searching guidelines:', error);
    return [];
  }
  
  return data as TacticalGuideline[];
};

export const getTacticalGuidelineById = async (id: number): Promise<TacticalGuideline | null> => {
  const { data, error } = await supabase
    .from('tactical_guidelines')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error fetching guideline by ID:', error);
    return null;
  }
  
  return data as TacticalGuideline;
};

export const addTacticalGuideline = async (
  guideline: Omit<TacticalGuideline, 'id' | 'created_at'>
): Promise<TacticalGuideline | null> => {
  try {
    const { data, error } = await supabase
      .from('tactical_guidelines')
      .insert([guideline])
      .select()
      .single();
    
    if (error) {
      console.error('Error adding guideline:', error);
      return null;
    }
    
    return data as TacticalGuideline;
  } catch (error) {
    console.error('Exception adding guideline:', error);
    return null;
  }
};

export const importTacticalGuidelines = async (
  guidelines: Array<Omit<TacticalGuideline, 'id' | 'created_at'>>
): Promise<{ success: boolean; added: number; errors: number }> => {
  let added = 0;
  let errors = 0;
  
  try {
    const batchSize = 50;
    for (let i = 0; i < guidelines.length; i += batchSize) {
      const batch = guidelines.slice(i, i + batchSize);
      
      const { data, error } = await supabase
        .from('tactical_guidelines')
        .insert(batch)
        .select();
      
      if (error) {
        console.error('Error batch importing guidelines:', error);
        errors += batch.length;
      } else {
        added += data.length;
      }
    }
    
    return {
      success: errors === 0,
      added,
      errors
    };
  } catch (error) {
    console.error('Exception during batch import:', error);
    return {
      success: false,
      added,
      errors: guidelines.length - added
    };
  }
};

export const deleteTacticalGuideline = async (id: number): Promise<boolean> => {
  const { error } = await supabase
    .from('tactical_guidelines')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting guideline:', error);
    return false;
  }
  
  return true;
};

export const updateTacticalGuideline = async (
  id: number,
  updates: Partial<Omit<TacticalGuideline, 'id' | 'created_at'>>
): Promise<TacticalGuideline | null> => {
  const { data, error } = await supabase
    .from('tactical_guidelines')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating guideline:', error);
    return null;
  }
  
  return data as TacticalGuideline;
};
