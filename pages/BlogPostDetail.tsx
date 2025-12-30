import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { BlogPost } from '../types';
import { ArrowLeft, Calendar, User, Share2 } from 'lucide-react';
import { SEO } from '../components/ui/seo';

export default function BlogPostDetail({ posts }: { posts: BlogPost[] }) {
  const { slug } = useParams();
  const post = posts.find(p => p.slug === slug);

  if (!post) return <div className="pt-40 text-center">Post não encontrado.</div>;

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "image": [post.image],
    "datePublished": post.date,
    "author": [{
        "@type": "Person",
        "name": post.author
      }]
  };

  return (
    <div className="pt-28 pb-20 px-4 max-w-4xl mx-auto">
      <SEO 
        title={post.title}
        description={post.content.slice(0, 160).replace(/[#*]/g, '')}
        image={post.image}
        type="article"
        schema={blogSchema}
      />
      <Link to="/blog" className="inline-flex items-center space-x-2 text-gray-500 hover:text-white mb-12 text-sm font-bold uppercase tracking-widest transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span>Voltar ao Blog</span>
      </Link>

      <div className="mb-12">
        <div className="flex items-center space-x-4 text-xs font-bold uppercase tracking-widest text-gray-500 mb-6">
          <span className="bg-performance-red/10 text-performance-red px-3 py-1 rounded-full">Editorial</span>
          <span>{post.date} • Por {post.author}</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-outfit font-extrabold mb-10 leading-tight">{post.title}</h1>
        <div className="aspect-[21/9] rounded-[40px] overflow-hidden mb-12 shadow-2xl">
          <img src={post.image} className="w-full h-full object-cover" />
        </div>
      </div>

      <div className="prose prose-invert prose-red max-w-none text-gray-300 font-light text-lg leading-relaxed">
        {post.content.split('\n').map((para, i) => (
          <p key={i} className="mb-6">{para}</p>
        ))}
      </div>

      <div className="mt-20 pt-10 border-t border-white/5 flex items-center justify-between">
        <div className="flex space-x-2">
          {post.keywords.map(k => (
            <span key={k} className="text-[10px] font-bold uppercase tracking-widest text-gray-500 bg-white/5 px-4 py-2 rounded-full">#{k}</span>
          ))}
        </div>
        <button className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
          <Share2 className="w-5 h-5" />
          <span className="text-sm font-bold uppercase tracking-widest">Partilhar</span>
        </button>
      </div>
    </div>
  );
}
