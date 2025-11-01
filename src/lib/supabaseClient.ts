import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

// CRUD para la tabla 'Invitados'
export interface Invitado {
    id: number;
    created_at: string;
    updated_at: string;
    nombre: string;
    mesa: number;
    adultos: number;
    niños: number;
    codigo: string;
}

// Obtener todos los Invitados
export async function getInvitados(): Promise<Invitado[] | null> {
    const { data, error } = await supabase
        .from('Invitados')
        .select('*')
        .order('mesa', { ascending: true });
    if (error) {
        console.error('Error al obtener Invitados:', error.message);
        return null;
    }
    return data as Invitado[];
}

// Obtener un invitado por ID
export async function getInvitadoById(id: number): Promise<Invitado | null> {
    const { data, error } = await supabase
        .from('Invitados')
        .select('*')
        .eq('id', id)
        .single();
    if (error) {
        console.error('Error al obtener invitado:', error.message);
        return null;
    }
    return data as Invitado;
}

// Crear un invitado
export async function createInvitado(
    invitado: Omit<Invitado, "id" | "created_at" | "updated_at">
): Promise<Invitado | null> {
    // 🧹 limpia todos los campos que no deben ir al insert
    const clean = { ...invitado } as any;
    delete clean.id;
    delete clean.created_at;
    delete clean.updated_at;

    // 🔒 asegúrate de convertir los números correctamente
    clean.mesa = Number(clean.mesa) || 0;
    clean.adultos = Number(clean.adultos) || 0;
    clean.niños = Number(clean.niños) || 0;

    const { data, error } = await supabase
        .from("Invitados")
        .insert([clean])
        .select()
        .single();

    if (error) {
        console.error("Error al crear invitado:", error.message);
        return null;
    }
    return data as Invitado;
}


// Actualizar un invitado
export async function updateInvitado(id: number, updates: Partial<Omit<Invitado, 'id' | 'created_at'>>): Promise<Invitado | null> {
    const { data, error } = await supabase
        .from('Invitados')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
    if (error) {
        console.error('Error al actualizar invitado:', error.message);
        return null;
    }
    return data as Invitado;
}

// Eliminar un invitado
export async function deleteInvitado(id: number): Promise<boolean> {
    const { error } = await supabase
        .from('Invitados')
        .delete()
        .eq('id', id);
    if (error) {
        console.error('Error al eliminar invitado:', error.message);
        return false;
    }
    return true;
}

// Buscar invitado por código
export async function getInvitadoByCodigo(codigo: string): Promise<Invitado | null> {
    const { data, error } = await supabase
        .from('Invitados')
        .select('*')
        .eq('codigo', codigo)
        .single();
    if (error) {
        console.error('Error al buscar invitado por código:', error.message);
        return null;
    }
    return data as Invitado;
}
