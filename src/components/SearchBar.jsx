export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Buscar música, interprete ou trecho..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}