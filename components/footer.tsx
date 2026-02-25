import { Moon, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-primary text-white pt-20 pb-10 islamic-pattern">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 mb-16">
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="rounded-lg bg-white/10 p-1.5 text-secondary">
                <Moon className="h-6 w-6 fill-current" />
              </div>
              <span className="font-serif text-2xl font-bold text-secondary">
                Ramadan Pro
              </span>
            </Link>
            <p className="text-emerald-200/70 text-sm leading-relaxed">
              Your comprehensive spiritual companion for the holy month of Ramadan and beyond. Stay connected with your faith through accurate prayer times, Quran, and more.
            </p>
            <div className="flex gap-4">
              <SocialLink icon={<Facebook size={18} />} />
              <SocialLink icon={<Twitter size={18} />} />
              <SocialLink icon={<Instagram size={18} />} />
              <SocialLink icon={<Youtube size={18} />} />
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-secondary">Quick Links</h4>
            <ul className="space-y-4">
              <FooterLink href="#prayer-times" label="Prayer Times" />
              <FooterLink href="#calendar" label="Ramadan Calendar" />
              <FooterLink href="#quran" label="Daily Ayah" />
              <FooterLink href="#duas" label="Essential Duas" />
              <FooterLink href="#tasbih" label="Digital Tasbih" />
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-secondary">Resources</h4>
            <ul className="space-y-4">
              <FooterLink href="#" label="Zakat Calculator" />
              <FooterLink href="#" label="Health Guide" />
              <FooterLink href="#" label="Fasting Tips" />
              <FooterLink href="#" label="Islamic Articles" />
              <FooterLink href="#" label="Donation Center" />
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-secondary">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-emerald-200/70">
                <MapPin size={18} className="text-secondary shrink-0" />
                <span>123 Islamic Center Way, Spiritual City, 56789</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-emerald-200/70">
                <Phone size={18} className="text-secondary shrink-0" />
                <span>+1 (234) 567-890</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-emerald-200/70">
                <Mail size={18} className="text-secondary shrink-0" />
                <span>support@ramadanpro.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-emerald-200/50">
            © 2026 Ramadan Pro. All rights reserved. Designed with ❤️ for the Ummah.
          </p>
          <div className="flex gap-6 text-xs text-emerald-200/50">
            <Link href="#" className="hover:text-secondary transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-secondary transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-secondary transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ icon }: { icon: React.ReactNode }) {
  return (
    <a href="#" className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center text-emerald-200 hover:bg-secondary hover:text-primary transition-all">
      {icon}
    </a>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link href={href} className="text-sm text-emerald-200/70 hover:text-secondary transition-colors flex items-center gap-2 group">
        <span className="h-1 w-1 rounded-full bg-secondary opacity-0 group-hover:opacity-100 transition-opacity"></span>
        {label}
      </Link>
    </li>
  );
}
