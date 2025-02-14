"use client";
import { useState } from "react";

export default function AddCoachPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
  });

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
        alert("Error adding coach: " + (errorData.error || "Unknown error"));
      } else {
        alert("Coach added successfully!");
      }
    } catch (error) {
      console.error("Unexpected Error:", error);
      alert("Unexpected error occurred");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">

        {/* Form Fields */}
        <form className="space-y-4 text-black" onSubmit={handleSubmit}>
          <input type="text" name="firstName" placeholder="First Name" className="w-full p-3 border rounded-lg" required onChange={handleChange} />
          <input type="text" name="lastName" placeholder="Last Name" className="w-full p-3 border rounded-lg" required onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" className="w-full p-3 border rounded-lg" required onChange={handleChange} />
          <input type="tel" name="phone" placeholder="Phone Number" className="w-full p-3 border rounded-lg" required onChange={handleChange} />
          
          <select name="gender" className="w-full p-3 border rounded-lg" required onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg"
            required
            onChange={handleChange}
          />

          {/* Add Coach Button */}
          <button type="submit" className="w-full bg-green-500 text-white p-3 rounded-lg font-semibold hover:bg-green-600 transition">
            Add Coach
          </button>
        </form>
      </div>
    </div>
  );
}

