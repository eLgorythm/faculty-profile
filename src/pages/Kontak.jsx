import { useState } from 'react';
import { supabase } from '../lib/supabase';
import Card from '../components/Card';
import { Mail, MapPin, Phone, Send } from 'lucide-react';

export default function Kontak() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const { error: submitError } = await supabase
        .from('contact_messages')
        .insert([formData]);

      if (submitError) throw submitError;

      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-4">Hubungi Kami</h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Ada pertanyaan? Jangan ragu untuk menghubungi kami
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-6">Informasi Kontak</h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="text-primary-600 mr-4 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="font-semibold mb-1">Alamat</h3>
                    <p className="text-gray-700">
                      Jl. Pendidikan No. 123<br />
                      Jakarta 12345<br />
                      Indonesia
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="text-primary-600 mr-4 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="font-semibold mb-1">Telepon</h3>
                    <p className="text-gray-700">(021) 1234-5678</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="text-primary-600 mr-4 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-gray-700">info@fakultas.ac.id</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-6">Kirim Pesan</h2>

              {success && (
                <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg">
                  Pesan Anda berhasil dikirim. Terima kasih!
                </div>
              )}

              {error && (
                <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nama
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Pesan
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn btn-primary flex items-center justify-center disabled:opacity-50"
                >
                  {loading ? (
                    'Mengirim...'
                  ) : (
                    <>
                      <Send size={18} className="mr-2" />
                      Kirim Pesan
                    </>
                  )}
                </button>
              </form>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
