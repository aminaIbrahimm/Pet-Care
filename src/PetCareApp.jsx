import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// Single-file demo React app for Pet Care with multiple pages, routing, API calls (mock),
// Tailwind utility classes for styling, dark mode, search/filter, login (mock), forms, and simple animations.

const API_BASE = "https://api.example.com"; // replace with real API

// --- mock helpers (use real endpoints in production) ---
async function fetchPets() {
  // mock delay
  await new Promise((r) => setTimeout(r, 400));
  return [
    { id: "1", name: "Buddy", type: "Dog", age: "3 years", image: "https://placedog.net/640/480?id=1", description: "Friendly golden retriever." },
    { id: "2", name: "Mittens", type: "Cat", age: "2 years", image: "https://placekitten.com/640/480", description: "Playful tabby." },
    { id: "3", name: "Polly", type: "Bird", age: "1 year", image: "https://picsum.photos/640/480?random=3", description: "Talkative parrot." },
  ];
}

async function fetchPetById(id) {
  const pets = await fetchPets();
  return pets.find((p) => p.id === id);
}

// --- Auth helpers (very simple mock) ---
function saveAuth(user) {
  localStorage.setItem("petcare_user", JSON.stringify(user));
}
function loadAuth() {
  try { return JSON.parse(localStorage.getItem("petcare_user")); } catch { return null; }
}
function clearAuth() { localStorage.removeItem("petcare_user"); }

// --- Components ---
function Header({ dark, setDark, user }) {
  return (
    <header className="bg-white dark:bg-gray-800 shadow p-4 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link to="/" className="font-bold text-xl">PetCare</Link>
        <nav className="flex items-center gap-3">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/services" className="hover:underline">Services</Link>
          <Link to="/adoption" className="hover:underline">Adoption</Link>
          <Link to="/book" className="hover:underline">Book</Link>
          <Link to="/search" className="hover:underline">Search</Link>
          {user ? <Link to="/profile" className="px-3 py-1 rounded bg-blue-500 text-white">{user.name}</Link> : <Link to="/login" className="px-3 py-1 rounded border">Login</Link>}
          <button onClick={() => setDark(!dark)} aria-label="toggle dark" className="ml-2 p-2 rounded">{dark ? '🌙' : '☀️'}</button>
        </nav>
      </div>
    </header>
  );
}

function Home() {
  const [pets, setPets] = useState([]);
  useEffect(() => { fetchPets().then(setPets); }, []);
  return (
    <main className="max-w-6xl mx-auto p-6">
      <motion.h1 initial={{opacity:0, y: -10}} animate={{opacity:1, y:0}} className="text-3xl font-bold mb-4">Find the perfect companion</motion.h1>
      <p className="text-gray-600 mb-6">Browse pets, book services, or adopt — everything for your pet’s wellbeing.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {pets.map(pet => (
          <motion.div whileHover={{ scale: 1.02 }} key={pet.id} className="bg-white dark:bg-gray-700 rounded-2xl overflow-hidden shadow">
            <img src={pet.image} alt={pet.name} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h3 className="font-semibold">{pet.name}</h3>
              <p className="text-sm text-gray-500">{pet.type} • {pet.age}</p>
              <div className="mt-3 flex gap-2">
                <Link to={`/pet/${pet.id}`} className="text-sm px-3 py-1 rounded border">Details</Link>
                <Link to={`/book?pet=${pet.id}`} className="text-sm px-3 py-1 rounded bg-green-500 text-white">Book</Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}

function PetDetails() {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  useEffect(() => { fetchPetById(id).then(setPet); }, [id]);
  if (!pet) return <div className="p-6">Loading...</div>;
  return (
    <main className="max-w-4xl mx-auto p-6">
      <motion.div initial={{opacity:0}} animate={{opacity:1}} className="grid md:grid-cols-2 gap-6 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
        <img src={pet.image} alt={pet.name} className="w-full h-64 object-cover rounded" />
        <div>
          <h2 className="text-2xl font-bold mb-2">{pet.name}</h2>
          <p className="text-gray-500 mb-4">{pet.type} • {pet.age}</p>
          <p className="mb-4">{pet.description}</p>
          <button className="px-4 py-2 bg-blue-500 text-white rounded">Adopt</button>
        </div>
      </motion.div>
    </main>
  );
}

function Services() {
  const services = [
    { id: 's1', title: 'Grooming', desc: 'Full grooming and bath' },
    { id: 's2', title: 'Vaccination', desc: 'All routine vaccines' },
    { id: 's3', title: 'Training', desc: 'Behavior and obedience' },
  ];
  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Services</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {services.map(s => (
          <motion.div whileHover={{ y: -4 }} key={s.id} className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
            <h3 className="font-semibold">{s.title}</h3>
            <p className="text-sm text-gray-500">{s.desc}</p>
            <Link to="/book" className="mt-3 inline-block text-sm px-3 py-1 rounded bg-blue-500 text-white">Book</Link>
          </motion.div>
        ))}
      </div>
    </main>
  );
}

function BookAppointment() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', petName: '', service: 'Grooming', date: '', notes: '' });
  function submit(e) { e.preventDefault();
    // You would post to API here
    console.log('booking', form);
    alert('Appointment requested');
    navigate('/');
  }
  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Book an Appointment</h1>
      <form onSubmit={submit} className="bg-white dark:bg-gray-800 p-6 rounded shadow">
        <label className="block mb-2">Your name<input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="w-full p-2 rounded border mt-1" required /></label>
        <label className="block mb-2">Pet name<input value={form.petName} onChange={e=>setForm({...form,petName:e.target.value})} className="w-full p-2 rounded border mt-1" required /></label>
        <label className="block mb-2">Service<select value={form.service} onChange={e=>setForm({...form,service:e.target.value})} className="w-full p-2 rounded border mt-1">
          <option>Grooming</option>
          <option>Vaccination</option>
          <option>Training</option>
        </select></label>
        <label className="block mb-2">Date<input type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})} className="w-full p-2 rounded border mt-1" required /></label>
        <label className="block mb-2">Notes<textarea value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} className="w-full p-2 rounded border mt-1" /></label>
        <button type="submit" className="mt-3 px-4 py-2 bg-green-500 text-white rounded">Request</button>
      </form>
    </main>
  );
}

function LoginRegister({ onLogin }) {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '' });
  function submit(e) { e.preventDefault();
    const user = { name: form.name || form.email.split('@')[0], email: form.email };
    saveAuth(user);
    onLogin(user);
  }
  return (
    <main className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{mode === 'login' ? 'Login' : 'Register'}</h1>
      <form onSubmit={submit} className="bg-white dark:bg-gray-800 p-6 rounded shadow">
        {mode === 'register' && <label className="block mb-2">Full name<input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="w-full p-2 rounded border mt-1" required /></label>}
        <label className="block mb-2">Email<input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="w-full p-2 rounded border mt-1" required /></label>
        <button type="submit" className="mt-3 px-4 py-2 bg-blue-500 text-white rounded">{mode === 'login' ? 'Login' : 'Create Account'}</button>
      </form>
      <div className="mt-4 text-center">
        <button onClick={()=>setMode(mode === 'login' ? 'register' : 'login')} className="text-sm text-blue-500">{mode === 'login' ? 'Create an account' : 'Have an account? Login'}</button>
      </div>
    </main>
  );
}

function Adoption() {
  const [pets, setPets] = useState([]);
  const [query, setQuery] = useState('');
  useEffect(()=>{ fetchPets().then(setPets); }, []);
  const filtered = pets.filter(p=>p.name.toLowerCase().includes(query.toLowerCase()) || p.type.toLowerCase().includes(query.toLowerCase()));
  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Adoption</h1>
      <input placeholder="Search by name or type" value={query} onChange={e=>setQuery(e.target.value)} className="w-full p-2 mb-4 rounded border" />
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filtered.map(p=> (
          <div key={p.id} className="bg-white dark:bg-gray-700 p-4 rounded shadow">
            <img src={p.image} alt={p.name} className="w-full h-36 object-cover rounded mb-2" />
            <h3 className="font-semibold">{p.name}</h3>
            <p className="text-sm text-gray-500">{p.type} • {p.age}</p>
            <div className="mt-3 flex gap-2">
              <Link to={`/pet/${p.id}`} className="px-3 py-1 rounded border">Details</Link>
              <button className="px-3 py-1 rounded bg-green-500 text-white">Start Adoption</button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

function SearchPage() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: '', age: '' });
  useEffect(()=>{ fetchPets().then(setPets); }, []);
  const results = pets.filter(p => (filters.type ? p.type === filters.type : true) && (filters.age ? p.age === filters.age : true));
  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Search</h1>
      <div className="flex gap-3 mb-4">
        <select value={filters.type} onChange={e=>setFilters({...filters,type:e.target.value})} className="p-2 rounded border">
          <option value="">All types</option>
          <option>Dog</option>
          <option>Cat</option>
          <option>Bird</option>
        </select>
        <select value={filters.age} onChange={e=>setFilters({...filters,age:e.target.value})} className="p-2 rounded border">
          <option value="">Any age</option>
          <option>1 year</option>
          <option>2 years</option>
          <option>3 years</option>
        </select>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {results.map(p=> (
          <div key={p.id} className="bg-white dark:bg-gray-700 p-4 rounded shadow">
            <img src={p.image} alt={p.name} className="w-full h-36 object-cover rounded mb-2" />
            <h3 className="font-semibold">{p.name}</h3>
            <p className="text-sm text-gray-500">{p.type} • {p.age}</p>
            <Link to={`/pet/${p.id}`} className="mt-2 inline-block px-3 py-1 rounded border">Details</Link>
          </div>
        ))}
      </div>
    </main>
  );
}

function Profile({ user, onLogout }) {
  if (!user) return <div className="p-6">Please login</div>;
  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <div className="mt-4">
          <button onClick={onLogout} className="px-3 py-1 rounded bg-red-500 text-white">Logout</button>
        </div>
      </div>
    </main>
  );
}

// --- App export (single-file) ---
export default function PetCareApp() {
  const [dark, setDark] = useState(false);
  const [user, setUser] = useState(loadAuth());
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);
  function handleLogin(u) { setUser(u); }
  function handleLogout() { clearAuth(); setUser(null); }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Header dark={dark} setDark={setDark} user={user} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pet/:id" element={<PetDetails />} />
          <Route path="/services" element={<Services />} />
          <Route path="/book" element={<BookAppointment />} />
          <Route path="/login" element={<LoginRegister onLogin={handleLogin} />} />
          <Route path="/adoption" element={<Adoption />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/profile" element={<Profile user={user} onLogout={handleLogout} />} />
          <Route path="*" element={<main className="p-6">Not found</main>} />
        </Routes>
        <footer className="mt-12 p-6 text-center text-sm text-gray-500">© PetCare — demo</footer>
      </div>
    </Router>
  );
}
