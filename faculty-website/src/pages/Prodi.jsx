import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import Card from '../components/Card';

export default function Prodi() {
  const [prodi, setProdi] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProdi();
  }, []);

  const fetchProdi = async () => {
    try {
      const { data, error } = await supabase
        .from('prodi')
        .select('*')
        .order('nama', { ascending: true });

      if (error) throw error;
      setProdi(data);
    } catch (error) {
      console.error('Error fetching prodi:', error);
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
        <h1 className="text-4xl font-bold text-center mb-4">Program Studi</h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Jelajahi berbagai program studi yang tersedia di Fakultas Teknologi Informasi
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {prodi.map((item) => (
            <Card key={item.id} className="hover:shadow-lg transition-shadow">
              {item.image_url && (
                <img src={item.image_url} alt={item.nama} className="w-full h-48 object-cover" />
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-primary-700">{item.nama}</h3>
                <p className="text-gray-700 leading-relaxed">{item.deskripsi}</p>
              </div>
            </Card>
          ))}
        </div>

        {prodi.length === 0 && (
          <div className="text-center text-gray-500 py-12">
            Belum ada program studi yang tersedia.
          </div>
        )}
      </div>
    </div>
  );
}
