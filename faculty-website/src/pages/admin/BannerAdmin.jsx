import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, CreditCard as Edit2, Trash2, Eye, EyeOff, MoveUp, MoveDown } from 'lucide-react';

export default function BannerAdmin() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    image_url: '',
    title: '',
    order_index: 0,
    is_active: true,
  });

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const { data, error } = await supabase
        .from('banners')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw error;
      setBanners(data);
    } catch (error) {
      console.error('Error fetching banners:', error);
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
          .from('banners')
          .update({ ...formData, updated_at: new Date().toISOString() })
          .eq('id', editingId);

        if (error) throw error;
      } else {
        const { error } = await supabase.from('banners').insert([formData]);

        if (error) throw error;
      }

      setShowForm(false);
      setEditingId(null);
      setFormData({ image_url: '', title: '', order_index: 0, is_active: true });
      fetchBanners();
    } catch (error) {
      console.error('Error saving banner:', error);
      alert('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      image_url: item.image_url,
      title: item.title || '',
      order_index: item.order_index,
      is_active: item.is_active,
    });
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Apakah Anda yakin ingin menghapus banner ini?')) return;

    try {
      const { error } = await supabase.from('banners').delete().eq('id', id);

      if (error) throw error;
      fetchBanners();
    } catch (error) {
      console.error('Error deleting banner:', error);
      alert('Error: ' + error.message);
    }
  };

  const toggleActive = async (id, currentStatus) => {
    try {
      const { error } = await supabase
        .from('banners')
        .update({ is_active: !currentStatus, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;
      fetchBanners();
    } catch (error) {
      console.error('Error toggling banner status:', error);
      alert('Error: ' + error.message);
    }
  };

  const moveUp = async (banner, index) => {
    if (index === 0) return;

    const prevBanner = banners[index - 1];
    try {
      await Promise.all([
        supabase.from('banners').update({ order_index: prevBanner.order_index }).eq('id', banner.id),
        supabase.from('banners').update({ order_index: banner.order_index }).eq('id', prevBanner.id),
      ]);
      fetchBanners();
    } catch (error) {
      console.error('Error moving banner:', error);
    }
  };

  const moveDown = async (banner, index) => {
    if (index === banners.length - 1) return;

    const nextBanner = banners[index + 1];
    try {
      await Promise.all([
        supabase.from('banners').update({ order_index: nextBanner.order_index }).eq('id', banner.id),
        supabase.from('banners').update({ order_index: banner.order_index }).eq('id', nextBanner.id),
      ]);
      fetchBanners();
    } catch (error) {
      console.error('Error moving banner:', error);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({ image_url: '', title: '', order_index: 0, is_active: true });
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
        <h1 className="text-3xl font-bold">Kelola Banner Hero</h1>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="btn btn-primary flex items-center"
          >
            <Plus size={20} className="mr-2" />
            Tambah Banner
          </button>
        )}
      </div>

      {showForm ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">
            {editingId ? 'Edit Banner' : 'Tambah Banner Baru'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                URL Gambar <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                required
                placeholder="https://example.com/banner-image.jpg"
                className="w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500"
              />
              <p className="mt-1 text-sm text-gray-500">
                Gunakan gambar dengan resolusi tinggi (minimal 1920x500px) untuk hasil terbaik
              </p>
            </div>

            {formData.image_url && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preview
                </label>
                <img
                  src={formData.image_url}
                  alt="Banner preview"
                  className="w-full h-48 object-cover rounded-lg"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/1920x500?text=Image+Not+Found';
                  }}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Judul (Opsional)
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Judul banner untuk referensi admin"
                className="w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Urutan
              </label>
              <input
                type="number"
                value={formData.order_index}
                onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) })}
                min="0"
                className="w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500"
              />
              <p className="mt-1 text-sm text-gray-500">
                Banner dengan nomor urutan lebih kecil akan ditampilkan lebih dulu
              </p>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="is_active"
                checked={formData.is_active}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <label htmlFor="is_active" className="ml-2 text-sm text-gray-700">
                Aktifkan banner (hanya banner aktif yang ditampilkan)
              </label>
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
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
            {banners.map((banner, index) => (
              <div key={banner.id} className="border rounded-lg overflow-hidden">
                <div className="relative">
                  <img
                    src={banner.image_url}
                    alt={banner.title || `Banner ${index + 1}`}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/800x300?text=Image+Not+Found';
                    }}
                  />
                  <div className="absolute top-2 right-2 flex space-x-2">
                    {banner.is_active ? (
                      <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">
                        Aktif
                      </span>
                    ) : (
                      <span className="bg-gray-500 text-white px-2 py-1 rounded text-xs font-semibold">
                        Nonaktif
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-4">
                  <div className="mb-3">
                    <h3 className="font-semibold text-gray-900">
                      {banner.title || `Banner ${index + 1}`}
                    </h3>
                    <p className="text-sm text-gray-500">Urutan: {banner.order_index}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => toggleActive(banner.id, banner.is_active)}
                      className="btn btn-secondary flex items-center text-sm"
                      title={banner.is_active ? 'Nonaktifkan' : 'Aktifkan'}
                    >
                      {banner.is_active ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>

                    <button
                      onClick={() => moveUp(banner, index)}
                      disabled={index === 0}
                      className="btn btn-secondary flex items-center text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Pindah ke atas"
                    >
                      <MoveUp size={16} />
                    </button>

                    <button
                      onClick={() => moveDown(banner, index)}
                      disabled={index === banners.length - 1}
                      className="btn btn-secondary flex items-center text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Pindah ke bawah"
                    >
                      <MoveDown size={16} />
                    </button>

                    <button
                      onClick={() => handleEdit(banner)}
                      className="btn btn-secondary flex items-center text-sm"
                    >
                      <Edit2 size={16} className="mr-1" />
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(banner.id)}
                      className="btn bg-red-500 text-white hover:bg-red-600 flex items-center text-sm"
                    >
                      <Trash2 size={16} className="mr-1" />
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {banners.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              Belum ada banner. Klik tombol "Tambah Banner" untuk membuat banner baru.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
