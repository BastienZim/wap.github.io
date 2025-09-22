'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import ThemeGradientBackground from '@/components/ThemeGradientBackground';
import { useGradientStyle } from '@/lib/GradientStyleContext';

export default function NotFound() {
  const router = useRouter();
  const { gradientStyle } = useGradientStyle();

  const handleGoBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Gradient Background */}
      <ThemeGradientBackground 
        mode="auto" 
        style={gradientStyle || 'wap'}
      />
      
      {/* Content */}
      <section className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="container px-6 py-12 mx-auto lg:flex lg:items-center lg:gap-12">
          {/* Text Section */}
          <div className="w-full lg:w-1/2">
            {/* Error Badge */}
            <div className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium rounded-full backdrop-blur-sm
              bg-black/10 border border-black/20 text-foreground
              dark:bg-white/20 dark:border-white/30 dark:text-white">
              <span className="mr-2">🥋</span>
              404 - Page introuvable
            </div>
            
            <h1 className="text-4xl font-bold text-foreground dark:text-white md:text-5xl lg:text-6xl mb-6">
              Cette page a disparu...
            </h1>
            
            <p className="text-lg text-foreground/90 dark:text-white/90 mb-8 leading-relaxed">
              Comme un karatéka discret dans l&apos;ombre, cette page semble avoir maîtrisé l&apos;art de l&apos;invisibilité. 
              Mais ne vous inquiétez pas, nous vous aidons à retrouver votre chemin !
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleGoBack}
                variant="outline"
                tone="light"
                size="lg"
                className="backdrop-blur-sm bg-black/5 border border-black/20 text-foreground hover:bg-black/10 focus-visible:ring-black/30
                  dark:bg-white/10 dark:border-white/30 dark:text-white dark:hover:bg-white/20 dark:focus-visible:ring-white/50"
                aria-label="Retourner à la page précédente"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 mr-2"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                  />
                </svg>
                Retour
              </Button>

              <Link href="/" className="inline-block">
                <Button
                  variant="solid"
                  tone="light"
                  size="lg"
                  aria-label="Retourner à l'accueil du site"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5 mr-2"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                    />
                  </svg>
                  Accueil
                </Button>
              </Link>
            </div>

            {/* Quick Navigation Links */}
            <div className="mt-12">
              <p className="text-foreground/70 dark:text-white/70 text-sm mb-4">Ou explorez ces sections :</p>
              <div className="flex flex-wrap gap-2">
                <Link href="/cours-type" className="inline-block">
                  <Button variant="ghost" tone="light" size="sm" className="text-foreground/80 dark:text-white/80 hover:text-foreground dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10">
                    Types de cours
                  </Button>
                </Link>
                <Link href="/wado-karate-info" className="inline-block">
                  <Button variant="ghost" tone="light" size="sm" className="text-foreground/80 dark:text-white/80 hover:text-foreground dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10">
                    Wado-Ryu
                  </Button>
                </Link>
                <Link href="/galerie" className="inline-block">
                  <Button variant="ghost" tone="light" size="sm" className="text-foreground/80 dark:text-white/80 hover:text-foreground dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10">
                    Galerie
                  </Button>
                </Link>
                <Link href="/contact" className="inline-block">
                  <Button variant="ghost" tone="light" size="sm" className="text-foreground/80 dark:text-white/80 hover:text-foreground dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10">
                    Contact
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="relative w-full mt-12 lg:w-1/2 lg:mt-0">
            {/* Main Image Container */}
            <div className="aspect-square lg:aspect-[4/5] relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 transform transition-all duration-700 hover:scale-105 hover:shadow-2xl">
              <Image
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                src="/images/directly_useful/shiomitsu_waterfall.JPG"
                alt="Maître Shiomitsu sous une cascade."
                loading="lazy"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={false}
              />
              
              {/* Image Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              

              {/* WAP Logo in corner */}
              <div className="absolute bottom-4 left-4">
                <Image
                  className="w-16 h-16 opacity-80 hover:opacity-100 transition-opacity duration-300"
                  src="/images/directly_useful/logowapgris.png"
                  alt="Logo WAP - Wado Academy Paris"
                  loading="lazy"
                  width={100}
                  height={100}
                />
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
