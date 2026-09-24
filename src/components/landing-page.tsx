import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, ExternalLink, Menu, Pause, Play, X } from "lucide-react";
import logoAsset from "@/assets/fusion-edge-logo.png.asset.json";
import genesisHero from "@/assets/genesis-hero.jpg";
import { heroProjects, selectedWork, studioImage } from "@/data/site-content";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#featured" },
  { label: "Genesis", href: "#genesis" },
  { label: "Contact", href: "#contact" },
];

function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 border-b border-transparent transition-all duration-300", scrolled && "border-border bg-background/90 backdrop-blur-xl")}>
      <div className="page-gutter flex h-20 items-center justify-between lg:h-24">
        <a href="#top" aria-label="Fusion Edge Media home" className="relative z-50 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <img src={logoAsset.url} alt="Fusion Edge Media" className="h-auto w-48 object-contain sm:w-56 lg:w-72" width="512" height="512" />
        </a>
        <nav className="hidden items-center gap-9 lg:flex" aria-label="Main navigation">
          {navItems.map((item) => <a key={item.label} href={item.href} className="nav-link">{item.label}</a>)}
        </nav>
        <div className="hidden lg:flex">
          <Button asChild variant="outline"><a href="#contact">Start a project <ArrowRight size={15} /></a></Button>
        </div>
        <Button variant="icon" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((value) => !value)} className="relative z-50 lg:hidden">
          {open ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>
      <div className={cn("fixed inset-0 z-40 flex flex-col justify-center bg-background px-6 transition-all duration-300 lg:hidden", open ? "visible opacity-100" : "invisible opacity-0")}>
        <nav className="flex flex-col gap-3" aria-label="Mobile navigation">
          {navItems.map((item, index) => (
            <a key={item.label} href={item.href} onClick={() => setOpen(false)} className="border-b border-border py-4 font-display text-4xl uppercase text-foreground">
              <span className="mr-5 font-sans text-xs text-muted-foreground">0{index + 1}</span>{item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setActive((value) => (value + 1) % heroProjects.length), 7000);
    return () => window.clearInterval(timer);
  }, [paused]);

  const change = (direction: number) => setActive((active + direction + heroProjects.length) % heroProjects.length);
  const current = heroProjects[active];
  if (!current) return null;

  return (
    <section id="top" ref={sectionRef} aria-roledescription="carousel" aria-label="Featured productions" className="relative min-h-[680px] h-[100svh] overflow-hidden" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={() => setPaused(false)} onKeyDown={(e) => { if (e.key === "ArrowRight") change(1); if (e.key === "ArrowLeft") change(-1); }} tabIndex={0}>
      {heroProjects.map((project, index) => (
        <div key={project.title} aria-hidden={index !== active} className={cn("absolute inset-0 transition-opacity duration-700", index === active ? "opacity-100" : "opacity-0")}>
          <img src={project.image} alt={index === active ? project.alt : ""} fetchPriority={index === 0 ? "high" : "auto"} loading={index === 0 ? "eager" : "lazy"} className="h-full w-full object-cover object-center motion-safe:animate-[cinema-in_7s_ease-out_both]" width={1920} height={1080} />
        </div>
      ))}
      <div className="absolute inset-0 bg-hero-scrim" />
      <div className="page-gutter relative z-10 flex h-full items-end pb-32 pt-28 md:pb-28">
        <div key={current.title} className="max-w-4xl animate-reveal">
          <div className="mb-5 flex items-center gap-4 text-xs font-bold uppercase tracking-[0.22em] text-foreground/80">
            <span className="h-px w-10 bg-primary" />{current.kicker}<span className="text-muted-foreground">{current.year}</span>
          </div>
          <h1 className="font-display text-[clamp(3.5rem,8vw,8rem)] uppercase leading-[0.82] text-foreground">{current.title}</h1>
          <p className="mt-5 text-sm font-bold uppercase tracking-[0.2em] text-foreground">{current.subline}</p>
          <p className="mt-5 max-w-2xl text-base leading-7 text-foreground/75 md:text-lg">{current.body}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {current.primary && <Button asChild><a href={current.primary.href} target={current.primary.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{current.primary.label}<ArrowRight size={16} /></a></Button>}
            {current.secondary && <Button asChild variant="outline"><a href={current.secondary.href} target={current.secondary.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{current.secondary.label}{current.secondary.href.startsWith("http") && <ExternalLink size={14} />}</a></Button>}
          </div>
        </div>
      </div>
      <div className="page-gutter absolute inset-x-0 bottom-7 z-20 flex items-center gap-5">
        <div className="flex items-center gap-2">
          <Button variant="icon" aria-label="Previous slide" onClick={() => change(-1)}><ArrowLeft size={18} /></Button>
          <Button variant="icon" aria-label={paused ? "Resume carousel" : "Pause carousel"} onClick={() => setPaused((value) => !value)}>{paused ? <Play size={16} /> : <Pause size={16} />}</Button>
          <Button variant="icon" aria-label="Next slide" onClick={() => change(1)}><ArrowRight size={18} /></Button>
        </div>
        <div className="hidden flex-1 items-center gap-3 sm:flex">
          {heroProjects.map((project, index) => <button key={project.title} aria-label={`Show ${project.title}`} aria-current={index === active} onClick={() => setActive(index)} className="group flex h-11 flex-1 items-center"><span className={cn("h-px w-full transition-colors", index === active ? "bg-primary" : "bg-border group-hover:bg-foreground/50")} /></button>)}
        </div>
        <span className="text-xs tabular-nums text-foreground/70">0{active + 1} / 0{heroProjects.length}</span>
      </div>
      <a href="#featured" className="absolute bottom-8 right-[var(--gutter)] z-20 hidden items-center gap-3 text-xs uppercase tracking-[0.2em] text-foreground/60 xl:flex">Discover <ArrowDown size={16} /></a>
    </section>
  );
}

function WorkRail() {
  const railRef = useRef<HTMLDivElement>(null);
  const scroll = (direction: number) => railRef.current?.scrollBy({ left: direction * railRef.current.clientWidth * 0.72, behavior: "smooth" });
  return (
    <section id="featured" className="section-pad bg-background">
      <div className="page-gutter mb-10 flex items-end justify-between gap-6">
        <div><p className="eyebrow">The slate</p><h2 className="section-title">Featured work</h2></div>
        <div className="flex gap-2"><Button variant="icon" aria-label="Scroll projects left" onClick={() => scroll(-1)}><ArrowLeft size={18} /></Button><Button variant="icon" aria-label="Scroll projects right" onClick={() => scroll(1)}><ArrowRight size={18} /></Button></div>
      </div>
      <div ref={railRef} className="hide-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--gutter)] pb-4" tabIndex={0}>
        {heroProjects.map((project, index) => (
          <article key={project.title} className="group relative aspect-[16/10] w-[86vw] max-w-[720px] shrink-0 snap-start overflow-hidden bg-card md:w-[58vw] lg:w-[44vw]">
            <img src={project.image} alt={project.alt} loading="lazy" className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.025]" width={960} height={600} />
            <div className="absolute inset-0 bg-card-scrim" />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
              <div className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-foreground/65">0{index + 1} · {project.kicker}</div>
              <h3 className="font-display text-3xl uppercase text-foreground md:text-5xl">{project.title}</h3>
              <p className="mt-2 text-sm uppercase tracking-[0.15em] text-foreground/65">{project.subline}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function GenesisFeature() {
  return (
    <section id="genesis" className="relative min-h-[820px] overflow-hidden">
      <img src={genesisHero} alt="A cinematic primordial coastline at first light" loading="lazy" className="absolute inset-0 h-full w-full object-cover object-center" width={1920} height={1080} />
      <div className="absolute inset-0 bg-feature-scrim" />
      <div className="page-gutter relative z-10 flex min-h-[820px] items-center py-28">
        <div className="max-w-3xl">
          <p className="eyebrow">Client project · Nations Reach International Missions</p>
          <h2 className="font-display text-[clamp(4.5rem,12vw,11rem)] uppercase leading-[0.78] text-foreground">Genesis</h2>
          <p className="mt-6 text-sm font-bold uppercase tracking-[0.24em] text-foreground">The Visual Bible Project</p>
          <p className="mt-7 max-w-xl text-lg leading-8 text-foreground/75">A chapter-based visual Bible initiative developed for NRIM and being expanded into a full-length cinematic feature by Fusion Edge Media.</p>
          <dl className="mt-10 grid max-w-2xl grid-cols-3 border-y border-border py-6">
            {[['37','Chapters'],['Feature','Film'],['AI','Filmmaking']].map(([value,label]) => <div key={label} className="border-r border-border px-3 first:pl-0 last:border-0 last:pr-0"><dt className="font-display text-2xl uppercase text-foreground md:text-4xl">{value}</dt><dd className="mt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground md:text-xs">{label}</dd></div>)}
          </dl>
          <div className="mt-8 flex flex-wrap gap-3"><Button asChild><a href="https://nrim.org/watch/" target="_blank" rel="noreferrer">Explore Genesis <ExternalLink size={14} /></a></Button><Button asChild variant="outline"><a href="https://globalglitz.com/" target="_blank" rel="noreferrer">Watch chapters <ExternalLink size={14} /></a></Button></div>
          <p className="mt-8 text-xs leading-5 text-muted-foreground">Client: Nations Reach International Missions (NRIM) <span className="mx-2 text-border">|</span> Production: Fusion Edge Media</p>
        </div>
      </div>
    </section>
  );
}

function StudioStatement() {
  return (
    <section id="about" className="section-pad bg-elevated">
      <div className="page-gutter grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
        <div><p className="eyebrow">Fusion Edge Media</p><h2 className="section-title max-w-lg">Connecting continents in filmmaking.</h2></div>
        <div className="grid gap-8 sm:grid-cols-2">
          <p className="text-lg leading-8 text-foreground/75">We bring international filmmakers, technical talent and audiences together—supporting stories from pre-production through worldwide distribution.</p>
          <p className="text-base leading-7 text-muted-foreground">From South Indian cinema to Hollywood effects collaboration, our work crosses borders without losing sight of the story at its centre.</p>
        </div>
      </div>
      <div className="page-gutter mt-16"><div className="relative aspect-[16/7] min-h-72 overflow-hidden"><img src={studioImage} alt="Fusion Edge Media international film production" loading="lazy" className="h-full w-full object-cover object-center" width={1440} height={630} /><div className="absolute inset-0 bg-image-wash" /><div className="absolute bottom-6 left-6 text-xs font-bold uppercase tracking-[0.18em] text-foreground md:bottom-8 md:left-8">Production · Collaboration · Distribution</div></div></div>
    </section>
  );
}

function SelectedWork() {
  return (
    <section id="selected-work" className="section-pad bg-background">
      <div className="page-gutter"><p className="eyebrow">Across borders, across decades</p><h2 className="section-title mb-12">Selected work</h2>
        <div className="grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {selectedWork.map((work) => <article key={work.title} className="group"><div className="aspect-[2/3] overflow-hidden bg-card"><img src={work.image} alt={work.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]" width={600} height={900} /></div><div className="mt-5 flex items-start justify-between gap-4 border-t border-border pt-4"><div><h3 className="font-display text-2xl uppercase text-foreground">{work.title}</h3><p className="mt-1 text-xs uppercase tracking-[0.15em] text-muted-foreground">{work.label}</p></div><span className="text-xs tabular-nums text-muted-foreground">{work.year}</span></div></article>)}
        </div>
      </div>
    </section>
  );
}

function ClosingCTA() {
  return <section id="contact" className="relative flex min-h-[70svh] items-center justify-center overflow-hidden text-center"><img src={genesisHero} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover object-right opacity-35" width={1920} height={1080} /><div className="absolute inset-0 bg-closing-scrim" /><div className="page-gutter relative z-10 py-28"><p className="eyebrow">A world of stories</p><h2 className="font-display text-[clamp(3.6rem,8vw,8rem)] uppercase leading-[0.88] text-foreground">Let’s make<br />the next one.</h2><p className="mx-auto mt-7 max-w-xl text-lg leading-8 text-foreground/70">Bring your production, partnership or international distribution conversation to Fusion Edge Media.</p><Button asChild className="mt-9"><a href="tel:+18189628062">Start a conversation <ArrowRight size={16} /></a></Button></div></section>;
}

function SiteFooter() {
  return <footer className="border-t border-border bg-background"><div className="page-gutter grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]"><img src={logoAsset.url} alt="Fusion Edge Media" loading="lazy" className="w-64" width="512" height="512" /><div><p className="footer-label">Studio</p><p className="mt-4 max-w-xs text-sm leading-6 text-muted-foreground">P.O. Box 65154<br />Virginia Beach, VA 23464, US</p></div><div><p className="footer-label">Contact</p><a className="mt-4 inline-block text-sm text-foreground hover:text-primary" href="tel:+18189628062">+1 818 962 8062</a></div></div><div className="page-gutter flex flex-col gap-3 border-t border-border py-6 text-[11px] uppercase tracking-[0.13em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between"><span>© 2026 Fusion Edge Media. All rights reserved.</span><span>A Prossiga Corp company</span></div></footer>;
}

export function LandingPage() {
  return <div className="min-h-screen overflow-x-clip bg-background text-foreground"><SiteHeader /><main><HeroCarousel /><WorkRail /><GenesisFeature /><StudioStatement /><SelectedWork /><ClosingCTA /></main><SiteFooter /></div>;
}
