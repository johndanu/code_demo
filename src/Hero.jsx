import React, { use } from 'react';
import CodeDemo from './HeroComponent/CodeDemo';
import LanguageBadges from './HeroComponent/LanguageBadges';
import { ArrowRight, Code, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const navigate=useNavigate();
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-slate-900 to-indigo-950 text-white min-h-screen">

      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:30px_30px]" />
      <div className="absolute h-32 w-full bg-gradient-to-b from-indigo-500/10 to-transparent" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-12 sm:py-16 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            {/* Left column - Text content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600">
                    <Code className="h-5 w-5" />
                  </div>
                  <h2 className="ml-3 text-xl font-medium bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                    CODE DEMO
                  </h2>
                </div>
                
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                  Begin Your <span className="text-indigo-400">Coding</span> Journey
                </h1>
                
                <p className="max-w-3xl text-lg sm:text-xl text-slate-300">
                  Learn programming fundamentals in an interactive environment designed for beginners.
                  Start with simple concepts and build your skills step by step.
                </p>
              </div>
              
             
                <button
                onClick={() => navigate('/syllabus/js')}
                className="group flex items-center justify-center rounded-lg bg-indigo-600 px-6 py-3 text-base font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900">
                  Start Learning 
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
                
               
              
              
              <LanguageBadges />
            </div>
            
            {/* Right column - Code demo */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50">
                <CodeDemo />
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 blur-2xl opacity-20" />
              <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-gradient-to-br from-blue-500 to-teal-600 blur-2xl opacity-20" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;