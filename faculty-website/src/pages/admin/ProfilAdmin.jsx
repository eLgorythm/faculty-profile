import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Save } from 'lucide-react';

export default function ProfilAdmin() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    visi: '',
    misi: '',
    struktur_organisasi: '',
    akreditasi: '',
  });

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
      if (data) {
        setFormData({
          visi: data.visi || '',
          misi: data.misi || '',
          struktur_organisasi: data.struktur_organisasi || '',
          akreditasi: data.akreditasi || '',
        });
      }
    } catch (error) {
      console.error('Error fetching profil:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);

    try {
      const { data: existingData } = await supabase
        .from('profil_fakultas')
        .select('id')
        .maybeSingle();

      if (existingData) {
        const { error } = await supabase
          .from('profil_fakultas')
          .update({ ...formData, updated_at: new Date().toISOString() })
          .eq('id', existingData.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('profil_fakultas')
          .insert([formData]);

        if (error) throw error;
      }

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving profil:', error);
      alert('Error: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Kelola Profil Fakultas</h1>

      {success && (
        <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
          Profil fakultas berhasil disimpan!
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Visi
            </label>
            <textarea
              value={formData.visi}
              onChange={(e) => setFormData({ ...formData, visi: e.target.value })}
              rows="4"
              className="w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500"
              placeholder="Masukkan visi fakultas..."
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Misi
            </label>
            <textarea
              value={formData.misi}
              onChange={(e) => setFormData({ ...formData, misi: e.target.value })}
              rows="6"
              className="w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500"
              placeholder="Masukkan misi fakultas..."
            ></textarea>
            <p className="mt-1 text-sm text-gray-500">
              Gunakan baris baru untuk memisahkan setiap poin misi
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Struktur Organisasi
            </label>
            <textarea
              value={formData.struktur_organisasi}
              onChange={(e) => setFormData({ ...formData, struktur_organisasi: e.target.value })}
              rows="8"
              className="w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500"
              placeholder="Masukkan struktur organisasi fakultas..."
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Akreditasi
            </label>
            <input
              type="text"
              value={formData.akreditasi}
              onChange={(e) => setFormData({ ...formData, akreditasi: e.target.value })}
              className="w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500"
              placeholder="Contoh: Akreditasi A - BAN-PT"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="btn btn-primary flex items-center disabled:opacity-50"
          >
            <Save size={18} className="mr-2" />
            {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
          </button>
        </form>
      </div>
    </div>
  );
}
