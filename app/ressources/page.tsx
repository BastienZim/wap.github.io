import React from 'react';
import { ExternalLink, Globe, Book, Video, FileText } from 'lucide-react';

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
    <div className="container mx-auto px-4 py-12">
      {/* Header with decorative elements */}
      <div className="relative mb-12">
        <div className="absolute top-0 left-0 w-20 h-20 border-l-4 border-t-4 border-secondary-500 -translate-x-4 -translate-y-4 opacity-30"></div>
        <div className="absolute bottom-0 right-0 w-20 h-20 border-r-4 border-b-4 border-secondary-500 translate-x-4 translate-y-4 opacity-30"></div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">{title}</h1>
        <p className="text-lg md:text-xl mb-8 text-foreground/80 max-w-3xl mx-auto text-center">
          {subtitle}
        </p>
      </div>

      {/* Stylish divider */}
      <div className="flex items-center justify-center mb-12">
        <div className="w-1/4 h-0.5 bg-gradient-to-r from-transparent via-secondary-300 to-transparent"></div>
        <Globe className="mx-4 text-secondary-500" size={24} />
        <div className="w-1/4 h-0.5 bg-gradient-to-l from-transparent via-secondary-300 to-transparent"></div>
      </div>

      {/* Books Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-8 text-center relative">
          <span className="inline-block px-4 py-1 bg-primary-700 dark:bg-primary-100 rounded-full text-primary-100 dark:text-primary-700">{sections.books.title}</span>
        </h2>
        
        <div className="grid gap-6 md:grid-cols-3">
          {booksData.map((book, index) => (
            <div key={index} className="bg-background/50 backdrop-blur rounded-xl p-6 border border-primary-700 dark:border-primary-100 group hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-secondary-100 dark:bg-secondary-900/50 flex items-center justify-center mb-4">
                <Book className="text-secondary-700 dark:text-secondary-300" size={20} />
              </div>
              <h3 className="text-lg font-medium mb-2 text-primary-700 dark:text-primary-100">{book.title}</h3>
              <p className="text-foreground/70 mb-2">
                <span className="font-semibold">Auteur:</span> {book.author}
              </p>
              <p className="text-foreground/70 mb-4">
                <span className="font-semibold">Éditeur:</span> {book.publisher}
              </p>
              <p className="text-foreground/80 text-sm italic">
                {book.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Videos Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-8 text-center relative">
          <span className="inline-block px-4 py-1 bg-primary-700 dark:bg-primary-100 rounded-full text-primary-100 dark:text-primary-700">{sections.videos.title}</span>
        </h2>
        
        {/* Individual Videos */}
        <div className="grid gap-8 md:grid-cols-2 mb-10">
          {videosData.map((video, index) => (
            <div key={index} className="bg-background/50 backdrop-blur rounded-xl p-6 border border-primary-700 dark:border-primary-100">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-secondary-100 dark:bg-secondary-900/50 flex items-center justify-center">
                  <Video className="text-secondary-700 dark:text-secondary-300" size={20} />
                </div>
                <h3 className="text-xl font-medium ml-3 text-primary-700 dark:text-primary-100">{video.title}</h3>
              </div>
              
              <div className="aspect-video w-full rounded-lg overflow-hidden mb-4 shadow-lg">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src={`https://www.youtube.com/embed/${video.videoId}`}
                  title={video.title} 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
              
              <div className="mt-4">
                <p className="text-foreground/70">
                  {video.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* YouTube Channel Recommendation */}
        {otherResourcesData.channels.length > 0 && (
          <div className="mb-10">
            <h3 className="text-xl font-semibold mb-6 text-center text-primary-700 dark:text-primary-100">{sections.channels.title}</h3>
            <div className="grid gap-6 md:grid-cols-1">
              {otherResourcesData.channels.map((channel, index) => (
                <div key={index} className="bg-primary-700/50 dark:bg-primary-100/30 backdrop-blur rounded-xl p-6 border border-primary-700 dark:border-primary-100">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-secondary-200 dark:bg-secondary-800/50 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary-700 dark:text-secondary-300" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="text-xl font-semibold mb-1 text-primary-700 dark:text-primary-100">Chaîne recommandée: {channel.name}</h3>
                      <p className="text-foreground/70 mb-3">
                        {channel.description}
                      </p>
                      <a 
                        href={channel.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center py-2 px-4 rounded-full bg-primary-700 hover:bg-primary-800 dark:bg-primary-100/40 dark:hover:bg-primary-100/60 transition-colors duration-300 text-primary-100 dark:text-primary-700"
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
        
        <p className="text-center text-foreground/60 italic">{sections.videos.footer}</p>
      </section>

      {/* Websites section with enhanced cards */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-8 text-center relative">
          <span className="inline-block px-4 py-1 bg-primary-700 dark:bg-primary-100 rounded-full text-primary-100 dark:text-primary-700">Sites web recommandés</span>
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {websites.map((site, index) => (
            <div 
              key={index} 
              className="bg-background/50 backdrop-blur rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300 border border-primary-700 dark:border-primary-100"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="w-10 h-10 rounded-full bg-secondary-100 dark:bg-secondary-900/50 flex items-center justify-center mb-4">
                    <Globe className="text-secondary-700 dark:text-secondary-300" size={20} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-primary-700 dark:text-primary-100">{site.title}</h3>
                  <p className="text-foreground/70 mb-6">{site.description}</p>
                  <a
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center py-2 px-4 rounded-full bg-primary-700 hover:bg-primary-800 dark:bg-primary-100/30 dark:hover:bg-primary-100/50 transition-colors duration-300 text-primary-100 dark:text-primary-700"
                  >
                    Visiter le site
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Decorative footer element */}
      <div className="mt-16 mb-8 text-center">
        <div className="inline-block p-px w-24 bg-gradient-to-r from-transparent via-brand-300 to-transparent"></div>
      </div>
    </div>
  );
};

export default RessourcesPage;
