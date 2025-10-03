import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import Card from '../components/Card';

export default function Profil() {
  const [profil, setProfil] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfil();
  }, []);

  const fetchProfil = async () => {
    try {
      const { data, error } = await supabase
        .from('profil_fakultas')
        .select('*')
        .maybeSingle();

      if (error) throw error;
      setProfil(data);
    } catch (error) {
      console.error('Error fetching profil:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-12">Profil Fakultas</h1>

        <div className="space-y-8">
          <Card>
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-4 text-primary-700">Visi</h2>
              <p className="text-gray-700 text-lg leading-relaxed">{profil?.visi}</p>
            </div>
          </Card>

          <Card>
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-4 text-primary-700">Misi</h2>
              <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">{profil?.misi}</p>
            </div>
          </Card>

          <Card>
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-4 text-primary-700">Struktur Organisasi</h2>
              <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">{profil?.struktur_organisasi}</p>
            </div>
          </Card>

          <Card>
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-4 text-primary-700">Akreditasi</h2>
              <p className="text-gray-700 text-lg leading-relaxed">{profil?.akreditasi}</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
