
import React from 'react';

interface IntroductionScreenProps {
  onNavigate: () => void;
}

const InfoCard: React.FC<{ title: string; children: React.ReactNode; icon: string }> = ({ title, children, icon }) => (
  <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
    <h3 className="text-xl font-bold text-brand-green mb-3 flex items-center">
      <span className="text-2xl mr-3">{icon}</span>
      {title}
    </h3>
    <p className="text-gray-300 leading-relaxed">{children}</p>
  </div>
);

const ImageCard: React.FC<{ src: string; alt: string; caption: string }> = ({ src, alt, caption }) => (
    <div className="relative rounded-lg overflow-hidden shadow-xl group">
        <img src={src} alt={alt} className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end p-4">
            <p className="text-white font-semibold text-lg">{caption}</p>
        </div>
    </div>
);

export const IntroductionScreen: React.FC<IntroductionScreenProps> = ({ onNavigate }) => {
  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2">
          Green Karnataka Innovations <span className="text-brand-green">🌱⚙</span>
        </h1>
        <p className="text-lg text-gray-400 mt-4 max-w-3xl mx-auto">
          Welcome to Green Karnataka Innovations, where tradition meets sustainability and innovation leads to a cleaner, smarter future.
        </p>
      </header>

      <main className="space-y-12">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <InfoCard title="What is Green Technology?" icon="💡">
            Green technology refers to eco-friendly innovations designed to protect the environment, reduce pollution, and use natural resources responsibly.
          </InfoCard>
          <InfoCard title="Why Karnataka?" icon="📍">
            Karnataka is a leader in sustainable technology, from renewable energy and smart agriculture to waste-to-energy systems and electric mobility. Bengaluru, India's Silicon Valley, is a hub for green startups.
          </InfoCard>
        </div>
        
        <div className="bg-gray-900/50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-white text-center mb-6">Key Focus Areas</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-gray-300">
                <p className="bg-gray-800 p-3 rounded-md text-center">✅ Renewable Energy</p>
                <p className="bg-gray-800 p-3 rounded-md text-center">✅ Waste Management</p>
                <p className="bg-gray-800 p-3 rounded-md text-center">✅ Clean Mobility (EVs)</p>
                <p className="bg-gray-800 p-3 rounded-md text-center">✅ Smart Agriculture</p>
                <p className="bg-gray-800 p-3 rounded-md text-center">✅ Water Conservation</p>
                <p className="bg-gray-800 p-3 rounded-md text-center">✅ Cleantech Innovation</p>
            </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
            <ImageCard src="https://picsum.photos/seed/solar-karnataka/800/600" alt="Solar farms and windmills" caption="Solar farms & windmills 🌞🌬️" />
            <ImageCard src="https://picsum.photos/seed/ev-bus/800/600" alt="Electric buses and charging hubs" caption="Electric buses & EV hubs 🚍⚡" />
            <ImageCard src="https://picsum.photos/seed/recycling-plant/800/600" alt="Waste-to-energy plant" caption="Waste-to-energy plants ♻️" />
        </div>

        <div className="text-center pt-8">
          <button
            onClick={onNavigate}
            className="bg-brand-green text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-emerald-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-emerald-400"
          >
            Explore Green Tech Projects →
          </button>
        </div>
      </main>
    </div>
  );
};
