import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  Settings,
  ShoppingCart,
  Wrench,
  Shield,
  Clock,
  Users,
  Award,
  CheckCircle2,
  ArrowRight,
  Menu,
  X,
  Send,
  ChevronUp,
  Building2,
  Cog,
  Gauge,
  Headphones,
} from 'lucide-react';

/* ─── Intersection Observer Hook ─── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.unobserve(el);
  }, [threshold]);

  return { ref, isVisible };
}

/* ─── FadeInSection Wrapper ─── */
function FadeInSection({ children, delay = 0, className = '' }: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, isVisible } = useInView();
  return (
    <div
      ref={ref}
      className={`fade-in-section ${isVisible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ─── Header / Navbar ─── */
function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-navy/5'
          : 'bg-transparent'
      }`}
    >
      {/* Top bar */}
      <div className={`transition-all duration-300 ${scrolled ? 'h-0 overflow-hidden opacity-0' : 'h-auto opacity-100'}`}>
        <div className="bg-navy-dark text-white/80 text-xs py-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-between items-center gap-2">
            <div className="flex items-center gap-4 flex-wrap">
              <a href="tel:9655404077" className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Phone size={12} /> 9655404077
              </a>
              <a href="mailto:slkenterprises2020@yahoo.com" className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Mail size={12} /> slkenterprises2020@yahoo.com
              </a>
            </div>
            <div className="hidden sm:flex items-center gap-1.5">
              <MapPin size={12} /> Bangalore, India
            </div>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-navy to-navy-light rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <Cog size={22} className="text-white animate-spin" style={{ animationDuration: '8s' }} />
            </div>
            <div>
              <span className={`text-lg lg:text-xl font-bold tracking-tight transition-colors ${scrolled ? 'text-navy' : 'text-white'}`}>
                SLK
              </span>
              <span className={`text-lg lg:text-xl font-light ml-1 transition-colors ${scrolled ? 'text-steel' : 'text-white/80'}`}>
                Enterprises
              </span>
            </div>
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  scrolled
                    ? 'text-navy hover:bg-navy/5 hover:text-accent'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center gap-2 bg-accent hover:bg-accent-light text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-all shadow-md hover:shadow-lg"
            >
              Get a Quote <ChevronRight size={14} />
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${scrolled ? 'text-navy' : 'text-white'}`}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-navy font-medium rounded-lg hover:bg-navy/5 hover:text-accent transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="block text-center bg-accent text-white font-semibold px-4 py-3 rounded-lg mt-3"
            >
              Get a Quote
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

/* ─── Hero Section ─── */
function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-cnc.jpg"
          alt="CNC Machine in action"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/90 via-navy/80 to-navy-dark/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/50 to-transparent" />
      </div>

      {/* Decorative grid lines */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-0 w-full">
        <div className="max-w-3xl">
          <FadeInSection>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-white/90 text-sm font-medium">Trusted CNC Partner Since 2020</span>
            </div>
          </FadeInSection>

          <FadeInSection delay={100}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight tracking-tight">
              Precision CNC
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/60">
                Machine Sales
              </span>
              <br />
              <span className="text-accent-light">& Expert Servicing</span>
            </h1>
          </FadeInSection>

          <FadeInSection delay={200}>
            <p className="mt-6 text-lg sm:text-xl text-white/70 max-w-xl leading-relaxed">
              Your trusted industrial partner in Bangalore for top-tier manufacturing equipment and reliable maintenance.
            </p>
          </FadeInSection>

          <FadeInSection delay={300}>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#contact"
                className="btn-pulse inline-flex items-center gap-2 bg-accent hover:bg-accent-light text-white font-semibold text-base px-8 py-4 rounded-xl transition-all shadow-xl hover:shadow-2xl hover:shadow-accent/20"
              >
                Get a Quote <ArrowRight size={18} />
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white font-semibold text-base px-8 py-4 rounded-xl transition-all"
              >
                Our Services <ChevronRight size={18} />
              </a>
            </div>
          </FadeInSection>

          {/* Quick stats */}
          <FadeInSection delay={400}>
            <div className="mt-16 grid grid-cols-3 gap-6 max-w-lg">
              {[
                { value: '500+', label: 'Machines Sold' },
                { value: '24/7', label: 'Support' },
                { value: '100%', label: 'Commitment' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl sm:text-3xl font-bold text-white stat-number">{stat.value}</div>
                  <div className="text-white/50 text-xs sm:text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </FadeInSection>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-white/50 rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
}

/* ─── Services Section ─── */
function ServicesSection() {
  return (
    <section id="services" className="py-20 lg:py-28 bg-warm-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-navy/5 text-navy text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              <Settings size={14} /> Our Core Services
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy tracking-tight">
              Complete CNC Solutions
            </h2>
            <p className="mt-4 text-steel text-lg">
              From machine procurement to ongoing maintenance — we handle every aspect of your CNC needs.
            </p>
          </div>
        </FadeInSection>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* CNC Machine Sales */}
          <FadeInSection delay={100}>
            <div className="service-card bg-white rounded-2xl overflow-hidden shadow-lg shadow-navy/5 border border-gray-100">
              <div className="relative h-56 sm:h-64 overflow-hidden">
                <img
                  src="/images/cnc-sales.jpg"
                  alt="CNC Machine Sales"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent" />
                <div className="absolute bottom-4 left-6 flex items-center gap-3">
                  <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center shadow-lg">
                    <ShoppingCart size={22} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">CNC Machine Sales</h3>
                </div>
              </div>
              <div className="p-6 sm:p-8">
                <p className="text-steel leading-relaxed mb-6">
                  We partner with leading manufacturers to deliver high-quality CNC machines — both new and pre-owned — tailored to your production requirements and budget.
                </p>
                <div className="space-y-3">
                  {[
                    'New & Pre-owned CNC Machines',
                    'Multi-axis Milling & Turning Centers',
                    'Custom Machine Configuration',
                    'Installation & Commissioning',
                    'Operator Training & Support',
                    'Competitive Financing Options',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle2 size={18} className="text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-navy font-medium text-sm">{item}</span>
                    </div>
                  ))}
                </div>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 mt-8 text-accent font-semibold hover:text-accent-light transition-colors group"
                >
                  Inquire About Machines
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </FadeInSection>

          {/* CNC Service & Maintenance */}
          <FadeInSection delay={200}>
            <div className="service-card bg-white rounded-2xl overflow-hidden shadow-lg shadow-navy/5 border border-gray-100">
              <div className="relative h-56 sm:h-64 overflow-hidden">
                <img
                  src="/images/cnc-service.jpg"
                  alt="CNC Machine Service"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent" />
                <div className="absolute bottom-4 left-6 flex items-center gap-3">
                  <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center shadow-lg">
                    <Wrench size={22} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Service & Maintenance</h3>
                </div>
              </div>
              <div className="p-6 sm:p-8">
                <p className="text-steel leading-relaxed mb-6">
                  Our expert technicians provide comprehensive repair, preventive maintenance, and emergency support to keep your production running at peak efficiency.
                </p>
                <div className="space-y-3">
                  {[
                    'Preventive Maintenance Programs',
                    'Emergency Breakdown Repair',
                    'Spindle & Axis Alignment',
                    'Control System Troubleshooting',
                    'Parts Replacement & Upgrades',
                    'Annual Maintenance Contracts',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle2 size={18} className="text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-navy font-medium text-sm">{item}</span>
                    </div>
                  ))}
                </div>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 mt-8 text-accent font-semibold hover:text-accent-light transition-colors group"
                >
                  Schedule Service
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}

/* ─── About / Trust Section ─── */
function AboutSection() {
  return (
    <section id="about" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image side */}
          <FadeInSection>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl shadow-navy/10">
                <img
                  src="/images/about-industrial.jpg"
                  alt="Precision CNC machining"
                  className="w-full h-80 sm:h-96 lg:h-[28rem] object-cover"
                />
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-navy text-white rounded-xl p-5 shadow-xl">
                <div className="text-3xl font-bold">5+</div>
                <div className="text-white/70 text-sm">Years of<br />Excellence</div>
              </div>
              {/* Decorative element */}
              <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-accent/20 rounded-xl" />
            </div>
          </FadeInSection>

          {/* Content side */}
          <FadeInSection delay={200}>
            <div>
              <div className="inline-flex items-center gap-2 bg-navy/5 text-navy text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                <Building2 size={14} /> About SLK Enterprises
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-navy tracking-tight leading-tight">
                Built on Trust, Driven by
                <span className="text-accent"> Precision</span>
              </h2>
              <p className="mt-6 text-steel text-lg leading-relaxed">
                SLK Enterprises has been a reliable name in the CNC machinery industry since 2020. Based in Bangalore, we serve manufacturing units across Karnataka with top-quality machines and unmatched service expertise.
              </p>
              <p className="mt-4 text-steel leading-relaxed">
                Our commitment to quick turnaround times, genuine spare parts, and skilled technician support has earned us the trust of factories, job shops, and large-scale manufacturers alike.
              </p>

              <div className="mt-8 grid sm:grid-cols-2 gap-4">
                {[
                  { icon: Shield, title: 'Reliability', desc: 'Genuine parts & certified machines' },
                  { icon: Clock, title: 'Quick Response', desc: 'Rapid service turnaround times' },
                  { icon: Users, title: 'Expert Team', desc: 'Skilled & experienced technicians' },
                  { icon: Award, title: 'Quality First', desc: 'Industry-standard processes' },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3 p-4 rounded-xl bg-warm-gray hover:bg-navy/5 transition-colors">
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon size={18} className="text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-navy text-sm">{item.title}</h4>
                      <p className="text-steel text-xs mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}

/* ─── Why Choose Us Section ─── */
function WhyUsSection() {
  return (
    <section id="why-us" className="py-20 lg:py-28 bg-navy relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white/90 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              <Gauge size={14} /> Why Choose Us
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              The SLK Advantage
            </h2>
            <p className="mt-4 text-white/60 text-lg">
              What sets us apart in the industrial machinery landscape.
            </p>
          </div>
        </FadeInSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {[
            {
              icon: Cog,
              title: 'End-to-End Solutions',
              desc: 'From machine selection and procurement to installation, training, and ongoing maintenance — we handle it all.',
            },
            {
              icon: Clock,
              title: 'Rapid Response Time',
              desc: 'Our local presence in Bangalore ensures quick on-site support, minimizing your production downtime.',
            },
            {
              icon: Shield,
              title: 'Genuine Parts & Warranty',
              desc: 'We use only certified spare parts and back every machine and service with comprehensive warranty coverage.',
            },
            {
              icon: Users,
              title: 'Skilled Technicians',
              desc: 'Our team of factory-trained engineers brings deep expertise across all major CNC brands and systems.',
            },
            {
              icon: Headphones,
              title: 'Dedicated Support',
              desc: 'Get a dedicated account manager and priority support line for all your operational needs.',
            },
            {
              icon: Award,
              title: 'Competitive Pricing',
              desc: 'Direct manufacturer partnerships allow us to offer the best value without compromising on quality.',
            },
          ].map((item, i) => (
            <FadeInSection key={item.title} delay={i * 80}>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 lg:p-8 hover:bg-white/10 transition-all group h-full">
                <div className="w-14 h-14 bg-accent/20 rounded-xl flex items-center justify-center mb-5 group-hover:bg-accent/30 transition-colors">
                  <item.icon size={24} className="text-accent-light" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Contact Section ─── */
function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', phone: '', email: '', message: '' });
    }, 3000);
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  return (
    <section id="contact" className="py-20 lg:py-28 bg-warm-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-navy/5 text-navy text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              <Headphones size={14} /> Get In Touch
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy tracking-tight">
              Let's Discuss Your
              <span className="text-accent"> Requirements</span>
            </h2>
            <p className="mt-4 text-steel text-lg">
              Whether you need a new machine, service support, or a custom solution — reach out and we'll respond promptly.
            </p>
          </div>
        </FadeInSection>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact Form */}
          <FadeInSection className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg shadow-navy/5 border border-gray-100 p-6 sm:p-8 lg:p-10">
              <h3 className="text-xl font-bold text-navy mb-2">Request a Quote</h3>
              <p className="text-steel text-sm mb-8">Fill in your details and we'll get back to you within 24 hours.</p>

              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={32} className="text-green-600" />
                  </div>
                  <h4 className="text-xl font-bold text-navy mb-2">Thank You!</h4>
                  <p className="text-steel">We've received your inquiry and will contact you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-navy mb-2">
                        Full Name *
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/10 outline-none transition-all text-navy placeholder:text-steel-light bg-warm-gray/50"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-navy mb-2">
                        Phone Number *
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Your phone number"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/10 outline-none transition-all text-navy placeholder:text-steel-light bg-warm-gray/50"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-navy mb-2">
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/10 outline-none transition-all text-navy placeholder:text-steel-light bg-warm-gray/50"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-navy mb-2">
                      Machine Requirement / Issue *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Describe your machine requirement or service issue..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/10 outline-none transition-all text-navy placeholder:text-steel-light bg-warm-gray/50 resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-light text-white font-semibold text-base px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl hover:shadow-accent/20"
                  >
                    Submit Inquiry <Send size={16} />
                  </button>
                </form>
              )}
            </div>
          </FadeInSection>

          {/* Contact Info */}
          <FadeInSection delay={200} className="lg:col-span-2">
            <div className="space-y-6">
              {/* Address Card */}
              <div className="bg-white rounded-2xl shadow-lg shadow-navy/5 border border-gray-100 p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin size={20} className="text-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-navy mb-1">Our Address</h4>
                    <p className="text-steel text-sm leading-relaxed">
                      No.37, Hallmark Layout, Yarandanahalli,<br />
                      Jigani Hobli, Anekal Taluk,<br />
                      Bangalore - 560099
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone Card */}
              <div className="bg-white rounded-2xl shadow-lg shadow-navy/5 border border-gray-100 p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone size={20} className="text-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-navy mb-1">Call Us</h4>
                    <a href="tel:9655404077" className="text-accent font-semibold hover:text-accent-light transition-colors text-lg">
                      9655404077
                    </a>
                    <p className="text-steel text-xs mt-1">Mon - Sat: 9:00 AM - 7:00 PM</p>
                  </div>
                </div>
              </div>

              {/* Email Card */}
              <div className="bg-white rounded-2xl shadow-lg shadow-navy/5 border border-gray-100 p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail size={20} className="text-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-navy mb-1">Email Us</h4>
                    <a href="mailto:slkenterprises2020@yahoo.com" className="text-accent font-semibold hover:text-accent-light transition-colors break-all">
                      slkenterprises2020@yahoo.com
                    </a>
                    <p className="text-steel text-xs mt-1">We respond within 24 hours</p>
                  </div>
                </div>
              </div>

              {/* Quick CTA */}
              <div className="bg-gradient-to-br from-navy to-navy-light rounded-2xl p-6 text-white">
                <h4 className="font-bold text-lg mb-2">Need Urgent Support?</h4>
                <p className="text-white/70 text-sm mb-4">
                  For emergency breakdown support, call us directly for fastest response.
                </p>
                <a
                  href="tel:9655404077"
                  className="inline-flex items-center gap-2 bg-accent hover:bg-accent-light text-white font-semibold px-6 py-3 rounded-xl transition-all"
                >
                  <Phone size={16} /> Call Now
                </a>
              </div>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="bg-navy-dark text-white">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-accent to-accent-dark rounded-lg flex items-center justify-center">
                <Cog size={20} className="text-white" />
              </div>
              <div>
                <span className="text-lg font-bold">SLK</span>
                <span className="text-lg font-light ml-1 text-white/70">Enterprises</span>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-4">
              Your trusted partner for CNC machine sales and expert servicing in Bangalore and across Karnataka.
            </p>
            <div className="text-xs text-white/40">
              GSTIN: 29FZHPS1614F1Z6
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-white/80 mb-4">Quick Links</h4>
            <div className="space-y-3">
              {[
                { label: 'Home', href: '#hero' },
                { label: 'Services', href: '#services' },
                { label: 'About Us', href: '#about' },
                { label: 'Why Choose Us', href: '#why-us' },
                { label: 'Contact', href: '#contact' },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors group"
                >
                  <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-white/80 mb-4">Services</h4>
            <div className="space-y-3">
              {[
                'CNC Machine Sales',
                'Preventive Maintenance',
                'Emergency Repairs',
                'Machine Installation',
                'Operator Training',
                'AMC Contracts',
              ].map((service) => (
                <div key={service} className="flex items-center gap-2 text-white/50 text-sm">
                  <ChevronRight size={12} />
                  {service}
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-white/80 mb-4">Contact</h4>
            <div className="space-y-4">
              <a href="tel:9655404077" className="flex items-start gap-3 text-white/50 hover:text-white text-sm transition-colors group">
                <Phone size={14} className="mt-0.5 flex-shrink-0 text-accent-light" />
                <span>9655404077</span>
              </a>
              <a href="mailto:slkenterprises2020@yahoo.com" className="flex items-start gap-3 text-white/50 hover:text-white text-sm transition-colors break-all group">
                <Mail size={14} className="mt-0.5 flex-shrink-0 text-accent-light" />
                <span>slkenterprises2020@yahoo.com</span>
              </a>
              <div className="flex items-start gap-3 text-white/50 text-sm">
                <MapPin size={14} className="mt-0.5 flex-shrink-0 text-accent-light" />
                <span>No.37, Hallmark Layout,<br />Yarandanahalli, Jigani Hobli,<br />Anekal Taluk, Bangalore - 560099</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm text-center sm:text-left">
            © {new Date().getFullYear()} SLK Enterprises. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-white/30 text-xs">
            <span>GSTIN: 29FZHPS1614F1Z6</span>
            <span className="hidden sm:inline">|</span>
            <span className="hidden sm:inline">Bangalore, Karnataka</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── Scroll to Top Button ─── */
function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-navy hover:bg-navy-light text-white rounded-full shadow-xl flex items-center justify-center transition-all hover:scale-105"
      aria-label="Scroll to top"
    >
      <ChevronUp size={20} />
    </button>
  );
}

/* ─── Main App ─── */
export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <WhyUsSection />
        <ContactSection />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
