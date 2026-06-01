/* eslint-disable no-unused-vars */
import React from 'react';

function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-12 flex items-center justify-between">
        <p className="text-xs text-slate-500">
          Developed by{' '}
          <a
            className="text-blue-500 hover:text-blue-700 font-medium transition-colors"
            href="https://qoisabdulqudus.netlify.app/"
            target="_blank"
            rel="noreferrer"
          >
            Qois Abdul Qudus
          </a>{' '}
          · 2024 v1.0
        </p>
        <a
          className="text-xs text-slate-500 hover:text-blue-600 transition-colors"
          href="https://dishub.serangkota.go.id/"
          target="_blank"
          rel="noreferrer"
        >
          © Dishub Kota Serang
        </a>
      </div>
    </footer>
  );
}

export default Footer;
