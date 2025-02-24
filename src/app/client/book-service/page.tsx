"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle, Calendar, Clock, MapPin } from "lucide-react";
import { DialogTitle } from "@/components/ui/dialog";

export default function BookServicePage() {
  const [formData, setFormData] = useState({
    service: "",
    location: "",
    date: "",
    timeSlot: "",
  });
  const [bookingDetails, setBookingDetails] = useState({ service: "", location: "", date: "", timeSlot: "" });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  const services = [
    { id: "service1", name: "Service 1" },
    { id: "service2", name: "Service 2" },
    { id: "service3", name: "Service 3" },
    { id: "service4", name: "Service 4" },
    { id: "service5", name: "Service 5" },
    { id: "service6", name: "Service 6" },
    { id: "service7", name: "Service 7" },
    { id: "service8", name: "Service 8" },
  ];

  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM",
  ];

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch("/api/add-booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccessMessage("Booking successful!");
        setBookingDetails(formData);
        setShowDialog(true); // Open dialog
        setFormData({
          service: "",
          location: "",
          date: "",
          timeSlot: "",
        });
      } else {
        setError(result.error || "Failed to book service");
      }
    } catch (err) {
      setError(err + "An error occurred while booking the service");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen p-3 md:p-6 bg-white text-black">
      <div className="w-full max-w-3xl space-y-6">

        {/* Service Selection */}
        <select
          name="service"
          className="w-full p-3 border rounded-lg"
          required
          value={formData.service}
          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
        >
          <option value="">Select a Service</option>
          {services.map((service) => (
            <option key={service.id} value={service.name}>{service.name}</option>
          ))}
        </select>

        {/* Location Selection */}
        <select
          name="location"
          className="w-full p-3 border rounded-lg"
          required
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
        >
          <option value="">Select a Location</option>
          <option value="Location 1">Location 1</option>
          <option value="Location 2">Location 2</option>
        </select>

        {/* Date Picker */}
        <input
          type="date"
          name="date"
          className="w-full p-3 border rounded-lg bg-green-100 text-[#75E379] focus:ring-[#75E379] text-lg appearance-none"
          required
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        />

        {/* Time Slot Selection */}
        <div>
          <p className="font-medium mb-2">Select a Time Slot:</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {timeSlots.map((slot) => (
              <button
                key={slot}
                className={`p-2 rounded-lg border ${formData.timeSlot === slot ? "bg-[#75E379] text-white" : "bg-gray-200"}`}
                onClick={() => setFormData({ ...formData, timeSlot: slot })}
                type="button"
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          className="w-full bg-[#75E379] text-white p-3 rounded-lg font-semibold hover:bg-green-600 transition"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? "Booking..." : "Book Service"}
        </button>

        {/* Alert Dialog */}
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent className="max-w-md text-center p-6 bg-white rounded-lg">
            <DialogHeader>
              {/* Hidden Title for Screen Readers */}
              <DialogTitle>Booking Confirmation</DialogTitle>

              {/* Small Image at the Top */}
              <div className="flex justify-center">
                <CheckCircle className="my-5 w-20 h-20 text-[#75E379]" />
              </div>

              {/* In Process Status */}
              <p className="mt-4 px-3 py-1 border border-gray-300 text-[#75E379] rounded-md text-sm inline-block w-fit">
                In Process
              </p>

              {/* Service Name */}
              <h2 className="text-xl font-semibold mt-3">{bookingDetails.service || "N/A"}</h2>

              {/* Description */}
              <p className="text-gray-600 mt-2 text-sm">
                You have successfully notified Mondele Sports of your booking. We will contact you soon to finalize payment.
              </p>
            </DialogHeader>

            {/* Booking Details */}
            <div className="mt-4 space-y-3 text-gray-800 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#75E379]" />
                <span>{bookingDetails.date || "N/A"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#75E379]" />
                <span>{bookingDetails.timeSlot || "N/A"}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#75E379]" />
                <span>{bookingDetails.location || "N/A"}</span>
              </div>
            </div>

            {/* Confirm Button */}
            <DialogFooter>
              <Button className="bg-[#75E379] hover:bg-green-600 text-white w-full" onClick={() => setShowDialog(false)}>
                Confirm
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Error or Success Message */}
        {error && <div className="text-red-500 mt-4">{error}</div>}
        {successMessage && <div className="text-[#75E379] mt-4">{successMessage}</div>}
      </div>
    </div>
  );
}
