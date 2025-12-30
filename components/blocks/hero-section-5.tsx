'use client'
import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import { InfiniteSlider } from '../ui/infinite-slider'
import { ProgressiveBlur } from '../ui/progressive-blur'
import { cn } from '../../lib/utils'
import { ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { StoreSettings } from '../../types'

interface HeroSectionProps {
    settings: StoreSettings;
}

export function HeroSection({ settings }: HeroSectionProps) {
    const getYouTubeId = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const videoUrl = settings.heroVideoUrl || "https://ik.imagekit.io/lrigu76hy/tailark/dna-video.mp4?updatedAt=1745736251477";
    const ytId = getYouTubeId(videoUrl);

    return (
        <main className="overflow-x-hidden">
            <section className="relative min-h-screen flex flex-col justify-center">
                <div className="py-32 md:pb-32 lg:pb-36 lg:pt-48">
                    <div className="relative z-10 mx-auto flex max-w-7xl flex-col px-6 lg:block lg:px-12">
                        <div className="mx-auto max-w-lg text-center lg:ml-0 lg:max-w-full lg:text-left">
                            <motion.h1 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="mt-8 max-w-2xl text-balance text-5xl md:text-6xl lg:mt-16 xl:text-7xl font-outfit font-extrabold tracking-tighter"
                            >
                                ART ON <br />
                                <span className="text-red-600">WHEELS</span>
                            </motion.h1>
                            <motion.p 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="mt-8 max-w-2xl text-balance text-lg text-gray-300 font-light"
                            >
                                {settings.name} - A essência da performance e estética automotiva de luxo. 
                                Especialistas em jantes exclusivas, motos de elite e detalhe técnico.
                            </motion.p>

                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start"
                            >
                                <Button
                                    asChild
                                    size="lg"
                                    className="h-14 rounded-full pl-8 pr-6 text-base bg-red-600 hover:bg-red-700 text-white border-none"
                                >
                                    <Link to="/store">
                                        <span className="text-nowrap font-bold uppercase tracking-wider">Explorar Loja</span>
                                        <ChevronRight className="ml-2 w-5 h-5" />
                                    </Link>
                                </Button>
                                <Button
                                    asChild
                                    size="lg"
                                    variant="ghost"
                                    className="h-14 rounded-full px-8 text-base border border-white/10 hover:bg-white/5 text-white"
                                >
                                    <Link to="/services">
                                        <span className="text-nowrap font-bold uppercase tracking-wider">Serviços Premium</span>
                                    </Link>
                                </Button>
                            </motion.div>
                        </div>
                    </div>
                    <div className="absolute inset-0 overflow-hidden z-0">
                        {ytId ? (
                            <div className="absolute inset-0 pointer-events-none scale-150">
                                <iframe
                                    className="w-full h-full opacity-40 grayscale"
                                    src={`https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&loop=1&playlist=${ytId}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1`}
                                    allow="autoplay; encrypted-media"
                                    frameBorder="0"
                                ></iframe>
                            </div>
                        ) : (
                            <video
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="size-full object-cover opacity-40 grayscale"
                                src={videoUrl}
                            ></video>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent"></div>
                    </div>
                </div>
            </section>
            <section className="bg-background pb-12">
                <div className="group relative m-auto max-w-7xl px-6">
                    <div className="flex flex-col items-center md:flex-row gap-8">
                        <div className="md:max-w-44 md:border-r border-white/10 md:pr-12 text-center md:text-right">
                            <p className="text-sm font-bold uppercase tracking-widest text-gray-500">Parceiros de Performance</p>
                        </div>
                        <div className="relative py-6 md:w-[calc(100%-11rem)] overflow-hidden">
                            <InfiniteSlider
                                speed={40}
                                gap={112}
                            >
                                {[
                                    { name: 'Ducati', url: 'https://static.cdnlogo.com/logos/d/74/ducati.svg' },
                                    { name: 'BMW Motorrad', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Logo_BMW_Motorrad_2021.svg/2560px-Logo_BMW_Motorrad_2021.svg.png' },
                                    { name: 'Brembo', url: 'https://static.cdnlogo.com/logos/b/78/brembo.svg' },
                                    { name: 'Akrapovič', url: 'https://static.cdnlogo.com/logos/a/22/akrapovic.svg' },
                                    { name: 'Liqui Moly', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Liqui-moly.svg/1280px-Liqui-moly.svg.png' },
                                    { name: 'Michelin', url: 'https://static.cdnlogo.com/logos/m/5/michelin.svg' },
                                    { name: 'Kawasaki', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Kawasaki_Heavy_Industries_Logo.svg/2560px-Kawasaki_Heavy_Industries_Logo.svg.png' },
                                    { name: 'Öhlins', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Oehlins_logo.svg/2560px-Oehlins_logo.svg.png' },
                                ].map((brand, i) => (
                                    <div key={i} className="flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                                        <img
                                            className="h-7 w-auto invert"
                                            src={brand.url}
                                            alt={`${brand.name} Logo`}
                                        />
                                    </div>
                                ))}
                            </InfiniteSlider>

                            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10"></div>
                            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10"></div>
                            
                            <ProgressiveBlur
                                className="pointer-events-none absolute left-0 top-0 h-full w-20 z-10"
                                direction="left"
                                blurIntensity={1}
                            />
                            <ProgressiveBlur
                                className="pointer-events-none absolute right-0 top-0 h-full w-20 z-10"
                                direction="right"
                                blurIntensity={1}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
