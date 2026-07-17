import { useEffect, useMemo, useState } from "react";
import { readExcel } from "./utils/excelReader";
import { normalizeText } from "./utils/normalizeText";
import MusicTable from "./components/MusicTable";
import SearchBar from "./components/SearchBar";
import Pagination from "./components/Pagination";

import logoVideoke from "./assets/logo-ivideoke.png";
import logoPM from "./assets/pm-logo.png";
import logoWhatsApp from "./assets/logo-whatsapp.png"
import logoInstagram from "./assets/logo-instagram.png"
import logoFacebook from "./assets/logo-Facebook.png"

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
    const normalizedSearch = normalizeText(search);

    if (!normalizedSearch) return data;

    return data.filter((row) => {
      const rowText = Object.values(row).join(" ");
      return normalizeText(rowText).includes(normalizedSearch);
    });
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

  return (
    <div className="container">
      <div className="header">
        <img src={logoVideoke} alt="Logo Videoke" className="logo" />
        <h1>Lista de Músicas</h1>
        <p className="total">
          🎵 {search
            ? `${filteredData.length} música${filteredData.length === 1 ? "" : "s"} encontrada${filteredData.length === 1 ? "" : "s"}`
            : `${data.length} músicas disponíveis`}
        </p>
      </div>
      <div className="results-container">
        <SearchBar value={search} onChange={handleSearch} />
        {paginatedData.length > 0 && (
          <p className="scroll-hint">⬇️ Deslize para ver mais ➡️</p>
        )}
        <MusicTable data={paginatedData} loading={loading} />
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
        <section className="footer-contact">
          <div className="social-media">
            <a href="https://api.whatsapp.com/send/?phone=5551985331004&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer">
              <img src={logoWhatsApp} alt="WhatsApp" />
            </a>
            <a href="https://www.instagram.com/pro_multimidia" target="_blank" rel="noopener noreferrer">
              <img src={logoInstagram} alt="Instagram" />
            </a>
            <a href="https://www.facebook.com/pro.multimidia.karaoke" target="_blank" rel="noopener noreferrer">
              <img src={logoFacebook} alt="Facebook" />
            </a>
          </div>
        </section>
        <small className="footer-copy">
          © {new Date().getFullYear()} PRO Multimídia • Desenvolvido por Bruno Duarte
        </small>
      </div>
    </div>
  );
}

export default App;