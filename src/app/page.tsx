"use client";

import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import OrbitingSkills from "@/components/ui/orbiting-skills";
import { ProjectCard } from "@/components/project-card";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-black text-white selection:bg-cyan-500/30">
      
      {/* 
        Fixed Background Layer 
        z-0 to sit behind content
      */}
      <div className="fixed inset-0 z-0">
        <AnimatedGridPattern
          numSquares={50}
          maxOpacity={0.05}
          duration={3}
          repeatDelay={1}
          className={cn(
            "[mask-image:radial-gradient(900px_circle_at_center,white,transparent)]",
            "inset-0 h-full w-full skew-y-0 opacity-50",
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black pointer-events-none" />
      </div>

      {/* 
        Content Layer
        z-10 to sit above background
      */}
      <div className="relative z-10 flex flex-col items-center min-h-screen w-full">
        
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center min-h-screen w-full max-w-5xl mx-auto text-center p-4">
          
          <div className="space-y-4">
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-100 to-gray-500 animate-in fade-in slide-in-from-bottom-5 duration-1000 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
              Alperen Atasever
            </h1>
            <p className="text-xl md:text-3xl text-cyan-400 font-light tracking-[0.2em] uppercase animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]">
              Full Stack Developer
            </p>
          </div>

          {/* Orbiting Skills Component */}
          <div className="w-full h-[500px] flex items-center justify-center animate-in fade-in zoom-in duration-1000 delay-300">
            <OrbitingSkills />
          </div>

          <div className="animate-bounce mt-10">
            <svg
              className="w-6 h-6 text-gray-400"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
          
        </section>

        {/* Projects Section */}
        <section className="w-full max-w-6xl mx-auto px-4 py-24 space-y-24">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white drop-shadow-[0_0_20px_rgba(147,51,234,0.5)]">
              Featured Projects
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-cyan-500 to-purple-600 mx-auto rounded-full" />
          </div>

          {/* CarCare Pro Project */}
          <ProjectCard
            title="CarCare Pro"
            description="Oto kuaförler, detaylı temizlik merkezleri ve araç servisleri için uçtan uca işletme yönetim sistemi. Kağıt kalem devrini kapatan, güvenli ve profesyonel bir SaaS çözümü."
            tags={["SaaS", ".NET Core", "React", "Cloud", "Business Logic"]}
            className="border-cyan-500/20 bg-gray-900/40 backdrop-blur-xl"
            features={[
              {
                title: "🛡️ Admin Onay Sistemi",
                detail: "Personel hatalarını ve kasa kaçaklarını önleyen, silme işlemlerini yönetici onayına sunan güvenlik katmanı."
              },
              {
                title: "🎩 4 Adımlı Karşılama Sihirbazı",
                detail: "Plaka tanıma ile hızlı müşteri kabulü, detaylı hizmet ve parça seçimi (örn. Kaput - 150 Mikron PPF)."
              },
              {
                title: "💰 Finansal Hakimiyet",
                detail: "Gelir/Gider modülü ve Excel raporlama ile anlık ciro ve net kâr takibi."
              },
              {
                title: "📅 Akıllı Randevu & Takvim",
                detail: "Sürükle-bırak Kanban panosu ve doluluk oranına göre randevu planlama."
              },
              {
                title: "📱 Dashboard",
                detail: "İşletmenin kalbi: Anlık istatistikler, bekleyen işler ve ciro durumu."
              }
            ]}
          />

          {/* AtaseverYazTekWebsite Project */}
          <ProjectCard
            title="Atasever Yazılım & Teknoloji"
            description="Kişisel portfolyo ve proje vitrini. Modern, minimalist ve yüksek performanslı web deneyimi."
            tags={["React", "Next.js", "Tailwind CSS", "Framer Motion"]}
            link="https://github.com/alperentsvr/AtaseverYazTekWepsite.git"
            linkText="View Source Code"
          />

        </section>

        {/* Contact Section */}
        <section className="w-full bg-gradient-to-t from-gray-900 via-black to-black py-24 border-t border-white/10">
           <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
              <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-cyan-500">
                Let's Build Something Amazing
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Looking for a modern, high-performance web solution or a robust enterprise application? Let's connect.
              </p>
              
              <div className="flex flex-wrap justify-center gap-6 mt-8">
                <a href="mailto:contact@example.com" className="px-8 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-500/50 transition-all duration-300 text-white font-medium">
                  Send Email
                </a>
                <a href="https://github.com/alperentsvr" target="_blank" className="px-8 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300 text-white font-medium">
                  GitHub Profile
                </a>
              </div>
              
              <footer className="mt-20 text-gray-600 text-sm">
                © {new Date().getFullYear()} Alperen Atasever. All rights reserved.
              </footer>
           </div>
        </section>

      </div>
    </main>
  );
}
