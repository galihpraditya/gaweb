"use client";

import React, { useState } from "react";
import { Lock, KeyRound, Eye, EyeOff, ArrowRight, ShieldAlert, Sparkles } from "lucide-react";

interface AdminLoginFormProps {
  onLoginSuccess: () => void;
}

export function AdminLoginForm({ onLoginSuccess }: AdminLoginFormProps) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setErrorMessage("Silakan masukkan kata sandi admin.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        onLoginSuccess();
      } else {
        setErrorMessage(data.error || "Kata sandi salah. Coba lagi.");
      }
    } catch {
      setErrorMessage("Terjadi gangguan saat menghubungi server.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-xl p-6 sm:p-8 relative z-10">
        {/* Brand Header */}
        <div className="text-center space-y-2 mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#004F72]/10 text-[#004F72] mb-2">
            <Lock className="w-6 h-6" />
          </div>
          <div className="font-extrabold text-2xl tracking-tight">
            <span className="text-[#092734]">ga</span>
            <span className="text-[#004F72]">web</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 ml-2">
              Panel Admin
            </span>
          </div>
          <p className="text-sm text-slate-500">
            Masuk untuk mengelola portofolio, gambar, dan isi website
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0 text-red-500" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">
              Kata Sandi Admin
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <KeyRound className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan kata sandi..."
                autoFocus
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#004F72] focus:ring-2 focus:ring-[#004F72]/10 text-sm text-[#092734] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 px-4 rounded-xl bg-[#004F72] hover:bg-[#003d59] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
          >
            {isLoading ? (
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Buka Panel Admin</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
