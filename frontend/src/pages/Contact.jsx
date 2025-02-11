import React from "react";
import Layout from "../components/Layout";

const Contact = () => {
  return (
    <Layout className="flex items-center justify-center min-h-screen bg-gray-900 text-white px-6 py-12">
      <div className="max-w-lg mt-8 w-full bg-gray-800 p-8 rounded-lg shadow-lg mx-auto">
        <h2 className="text-3xl font-bold text-blue-400 text-center mb-6">
          Contact Us
        </h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Your Name</label>
            <input
              type="text"
              name="name"
              required
              className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 focus:outline-none focus:border-blue-400"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Your Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 focus:outline-none focus:border-blue-400"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Your Message</label>
            <textarea
              name="message"
              required
              rows="4"
              className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 focus:outline-none focus:border-blue-400"
              placeholder="Enter your message"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-300"
          >
            Send Message
          </button>
        </form>

        {/* Contact Details */}
        <div className="mt-6 border-t border-gray-600 pt-4">
          <p className="text-sm font-semibold pb-1">📧 Email: kumardurgeshjha@gmail.com</p>
          <p className="text-lg font-semibold">📞 Phone: 9006664115</p>
          <p className="text-lg font-semibold">📍 Address: Samastipur, Bihar</p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
