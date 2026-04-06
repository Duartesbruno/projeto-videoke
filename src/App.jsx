import { useEffect, useMemo, useState } from "react";
import { readExcel } from "./utils/excelReader";
import MusicTable from "./components/MusicTable";
import SearchBar from "./components/SearchBar";
import Pagination from "./components/Pagination";

import logoVideoke from "./assets/logo-ivideoke.png";
import logoPM from "./assets/pm-logo.png";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 15;


  async function loadData() {
    const result = await readExcel("data/videoke-musicasV2.xls");
    setData(result);
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);
  

// filtro de busca
  const filteredData = useMemo(() => {
    if (!search) return data;

    return data.filter((row) =>
      Object.values(row)
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search, data]);

  useEffect(() => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}, [currentPage]);

  // total de páginas
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // calcular itens da página
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedData = filteredData.slice(startIndex, endIndex);

  // resetar página quando buscar
  const handleSearch = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const hasPagination = totalPages > 1;
  console.log("Dados carregados:", data.length, "músicas");
console.log(paginatedData.length, "músicas na página atual"); 
  return (
    <div className="container">
      <div className="header">
        <img src={logoVideoke} alt="Logo Videoke" className="logo" />
        <h1>Catálogo de Músicas</h1>
        <p className="total">
          🎵 {data.length} músicas disponíveis
        </p>
      </div>
      <SearchBar value={search} onChange={handleSearch} />
      {paginatedData.length > 0 && (
        <p className="scroll-hint">⬇️ Deslize para ver mais ➡️</p>
      )}
      <MusicTable data={paginatedData} loading={loading} />
      <div className="footer-table">
        <span>Bruno Duarte - PRO Multimídia ©</span>
      </div>
      {hasPagination && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
      <div className="footer">
        <a href="https://www.instagram.com/pro_multimidia" target="_blank" rel="noopener noreferrer">
          <img src={logoPM} alt="Logo PRO Multimídia" className="pm-logo" />
        </a>
      </div>
    </div>
  );
}

export default App;