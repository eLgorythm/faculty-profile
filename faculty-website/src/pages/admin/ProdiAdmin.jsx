import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, CreditCard as Edit2, Trash2 } from 'lucide-react';

export default function ProdiAdmin() {
  const [prodi, setProdi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    nama: '',
    deskripsi: '',
    image_url: '',
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingId) {
        const { error } = await supabase
          .from('prodi')
          .update(formData)
          .eq('id', editingId);

        if (error) throw error;
      } else {
        const { error } = await supabase.from('prodi').insert([formData]);

        if (error) throw error;
      }

      setShowForm(false);
      setEditingId(null);
      setFormData({ nama: '', deskripsi: '', image_url: '' });
      fetchProdi();
    } catch (error) {
      console.error('Error saving prodi:', error);
      alert('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      nama: item.nama,
      deskripsi: item.deskripsi || '',
      image_url: item.image_url || '',
    });
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Apakah Anda yakin ingin menghapus program studi ini?')) return;

    try {
      const { error } = await supabase.from('prodi').delete().eq('id', id);

      if (error) throw error;
      fetchProdi();
    } catch (error) {
      console.error('Error deleting prodi:', error);
      alert('Error: ' + error.message);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({ nama: '', deskripsi: '', image_url: '' });
  };

  if (loading && !showForm) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Kelola Program Studi</h1>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="btn btn-primary flex items-center"
          >
            <Plus size={20} className="mr-2" />
            Tambah Program Studi
          </button>
        )}
      </div>

      {showForm ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">
            {editingId ? 'Edit Program Studi' : 'Tambah Program Studi Baru'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama Program Studi <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.nama}
                onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                required
                className="w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                URL Gambar
              </label>
              <input
                type="url"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                placeholder="https://example.com/image.jpg"
                className="w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Deskripsi <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.deskripsi}
                onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                required
                rows="6"
                className="w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500"
              ></textarea>
            </div>

            <div className="flex space-x-4">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Menyimpan...' : editingId ? 'Update' : 'Simpan'}
              </button>
              <button type="button" onClick={handleCancel} className="btn btn-secondary">
                Batal
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {prodi.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {item.image_url && (
                <img src={item.image_url} alt={item.nama} className="w-full h-48 object-cover" />
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{item.nama}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{item.deskripsi}</p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="btn btn-secondary flex items-center flex-1 justify-center"
                  >
                    <Edit2 size={16} className="mr-2" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="btn bg-red-500 text-white hover:bg-red-600 flex items-center flex-1 justify-center"
                  >
                    <Trash2 size={16} className="mr-2" />
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!showForm && prodi.length === 0 && (
        <div className="text-center py-12 text-gray-500 bg-white rounded-lg shadow-md">
          Belum ada program studi. Klik tombol "Tambah Program Studi" untuk membuat program studi baru.
        </div>
      )}
    </div>
  );
}
