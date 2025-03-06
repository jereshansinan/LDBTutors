"use client";

export default function LanguageDropdown() {
  const changeLanguage = (locale: string) => {
    localStorage.setItem("language", locale);
    window.location.reload();
  };

  return (
    <ul className="absolute left-0 top-full mt-2 bg-white border rounded-md shadow-md w-full z-10">
      <li>
        <button
          onClick={() => changeLanguage("en")}
          className="w-full px-3 py-2 text-gray-700 hover:bg-gray-100"
        >
          English
        </button>
      </li>
      <li>
        <button
          onClick={() => changeLanguage("fr")}
          className="w-full px-3 py-2 text-gray-700 hover:bg-gray-100"
        >
          French
        </button>
      </li>
    </ul>
  );
}
