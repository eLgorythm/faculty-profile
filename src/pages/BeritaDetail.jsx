import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { ArrowLeft, Calendar } from 'lucide-react';

export default function BeritaDetail() {
  const { slug } = useParams();
  const [berita, setBerita] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBerita();
  }, [slug]);

  const fetchBerita = async () => {
    try {
      const { data, error } = await supabase
        .from('berita')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .maybeSingle();

      if (error) throw error;
      setBerita(data);
    } catch (error) {
      console.error('Error fetching berita:', error);
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

  if (!berita) {
    return (
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold mb-4">Berita Tidak Ditemukan</h1>
          <Link to="/berita" className="text-primary-600 hover:text-primary-700 flex items-center justify-center">
            <ArrowLeft size={20} className="mr-2" />
            Kembali ke Berita
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/berita" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6">
          <ArrowLeft size={20} className="mr-2" />
          Kembali ke Berita
        </Link>

        <article className="bg-white rounded-lg shadow-md overflow-hidden">
          {berita.gambar && (
            <img src={berita.gambar} alt={berita.judul} className="w-full h-96 object-cover" />
          )}

          <div className="p-8">
            <h1 className="text-4xl font-bold mb-4">{berita.judul}</h1>

            <div className="flex items-center text-gray-600 mb-6">
              <Calendar size={18} className="mr-2" />
              <span>
                {new Date(berita.created_at).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </span>
            </div>

            <div className="prose max-w-none">
              <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                {berita.isi}
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
