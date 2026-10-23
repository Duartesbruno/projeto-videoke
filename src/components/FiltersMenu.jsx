import { useState } from "react";

const genreOptions = [
    ["anime", "Anime"],
    ["axe", "Axé"],
    ["brega", "Brega"],
    ["culturais", "Culturais"],
    ["forro", "Forró"],
    ["funk", "Funk"],
    ["hip hop", "Hip Hop"],
    ["hino", "Hino"],
    ["infantil", "Infantil"],
    ["lambada", "Lambada"],
    ["latino", "Latino"],
    ["marchinhas carnaval", "Marchinhas Carnaval"],
    ["mpb", "MPB"],
    ["pagode", "Pagode"],
    ["pop", "Pop"],
    ["pop rock", "Pop Rock"],
    ["rap", "Rap"],
    ["reggae", "Reggae"],
    ["religiosa", "Religiosa"],
    ["rock", "Rock"],
    ["rock gaúcho", "Rock Gaúcho"],
    ["samba", "Samba"],
    ["sertanejo", "Sertanejo"],
];

const languageOptions = [
    ["BRA", "Português"],
    ["ESP", "Espanhol"],
    ["EUA", "Inglês"],
    ["FRA", "Francês"],
    ["ITA", "Italiano"],
];

export default function FiltersMenu({ selectedFilters = [], onApply, onClose }) {
    const [genres, setGenres] = useState(
        selectedFilters.filter((filter) => filter.type === "genre").map((filter) => filter.value)
    );
    const [languages, setLanguages] = useState(
        selectedFilters.filter((filter) => filter.type === "language").map((filter) => filter.value)
    );

    const applyFilters = () => {
        onApply([
            ...genres.map((value) => ({
                type: "genre",
                value,
                label: genreOptions.find(([optionValue]) => optionValue === value)?.[1] || value,
            })),
            ...languages.map((value) => ({
                type: "language",
                value,
                label: languageOptions.find(([optionValue]) => optionValue === value)?.[1] || value,
            })),
        ]);
        onClose();
    };

    const clearFilters = () => {
        setGenres([]);
        setLanguages([]);
        onApply([]);
    };

    const toggleValue = (value, values, setValues) => {
        setValues(values.includes(value)
            ? values.filter((selectedValue) => selectedValue !== value)
            : [...values, value]);
    };

    const renderOptions = (options, values, setValues) => options.map(([value, label]) => (
        <button
            type="button"
            className={`filter-option${values.includes(value) ? " selected" : ""}`}
            key={value}
            onClick={() => toggleValue(value, values, setValues)}
            aria-pressed={values.includes(value)}
        >
            {label}
        </button>
    ));

    return (
        <div className="filtersMenu-container">
            <p>Filtros</p>
            <div className="select-container">
                <fieldset>
                    <legend>Gênero:</legend>
                    <div className="filter-options">{renderOptions(genreOptions, genres, setGenres)}</div>
                </fieldset>

                <fieldset>
                    <legend>Idioma:</legend>
                    <div className="filter-options">{renderOptions(languageOptions, languages, setLanguages)}</div>
                </fieldset>
            </div>

            <div className="filtersMenu-actions">
                <button className="clearFilters" type="button" onClick={clearFilters}>Remover Filtros</button>
                <button className="applyFilters" type="button" onClick={applyFilters}>Filtrar</button>
            </div>
        </div>
    )
}