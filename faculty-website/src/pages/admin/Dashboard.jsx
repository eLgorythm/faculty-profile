import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Newspaper, GraduationCap, Users, MessageSquare } from 'lucide-react';

export default function Dashboard() {
  const [stats, setStats] = useState({
    berita: 0,
    prodi: 0,
    users: 0,
    messages: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [beritaRes, prodiRes, usersRes, messagesRes] = await Promise.all([
        supabase.from('berita').select('*', { count: 'exact', head: true }),
        supabase.from('prodi').select('*', { count: 'exact', head: true }),
        supabase.auth.admin.listUsers(),
        supabase.from('contact_messages').select('*', { count: 'exact', head: true }),
      ]);

      setStats({
        berita: beritaRes.count || 0,
        prodi: prodiRes.count || 0,
        users: usersRes.data?.users?.length || 0,
        messages: messagesRes.count || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { title: 'Total Berita', value: stats.berita, icon: Newspaper, color: 'bg-blue-500' },
    { title: 'Program Studi', value: stats.prodi, icon: GraduationCap, color: 'bg-green-500' },
    { title: 'Users', value: stats.users, icon: Users, color: 'bg-purple-500' },
    { title: 'Pesan Kontak', value: stats.messages, icon: MessageSquare, color: 'bg-orange-500' },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="text-white" size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Selamat Datang di Admin Panel</h2>
        <p className="text-gray-700">
          Gunakan menu di sidebar untuk mengelola konten website fakultas.
        </p>
      </div>
    </div>
  );
}
