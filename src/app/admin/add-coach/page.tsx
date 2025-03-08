"use client";
import { useState, useEffect } from "react";

export default function AddCoachPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    password: "",
  });

  const [translations, setTranslations] = useState({
    addCoachPage: {
      form: {
        firstName: "First Name",
        lastName: "Last Name",
        email: "Email",
        phone: "Phone Number",
        gender: "Select Gender",
        password: "Password",
        genderOptions: {
          male: "Male",
          female: "Female",
          other: "Other",
        },
        submitButton: "Add Coach",
        successMessage: "Coach added successfully!",
        errorMessage: "Error adding coach: {error}",
        unexpectedErrorMessage: "Unexpected error occurred",
      },
    },
  });

  // Fetch translations based on the language preference in localStorage
  useEffect(() => {
    const language = localStorage.getItem("language") || "en"; // Default to English
    fetch(`/locales/${language}.json`)
      .then((response) => response.json())
      .then((data) => setTranslations(data))
      .catch((error) => console.error("Error loading translations:", error));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/coaches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Error:", errorData);
        alert(
          translations.addCoachPage.form.errorMessage.replace(
            "{error}",
            errorData.error || "Unknown error"
          )
        );
      } else {
        alert(translations.addCoachPage.form.successMessage);
      }
    } catch (error) {
      console.error("Unexpected Error:", error);
      alert(translations.addCoachPage.form.unexpectedErrorMessage);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-white">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        {/* Form Fields */}
        <form className="space-y-4 text-black" onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            placeholder={translations.addCoachPage.form.firstName}
            className="w-full p-3 border rounded-lg"
            required
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder={translations.addCoachPage.form.lastName}
            className="w-full p-3 border rounded-lg"
            required
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder={translations.addCoachPage.form.email}
            className="w-full p-3 border rounded-lg"
            required
            onChange={handleChange}
          />
          <input
            type="tel"
            name="phone"
            placeholder={translations.addCoachPage.form.phone}
            className="w-full p-3 border rounded-lg"
            required
            onChange={handleChange}
          />
          <select
            name="gender"
            className="w-full p-3 border rounded-lg"
            required
            onChange={handleChange}
          >
            <option value="">{translations.addCoachPage.form.gender}</option>
            <option value="male">
              {translations.addCoachPage.form.genderOptions.male}
            </option>
            <option value="female">
              {translations.addCoachPage.form.genderOptions.female}
            </option>
            <option value="other">
              {translations.addCoachPage.form.genderOptions.other}
            </option>
          </select>
          <input
            type="password"
            name="password"
            placeholder={translations.addCoachPage.form.password}
            className="w-full p-3 border rounded-lg"
            required
            onChange={handleChange}
          />

          {/* Add Coach Button */}
          <button
            type="submit"
            className="w-full bg-[#75E379] text-white p-3 rounded-lg font-semibold hover:bg-green-600 transition"
          >
            {translations.addCoachPage.form.submitButton}
          </button>
        </form>
      </div>
    </div>
  );
}