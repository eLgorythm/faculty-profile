import { Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Fakultas Teknologi Informasi</h3>
            <p className="text-gray-300">
              Mencetak lulusan berkualitas dan berdaya saing global di bidang teknologi informasi.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Kontak</h3>
            <div className="space-y-2 text-gray-300">
              <div className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 flex-shrink-0" />
                <span>Jl. Pendidikan No. 123, Jakarta 12345</span>
              </div>
              <div className="flex items-center">
                <Phone size={18} className="mr-2 flex-shrink-0" />
                <span>(021) 1234-5678</span>
              </div>
              <div className="flex items-center">
                <Mail size={18} className="mr-2 flex-shrink-0" />
                <span>info@fakultas.ac.id</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Link Cepat</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/profil" className="hover:text-white">Profil</a></li>
              <li><a href="/prodi" className="hover:text-white">Program Studi</a></li>
              <li><a href="/berita" className="hover:text-white">Berita</a></li>
              <li><a href="/kontak" className="hover:text-white">Kontak</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Fakultas Teknologi Informasi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
