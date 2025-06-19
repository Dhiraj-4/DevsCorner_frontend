export function Feature({ title, desc }) {
  return (
    <div className="p-6 rounded-lg shadow hover:scale-[1.025] transition border-2 border-b-blue-50">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p>{desc}</p>
    </div>
  );
}