'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from '@/components/ui/BaseImage';
import lessonData from '@/data/karate-lesson.json';
import { useGradientStyle } from '@/lib/GradientStyleContext';
import ThemeGradientBackground from './ThemeGradientBackground';

interface LessonStep {
  id: number;
  title: string;
  duration: string;
  description: string;
  details: string[];
  image: string;
  color: string;
  icon: string;
}

interface LessonData {
  totalDurationLabel: string;
  heroTitle: string;
  heroSubtitle: string;
  progressTitle: string;
  stepLabel: string;
  onLabel: string;
  programLabel: string;
  placeholderText: string;
  ctaTitle: string;
  ctaSubtitle: string;
  ctaPrimaryButton: string;
  ctaSecondaryButton: string;
  playButton: string;
  pauseButton: string;
  steps: LessonStep[];
}

const data = lessonData as LessonData;
const lessonSteps = data.steps;

export default function KarateLesson() {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const { gradientStyle } = useGradientStyle();

  // Auto-progression when playing
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % lessonSteps.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const totalDuration = lessonSteps.reduce((acc, step) => {
    const minutes = parseInt(step.duration);
    return acc + minutes;
  }, 0);

  return (
    <div className="min-h-screen">
      {/* Add the theme-aware background */}
      <ThemeGradientBackground style={gradientStyle} />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-secondary-800/90 to-primary-800/90"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="relative w-full h-full">
            <Image
              src="/images/directly_useful/dojo-charlety.jpg"
              alt="Dojo background"
              fill
              objectFit="cover"
              className="object-cover"
              sizes="100vw"
              priority={false}
            />
          </div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-6 text-center text-white">
          <div className="inline-flex items-center gap-2 mb-6 px-6 py-3 bg-brand-500/20 rounded-full backdrop-blur-sm">
            <span className="text-2xl">🥋</span>
            <span className="font-medium">{data.totalDurationLabel}: {totalDuration} minutes</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-brand-200 bg-clip-text text-transparent">
            {data.heroTitle}
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-primary-100 max-w-3xl mx-auto">
            {data.heroSubtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                isPlaying 
                  ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/25' 
                  : 'bg-white text-secondary-800 shadow-lg hover:shadow-xl'
              }`}
            >
              {isPlaying ? data.pauseButton : data.playButton}
            </button>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Progress Bar */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-secondary-800 dark:text-secondary-200">{data.progressTitle}</h2>
              <span className="text-sm text-secondary-600 dark:text-secondary-400">
                {data.stepLabel} {activeStep + 1} {data.onLabel} {lessonSteps.length}
              </span>
            </div>
            
            <div className="relative h-2 bg-secondary-200 dark:bg-secondary-700 rounded-full overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-brand-500 to-primary-500 transition-all duration-1000 ease-out"
                style={{ width: `${((activeStep + 1) / lessonSteps.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Interactive Timeline */}
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Timeline Navigation */}
            <div className="space-y-4">
              {lessonSteps.map((step, index) => (
                <div
                  key={step.id}
                  onClick={() => setActiveStep(index)}
                  className={`cursor-pointer p-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] ${
                    activeStep === index
                      ? `bg-gradient-to-r ${step.color} text-white shadow-lg`
                      : 'bg-white dark:bg-secondary-800 hover:bg-primary-50 dark:hover:bg-secondary-700 text-secondary-800 dark:text-secondary-200 shadow border border-primary-200 dark:border-secondary-700'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`text-3xl ${activeStep === index ? '' : 'grayscale'}`}>
                      {step.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-bold text-lg">{step.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          activeStep === index 
                            ? 'bg-white/20 text-white' 
                            : 'bg-primary-100 dark:bg-primary-800 text-primary-700 dark:text-primary-300'
                        }`}>
                          {step.duration}
                        </span>
                      </div>
                      <p className={`text-sm ${
                        activeStep === index ? 'text-white/90' : 'text-secondary-600 dark:text-secondary-400'
                      }`}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Active Step Details */}
            <div className="lg:sticky lg:top-8">
              <div className={`bg-gradient-to-br ${lessonSteps[activeStep].color} rounded-2xl p-8 text-white shadow-2xl`}>
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-4xl">{lessonSteps[activeStep].icon}</span>
                    <div>
                      <h3 className="text-2xl font-bold">{lessonSteps[activeStep].title}</h3>
                      <p className="text-white/80">{lessonSteps[activeStep].duration}</p>
                    </div>
                  </div>
                  
                  <p className="text-lg text-white/90 mb-6">
                    {lessonSteps[activeStep].description}
                  </p>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold mb-3 text-lg">{data.programLabel}</h4>
                  <ul className="space-y-2">
                    {lessonSteps[activeStep].details.map((detail, index) => (
                      <li key={index} className="flex items-center gap-3 text-white/90">
                        <span className="w-2 h-2 bg-white/60 rounded-full flex-shrink-0"></span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Placeholder for image */}
                <div className="aspect-video bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm">
                  <div className="text-center">
                    <div className="text-6xl mb-2">{lessonSteps[activeStep].icon}</div>
                    <p className="text-white/80">{data.placeholderText}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-secondary-800 to-primary-800 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {data.ctaTitle}
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            {data.ctaSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact"
              className="px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-brand-500/25"
            >
              {data.ctaPrimaryButton}
            </Link>
            <Link 
              href="/pratique"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-full transition-all duration-300 backdrop-blur-sm border border-white/20"
            >
              {data.ctaSecondaryButton}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}