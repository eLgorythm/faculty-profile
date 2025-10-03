import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import Card from '../components/Card';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const [profil, setProfil] = useState(null);
  const [prodi, setProdi] = useState([]);
  const [berita, setBerita] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [profilRes, prodiRes, beritaRes] = await Promise.all([
        supabase.from('profil_fakultas').select('*').maybeSingle(),
        supabase.from('prodi').select('*').limit(6),
        supabase.from('berita').select('*').eq('published', true).order('created_at', { ascending: false }).limit(3),
      ]);

      if (profilRes.data) setProfil(profilRes.data);
      if (prodiRes.data) setProdi(prodiRes.data);
      if (beritaRes.data) setBerita(beritaRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
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
    <div>
      <section className="bg-gradient-to-r from-primary-700 to-primary-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Fakultas Teknologi Informasi
          </h1>
          <p className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto">
            Mencetak lulusan berkualitas dan berdaya saing global di era digital
          </p>
        </div>
      </section>

      {profil && (
        <>
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-center mb-8">Visi</h2>
              <p className="text-lg text-gray-700 text-center max-w-4xl mx-auto">
                {profil.visi}
              </p>
            </div>
          </section>

          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-center mb-8">Misi</h2>
              <p className="text-lg text-gray-700 text-center max-w-4xl mx-auto whitespace-pre-line">
                {profil.misi}
              </p>
            </div>
          </section>
        </>
      )}

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Program Studi</h2>
            <Link to="/prodi" className="flex items-center text-primary-600 hover:text-primary-700">
              Lihat Semua <ArrowRight size={20} className="ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {prodi.map((item) => (
              <Card key={item.id}>
                {item.image_url && (
                  <img src={item.image_url} alt={item.nama} className="w-full h-48 object-cover" />
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{item.nama}</h3>
                  <p className="text-gray-600 line-clamp-3">{item.deskripsi}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Berita Terbaru</h2>
            <Link to="/berita" className="flex items-center text-primary-600 hover:text-primary-700">
              Lihat Semua <ArrowRight size={20} className="ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {berita.map((item) => (
              <Link key={item.id} to={`/berita/${item.slug}`}>
                <Card className="hover:shadow-lg transition-shadow">
                  {item.gambar && (
                    <img src={item.gambar} alt={item.judul} className="w-full h-48 object-cover" />
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 hover:text-primary-600">{item.judul}</h3>
                    <p className="text-gray-600 text-sm mb-2">
                      {new Date(item.created_at).toLocaleDateString('id-ID')}
                    </p>
                    <p className="text-gray-700 line-clamp-3">{item.isi}</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
