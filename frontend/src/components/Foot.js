import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-white py-10 mt-10 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

        <div>
          <h2 className="text-2xl font-bold text-green-400 mb-2">FoodMonkey</h2>
          <p className="text-sm text-gray-400">
            Your favorite food delivered fast & fresh. Book your meals in a click.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link to="/" className="hover:text-green-400">Home</Link></li>
            <li><Link to="/myorder" className="hover:text-green-400">My Orders</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
          <p className="text-sm text-gray-400">Email: support@foodmonkey.com</p>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4 text-gray-300 text-xl">
            <a href="#" className="hover:text-blue-400"><i class="fab fa-facebook"></i></a>
            <a href="#" className="hover:text-pink-500"><i className="fab fa-instagram"></i></a>
            <a href="#" className="hover:text-blue-300"><i className="fab fa-twitter"></i></a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm text-gray-500 mt-10 border-t border-zinc-700 pt-6">
        © {new Date().getFullYear()} FoodMonkey. All rights reserved.
      </div>
    </footer>
  );
}
