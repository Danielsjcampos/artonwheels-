'use client';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
import { useScroll } from '@/components/ui/use-scroll';
import { StoreSettings } from '@/types';

export function Header({ settings }: { settings: StoreSettings }) {
	const [open, setOpen] = React.useState(false);
	const scrolled = useScroll(10);
	const location = useLocation();

	const links = [
		{ label: 'Início', href: '/' },
		{ label: 'Loja', href: '/store' },
		{ label: 'Serviços', href: '/services' },
		{ label: 'Consultar OS', href: '/tracking' },
		{ label: 'Contacto', href: '/contact' },
	];

	React.useEffect(() => {
		if (open) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
		return () => {
			document.body.style.overflow = '';
		};
	}, [open]);

	return (
		<header
			className={cn(
				'fixed top-0 left-0 right-0 z-50 mx-auto w-full max-w-7xl border-b border-transparent md:transition-all md:ease-out',
				{
					'bg-[#0a0a0a]/80 supports-[backdrop-filter]:bg-[#0a0a0a]/50 border-white/5 backdrop-blur-lg md:top-4 md:max-w-5xl md:rounded-3xl md:border md:shadow-2xl':
						scrolled && !open,
					'bg-[#0a0a0a]': open,
				},
			)}
		>
			<nav
				className={cn(
					'flex h-20 w-full items-center justify-between px-6 md:h-16 md:transition-all md:ease-out',
					{
						'md:px-8': scrolled,
					},
				)}
			>
				<Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
					<img src={settings.logo} alt={settings.name} className="h-10 w-auto object-contain" />
				</Link>

				<div className="hidden items-center gap-2 md:flex">
					{links.map((link, i) => (
						<Link 
							key={i} 
							className={buttonVariants({ 
								variant: 'ghost',
								className: 'text-gray-300 hover:text-white' 
							})} 
							to={link.href}
						>
							{link.label}
						</Link>
					))}
					<div className="w-px h-4 bg-white/10 mx-2" />
					<Link to="/admin" className={buttonVariants({ variant: 'outline', className: 'rounded-full border-white/10 hover:bg-white/5' })}>
						Área Técnica
					</Link>
				</div>

				<Button 
					size="icon" 
					variant="ghost" 
					onClick={() => setOpen(!open)} 
					className="md:hidden text-white hover:bg-white/5"
				>
					<MenuToggleIcon open={open} className="size-6" duration={300} />
				</Button>
			</nav>

			{/* Mobile Menu */}
			<div
				className={cn(
					'bg-[#0a0a0a] fixed top-20 right-0 bottom-0 left-0 z-[60] flex flex-col overflow-hidden transition-all duration-300 md:hidden',
					open ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0',
				)}
			>
				<div
					className="flex h-full w-full flex-col justify-between gap-y-2 p-6"
				>
					<div className="grid gap-y-4">
						{links.map((link) => (
							<Link
								key={link.label}
								onClick={() => setOpen(false)}
								className="text-2xl font-bold text-gray-300 hover:text-white transition-colors py-4 border-b border-white/5"
								to={link.href}
							>
								{link.label}
							</Link>
						))}
					</div>
					<div className="flex flex-col gap-4 pb-12">
						<Link 
							to="/admin" 
							onClick={() => setOpen(false)}
							className={buttonVariants({ 
								variant: 'default', 
								className: 'w-full h-14 text-lg bg-red-600 hover:bg-red-700' 
							})}
						>
							Área Técnica
						</Link>
					</div>
				</div>
			</div>
		</header>
	);
}
