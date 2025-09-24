import React from 'react';
import { ExternalLink, Globe, Video, FileText } from 'lucide-react';

// Import all JSON data
import websites from '@/data/recommended-websites.json';
import videosData from '@/data/videos.json';
import booksData from '@/data/books.json';
import otherResourcesData from '@/data/other-resources.json';
import pageData from '@/data/resources-page.json';

const RessourcesPage = () => {
  // Extract page content from JSON
  const { title, subtitle, sections } = pageData;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90">
      <div className="container mx-auto px-4 py-16 relative">
        {/* Add floating elements for depth */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-brand/5 rounded-full blur-xl pointer-events-none"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/5 rounded-full blur-xl pointer-events-none"></div>

        {/* Header with decorative elements */}
        <div className="relative mb-16">
          <div className="absolute top-0 left-0 w-20 h-20 border-l-4 border-t-4 border-secondary-500/30 -translate-x-4 -translate-y-4"></div>
          <div className="absolute bottom-0 right-0 w-20 h-20 border-r-4 border-b-4 border-secondary-500/30 translate-x-4 translate-y-4"></div>
          <div className="text-center relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{title}</h1>
            <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Stylish divider */}
        <div className="flex items-center justify-center mb-16">
          <div className="w-1/4 h-0.5 bg-gradient-to-r from-transparent via-secondary-300/50 to-transparent"></div>
          <Globe className="mx-4 text-secondary-500" size={24} />
          <div className="w-1/4 h-0.5 bg-gradient-to-l from-transparent via-secondary-300/50 to-transparent"></div>
        </div>

        {/* Books Section */}
        <section className="mb-24">
          {/* Section header */}
          <div className="flex items-center justify-center mb-12">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-px bg-gradient-to-r from-transparent to-brand-400"></div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-brand-500 to-primary-500 rounded-full blur opacity-30"></div>
                <span className="relative bg-gradient-to-r from-brand-600 to-primary-600 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-lg">
                  {sections.books.title}
                </span>
              </div>
              <div className="w-8 h-px bg-gradient-to-l from-transparent to-primary-400"></div>
            </div>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {booksData.map((book, index) => (
              <div 
                key={index} 
                className="group bg-background/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:shadow-lg hover:border-white/20 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-secondary-100 dark:bg-secondary-900/50 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-secondary-700 dark:text-secondary-300">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-3">{book.title}</h3>
                <div className="space-y-2 mb-4">
                  <p className="text-foreground/70 text-sm">
                    <span className="font-medium text-brand-600 dark:text-brand-400">Auteur:</span> {book.author}
                  </p>
                  <p className="text-foreground/70 text-sm">
                    <span className="font-medium text-secondary-600 dark:text-secondary-400">Éditeur:</span> {book.publisher}
                  </p>
                </div>
                <p className="text-foreground/80 text-sm italic leading-relaxed border-l-2 border-brand-300/50 dark:border-brand-700/50 pl-3">
                  {book.description}
                </p>
              </div>
            ))}
          </div>
        </section>


        {/* Videos Section */}
        <section className="mb-24">
          {/* Section header */}
          <div className="flex items-center justify-center mb-12">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-px bg-gradient-to-r from-transparent to-brand-400"></div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-brand-500 to-primary-500 rounded-full blur opacity-30"></div>
                <span className="relative bg-gradient-to-r from-brand-600 to-primary-600 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-lg">
                  {sections.videos.title}
                </span>
              </div>
              <div className="w-8 h-px bg-gradient-to-l from-transparent to-primary-400"></div>
            </div>
          </div>
          
          {/* Video cards */}
          <div className="grid gap-8 lg:grid-cols-2">
            {videosData.map((video, index) => (
              <div 
                key={index} 
                className="group bg-gradient-to-br from-background/90 to-background/70 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
              >
                {/* Video iframe */}
                <div className="relative aspect-video overflow-hidden">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src={`https://www.youtube.com/embed/${video.videoId}`}
                    title={video.title} 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen
                    className="w-full h-full"
                    loading="lazy"
                  />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-500 to-secondary-500 flex items-center justify-center shadow-md">
                      <Video className="text-white" size={16} />
                    </div>
                    <h3 className="text-xl font-bold ml-3">
                      {video.title}
                    </h3>
                  </div>
                  
                  <p className="text-foreground/70 leading-relaxed text-sm">
                    {video.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* YouTube Channel Recommendation */}
          {otherResourcesData.channels && otherResourcesData.channels.length > 0 && (
            <div className="mt-16">
              {/* Section header */}
              <div className="flex items-center justify-center mb-8">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-px bg-gradient-to-r from-transparent to-brand-400"></div>
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-500 to-primary-500 rounded-full blur opacity-30"></div>
                    <span className="relative bg-gradient-to-r from-brand-600 to-primary-600 text-white px-6 py-2 rounded-full font-medium text-base shadow-lg">
                      {sections.channels.title}
                    </span>
                  </div>
                  <div className="w-8 h-px bg-gradient-to-l from-transparent to-primary-400"></div>
                </div>
              </div>
              
              <div className="max-w-4xl mx-auto">
                {otherResourcesData.channels.map((channel, index) => (
                  <div key={index} className="bg-background/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-colors duration-300">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-secondary-100 dark:bg-secondary-900/50 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary-700 dark:text-secondary-300" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                          </svg>
                        </div>
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className="text-lg font-semibold mb-2">
                          Chaîne recommandée: {channel.name}
                        </h3>
                        <p className="text-foreground/70 mb-4 leading-relaxed">
                          {channel.description}
                        </p>
                        <a 
                          href={channel.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="inline-flex items-center py-2 px-4 rounded-lg bg-brand-600 hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-600 transition-colors duration-300 text-white font-medium text-sm"
                        >
                          Visiter la chaîne
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {sections.videos?.footer && (
            <p className="text-center text-foreground/60 italic mt-8 text-sm">
              {sections.videos.footer}
            </p>
          )}
        </section>


        {/* Websites Section */}
        <section className="mb-24">
          {/* Section header */}
          <div className="flex items-center justify-center mb-12">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-px bg-gradient-to-r from-transparent to-brand-400"></div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-brand-500 to-primary-500 rounded-full blur opacity-30"></div>
                <span className="relative bg-gradient-to-r from-brand-600 to-primary-600 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-lg">
                  {sections.websites?.title || 'Sites web recommandés'}
                </span>
              </div>
              <div className="w-8 h-px bg-gradient-to-l from-transparent to-primary-400"></div>
            </div>
          </div>
          
          {/* Website cards */}
          <div className="grid gap-6 lg:grid-cols-2">
            {websites.map((site, index) => (
              <div 
                key={index} 
                className="group relative bg-gradient-to-br from-background/90 via-background/80 to-background/70 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-1"
              >
                {/* Animated background pattern */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-brand/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-secondary/10 to-transparent rounded-full translate-y-12 -translate-x-12"></div>
                </div>
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-100 to-secondary-100 dark:from-brand-900/50 dark:to-secondary-900/50 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-md">
                      <Globe className="text-brand-600 dark:text-brand-400" size={20} />
                    </div>
                    <div className="w-2 h-2 rounded-full bg-brand-500 group-hover:bg-secondary-500 transition-colors duration-300"></div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3">
                    {site.title}
                  </h3>
                  
                  <p className="text-foreground/70 mb-6 leading-relaxed text-sm">
                    {site.description}
                  </p>
                  
                  <a
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center py-2.5 px-5 rounded-lg bg-gradient-to-r from-brand-600 to-secondary-600 hover:from-brand-700 hover:to-secondary-700 text-white font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-sm"
                  >
                    Visiter le site
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* Decorative footer element */}
        <div className="mt-16 mb-8 text-center">
          <div className="inline-block h-px w-24 bg-gradient-to-r from-transparent via-brand-300/50 to-transparent"></div>
        </div>
      </div>
    </div>
  );
};

export default RessourcesPage;
