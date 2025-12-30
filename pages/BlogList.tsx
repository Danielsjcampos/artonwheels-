import React from 'react';
import { BlogPost } from '../types';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { SEO } from '../components/ui/seo';

export default function BlogList({ posts }: { posts: BlogPost[] }) {
  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SEO 
        title="Journal | Técnica e Estética Automotiva" 
        description="Fique por dentro das últimas novidades sobre performance, jantes forjadas e detalhe automotivo no Arton Journal."
      />
      <div className="mb-20">
        <h1 className="text-5xl font-outfit font-extrabold mb-6 uppercase">ARTON <span className="performance-red">JOURNAL</span></h1>
        <p className="text-gray-400 text-lg font-light max-w-2xl leading-relaxed">
          Técnica, performance e lifestyle. Explore conteúdos gerados pelos nossos especialistas.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {posts.map(post => (
          <Link to={`/blog/${post.slug}`} key={post.id} className="group">
            <div className="relative aspect-[16/10] rounded-[32px] overflow-hidden mb-8">
              <img src={post.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
            </div>
            <div className="space-y-4 px-2">
              <div className="flex items-center space-x-4 text-xs font-bold uppercase tracking-widest text-gray-500">
                <span className="flex items-center space-x-2"><Calendar className="w-3 h-3 performance-red" /> <span>{post.date}</span></span>
                <span className="flex items-center space-x-2"><User className="w-3 h-3 performance-red" /> <span>{post.author}</span></span>
              </div>
              <h3 className="text-2xl font-bold group-hover:text-performance-red transition-colors">{post.title}</h3>
              <p className="text-gray-400 font-light line-clamp-2">{post.content.replace(/[#*]/g, '')}</p>
              <div className="flex items-center space-x-2 text-xs font-bold performance-red tracking-widest uppercase mt-4">
                <span>Ler Artigo</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
