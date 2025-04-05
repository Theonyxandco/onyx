
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

function AdminPanel() {
  const [headline, setHeadline] = useState(localStorage.getItem('headline') || 'Lyxig transportupplevelse i världsklass');
  const [services, setServices] = useState(
    JSON.parse(localStorage.getItem('services')) || [
      '✔️ Flygplatstransfer',
      '✔️ Bröllop & Event',
      '✔️ VIP & Nattliv',
      '✔️ Företagsresor',
    ]
  );

  const handleSave = () => {
    localStorage.setItem('headline', headline);
    localStorage.setItem('services', JSON.stringify(services));
    alert('Sparat!');
  };

  return (
    <div className="p-6 text-white bg-black min-h-screen">
      <h2 className="text-3xl mb-4 text-gold">Adminpanel</h2>
      <label className="block mb-2">Rubrik:</label>
      <input
        value={headline}
        onChange={(e) => setHeadline(e.target.value)}
        className="p-2 rounded bg-gray-800 text-white w-full mb-4"
      />

      <label className="block mb-2">Tjänster:</label>
      {services.map((s, i) => (
        <input
          key={i}
          value={s}
          onChange={(e) => {
            const updated = [...services];
            updated[i] = e.target.value;
            setServices(updated);
          }}
          className="p-2 rounded bg-gray-800 text-white w-full mb-2"
        />
      ))}
      <button
        onClick={() => setServices([...services, '✔️ Ny tjänst'])}
        className="bg-gray-700 px-4 py-2 rounded mt-2"
      >Lägg till tjänst</button>

      <div className="mt-6">
        <button onClick={handleSave} className="bg-gold text-black px-6 py-2 rounded font-bold">
          Spara ändringar
        </button>
      </div>
    </div>
  );
}

function Home() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [headline, setHeadline] = useState('');
  const [services, setServices] = useState([]);

  useEffect(() => {
    setHeadline(localStorage.getItem('headline') || 'Lyxig transportupplevelse i världsklass');
    setServices(
      JSON.parse(localStorage.getItem('services')) || [
        '✔️ Flygplatstransfer',
        '✔️ Bröllop & Event',
        '✔️ VIP & Nattliv',
        '✔️ Företagsresor',
      ]
    );
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('https://formspree.io/f/mblgznnz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    setSubmitted(true);
  };

  return (
    <div className="scroll-snap-y h-screen overflow-y-scroll snap-mandatory bg-black text-white">
      <section className="h-screen flex flex-col justify-center items-center snap-start bg-gradient-to-b from-black to-gray-900">
        <motion.h1 initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="text-5xl font-bold text-gold">Élégance Drive</motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-4 text-xl">{headline}</motion.p>
      </section>

      <section className="h-screen snap-start flex flex-col items-center justify-center bg-gray-900">
        <h2 className="text-3xl font-semibold text-gold mb-6">Tjänster</h2>
        <ul className="space-y-4 text-center">
          {services.map((service, i) => <li key={i}>{service}</li>)}
        </ul>
      </section>

      <section className="h-screen snap-start flex flex-col justify-center items-center bg-black px-4">
        <h2 className="text-3xl font-semibold mb-4 text-gold">Boka din resa</h2>
        {submitted ? (
          <p className="text-green-400 text-xl">Tack för din bokning! ✨</p>
        ) : (
          <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col space-y-4">
            <input name="name" onChange={handleChange} value={formData.name} placeholder="Namn" required className="p-3 rounded bg-gray-800 text-white" />
            <input name="email" onChange={handleChange} value={formData.email} type="email" placeholder="E-post" required className="p-3 rounded bg-gray-800 text-white" />
            <textarea name="message" onChange={handleChange} value={formData.message} placeholder="Meddelande" required className="p-3 rounded bg-gray-800 text-white"></textarea>
            <button type="submit" className="bg-gold text-black py-2 rounded font-bold">Skicka</button>
          </form>
        )}
      </section>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}
