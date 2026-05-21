import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { MapPin, Calendar, ChevronDown } from "lucide-react";
import RSVPForm from "./features/RSVPForm";
import CountdownTimer from "./features/CountdownTimer";

const FlowerAnimations = () => (
    <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes sway {
            0%, 100% { transform: rotate(-3deg) translateY(0); }
            50% { transform: rotate(3deg) translateY(-5px); }
        }
        @keyframes sway-reverse {
            0%, 100% { transform: rotate(3deg) translateY(-5px); }
            50% { transform: rotate(-3deg) translateY(0); }
        }
        @keyframes gentle-pulse {
            0%, 100% { transform: scale(1) translateY(0); opacity: 0.7; }
            50% { transform: scale(1.02) translateY(-10px); opacity: 1; }
        }
        .anim-sway { animation: sway 8s ease-in-out infinite; transform-origin: bottom center; }
        .anim-sway-reverse { animation: sway-reverse 9s ease-in-out infinite; transform-origin: top right; }
        .anim-gentle { animation: gentle-pulse 12s ease-in-out infinite; transform-origin: center; }
    `}} />
);

const RoseOne = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 100 200" className={className} fill="none" stroke="currentColor" strokeWidth="0.8">
        {/* Main Stem/Branch */}
        <path d="M 50 190 Q 35 140 45 90 Q 50 70 45 50" />

        {/* Prominent side branch */}
        <path d="M 42 120 Q 15 110 5 80" />
        <path d="M 47 95 Q 75 80 85 50" />

        {/* Leaves on left branch */}
        <path d="M 30 115 Q 20 100 15 110 Q 25 125 30 115 Z" />
        <path d="M 18 97 Q 5 95 10 105 Q 20 105 18 97 Z" />
        <path d="M 8 83 Q -5 70 0 85 Q 10 90 8 83 Z" />

        {/* Leaves on right branch */}
        <path d="M 60 88 Q 75 90 70 100 Q 55 98 60 88 Z" />
        <path d="M 75 65 Q 90 60 85 75 Q 70 78 75 65 Z" />
        <path d="M 82 55 Q 95 45 95 60 Q 85 70 82 55 Z" />

        {/* Mid Leaves on main stem */}
        <path d="M 48 150 Q 65 140 60 155 Q 45 160 48 150 Z" />
        <path d="M 40 170 Q 25 180 30 165 Q 45 155 40 170 Z" />

        {/* Flower Base Structure */}
        <path d="M 35 45 C 35 60 55 60 55 45 C 45 55 45 55 35 45" />

        {/* Elegant Rose Head (Profile View) */}
        <path d="M 45 50 C 20 40 30 10 45 20 C 60 10 70 40 45 50 Z" />
        <path d="M 45 45 C 30 35 35 15 45 25 C 55 15 60 35 45 45 Z" />
        <path d="M 45 40 C 35 35 40 20 45 30 C 50 20 55 35 45 40 Z" />
    </svg>
);

const RoseTwo = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 150 150" className={className} fill="none" stroke="currentColor" strokeWidth="0.8">
        <g transform="translate(75, 75)">
            {/* Outer Petals */}
            <path d="M -20 -60 C -50 -50 -60 -20 -40 0 C -60 20 -50 50 -20 60 C 0 70 20 70 40 40 C 60 20 50 -20 20 -40 C 0 -60 -10 -60 -20 -60 Z" />
            <path d="M -40 0 C -30 -30 10 -50 20 -40" />
            <path d="M 40 40 C 30 60 -10 60 -20 60" />
            <path d="M -20 60 C -50 40 -40 0 -40 0" />
            <path d="M 20 -40 C 60 -20 50 20 40 40" />

            {/* Mid Petals */}
            <path d="M -10 -35 C -30 -25 -35 -5 -25 15 C -30 35 -10 45 10 35 C 30 30 35 10 25 -10 C 20 -30 0 -40 -10 -35 Z" />
            <path d="M -25 15 C -20 -15 0 -25 10 -35" />
            <path d="M 10 35 C 30 15 20 -10 25 -10" />
            <path d="M 10 35 C -10 50 -30 30 -25 15" />

            {/* Inner Petals */}
            <path d="M -5 -20 C -20 -10 -20 5 -10 15 C -15 25 0 25 10 15 C 20 5 15 -10 5 -15 C 0 -20 -5 -20 -5 -20 Z" />
            <path d="M -10 15 C -10 0 5 -10 5 -15" />
            <path d="M 10 15 C 20 0 10 -15 5 -15" />

            {/* Core Petals */}
            <path d="M -5 -5 C -10 5 0 10 5 5 C 10 0 0 -10 -5 -5 Z" />

            {/* Small center curl */}
            <path d="M 2 2 C -2 5 -5 0 0 -2 C 3 -2 2 2 2 2 Z" />
        </g>
    </svg>
);


const ScallopedFrame = ({
    insetClass,
    borderColor,
    bgColor,
    wClass, hClass,
    xClass, yClass
}: {
    insetClass: string, borderColor: string, bgColor: string,
    wClass: string, hClass: string, xClass: string, yClass: string
}) => (
    <div className={`absolute ${insetClass} pointer-events-none z-0`}>
        {/* Top line */}
        <div className={`absolute top-0 ${xClass} h-px ${bgColor}`} />
        {/* Bottom line */}
        <div className={`absolute bottom-0 ${xClass} h-px ${bgColor}`} />
        {/* Left line */}
        <div className={`absolute ${yClass} left-0 w-px ${bgColor}`} />
        {/* Right line */}
        <div className={`absolute ${yClass} right-0 w-px ${bgColor}`} />

        {/* Corner TL */}
        <div className={`absolute top-0 left-0 ${wClass} ${hClass} border-r border-b rounded-br-full ${borderColor}`} />
        {/* Corner TR */}
        <div className={`absolute top-0 right-0 ${wClass} ${hClass} border-l border-b rounded-bl-full ${borderColor}`} />
        {/* Corner BL */}
        <div className={`absolute bottom-0 left-0 ${wClass} ${hClass} border-r border-t rounded-tr-full ${borderColor}`} />
        {/* Corner BR */}
        <div className={`absolute bottom-0 right-0 ${wClass} ${hClass} border-l border-t rounded-tl-full ${borderColor}`} />
    </div>
);

export default function Letter({ isOpen, onClose, className, weddingData }: { isOpen: boolean, onClose?: () => void, className?: string, weddingData?: any }) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isUnfolded, setIsUnfolded] = useState(false);

    const totalSections = 5;

    // Toggle this variable to instantly switch between 'light' and 'dark' themes
    const themeConfig: string = 'light';

    const t = {
        bg: themeConfig === 'light' ? 'bg-[#edede4]' : 'bg-[#6B0D1E]',
        textMain: themeConfig === 'light' ? 'text-[#700a0a]' : 'text-[#E6C27A]',
        textMuted: themeConfig === 'light' ? 'text-[#7c7566]' : 'text-[#E6C27A]/80',
        textLight: themeConfig === 'light' ? 'text-[#7c7566]' : 'text-[#E6C27A]/60',
        textAccent: themeConfig === 'light' ? 'text-[#700a0a]' : 'text-[#E6C27A]',
        border: themeConfig === 'light' ? 'border-[#c4bcab]' : 'border-[#E6C27A]',
        btnSolid: themeConfig === 'light' ? 'bg-[#700a0a] text-white hover:bg-[#7c7566]' : 'bg-[#E6C27A] text-[#6B0D1E] hover:bg-[#FCEBAE]',
        btnOutline: themeConfig === 'light' ? 'border-[#c4bcab] bg-transparent text-[#700a0a] hover:bg-[#c4bcab]/20' : 'border-[#E6C27A]/50 bg-transparent text-[#E6C27A] hover:bg-[#E6C27A]/10',
        card: themeConfig === 'light' ? 'border-[#c4bcab]/50 bg-[#fefefe]/50' : 'border-[#E6C27A]/20 bg-[#E6C27A]/10',
        lineBreak: themeConfig === 'light' ? 'opacity-60 invert-0' : 'opacity-80 invert brightness-200 sepia hue-rotate-[-30deg] saturate-200',
        sealOrbit: themeConfig === 'light' ? 'fill-[#7c7566]/80' : 'fill-[#E6C27A]/90',
        navBtnBg: themeConfig === 'light' ? 'bg-white/90 border-[#c4bcab]/50 hover:bg-white' : 'bg-[#6B0D1E]/80 border-[#E6C27A]/30 hover:bg-[#6B0D1E]',
        navBtnText: themeConfig === 'light' ? 'text-[#700a0a]' : 'text-[#E6C27A]',
        navBtnIcon: themeConfig === 'light' ? 'text-[#7c7566]' : 'text-[#E6C27A]',
    };

    const groomFirstName = weddingData?.couple?.groom?.name?.split(' ')[0] || 'William';
    const brideFirstName = weddingData?.couple?.bride?.name?.split(' ')[0] || 'Josephine';

    const displayDateStr = weddingData?.wedding?.displayDate || "MAY 31st, 2026";
    const dateParts = displayDateStr.split(' ');
    const displayMonth = dateParts[0] || "MAY";
    const dayWithSuffix = dateParts[1]?.replace(',', '') || "31st";
    const displayDayMatch = dayWithSuffix.match(/\d+/);
    const displayDay = displayDayMatch ? displayDayMatch[0] : "31";
    const displaySuffix = dayWithSuffix.replace(/\d+/, '') || "ST";

    const generateCalendarLink = (celebration: any) => {
        if (!celebration) return "#";
        const title = encodeURIComponent(`${groomFirstName} & ${brideFirstName}'s Anniversary`);
        const details = encodeURIComponent("We are so excited to celebrate with you!");
        const location = encodeURIComponent(celebration.venue || "");

        let dates = "";
        try {
            // Manual parsing to avoid Server UTC timezone hydration mismatches
            const dStr = celebration.date; // "May 6, 2026"
            const tStr = celebration.time; // "01:00 PM"
            const months: Record<string, string> = { "Jan": "01", "Feb": "02", "Mar": "03", "Apr": "04", "May": "05", "Jun": "06", "Jul": "07", "Aug": "08", "Sep": "09", "Oct": "10", "Nov": "11", "Dec": "12" };

            const mMatch = dStr.match(/([a-zA-Z]+) (\d+), (\d+)/);
            const tMatch = tStr.match(/(\d+):(\d+)\s*(AM|PM)/i);

            if (mMatch && tMatch) {
                const month = months[mMatch[1].substring(0, 3)] || "05";
                const day = mMatch[2].padStart(2, '0');
                const year = mMatch[3];

                let hour12 = parseInt(tMatch[1], 10);
                const min = tMatch[2];
                const ampm = tMatch[3].toUpperCase();

                if (ampm === "PM" && hour12 < 12) hour12 += 12;
                if (ampm === "AM" && hour12 === 12) hour12 = 0;

                const startHour = hour12.toString().padStart(2, '0');
                const endHour = ((hour12 + 4) % 24).toString().padStart(2, '0');

                // Format: 20260506T130000 (No Z character, meaning it is local to ctz)
                const dateStrStart = `${year}${month}${day}T${startHour}${min}00`;
                const dateStrEnd = `${year}${month}${day}T${endHour}${min}00`;

                dates = `&dates=${dateStrStart}/${dateStrEnd}&ctz=Asia/Kolkata`;
            }
        } catch (e) { }

        return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}${dates}&details=${details}&location=${location}`;
    };

    // Wait for the envelope to physically open before showing the first text
    useEffect(() => {
        if (isOpen) {
            // Reset physical scroll position while out of sight before sliding up
            if (scrollContainerRef.current) {
                scrollContainerRef.current.scrollTop = 0;
            }
            // 1200ms matches the envelope opening transition
            const timer = setTimeout(() => setIsUnfolded(true), 1200);
            return () => clearTimeout(timer);
        } else {
            setIsUnfolded(false);
            setActiveIndex(0); // Reset scroll on close
        }
    }, [isOpen]);

    // Track scroll position to determine which section to show
    const handleScroll = () => {
        if (!scrollContainerRef.current) return;
        const { scrollTop, clientHeight } = scrollContainerRef.current;
        const newIndex = Math.round(scrollTop / clientHeight);
        if (newIndex !== activeIndex) {
            setActiveIndex(newIndex);
        }
    };

    // Auto-scroll to the next section
    const scrollToNext = () => {
        if (!scrollContainerRef.current) return;
        const nextIndex = activeIndex + 1;
        if (nextIndex < totalSections) {
            scrollContainerRef.current.scrollTo({
                top: nextIndex * scrollContainerRef.current.clientHeight,
                behavior: "smooth"
            });
        }
    };

    return (
        <div
            className={`origin-bottom flex flex-col transition-all duration-1500 ease-[cubic-bezier(0.2,0.8,0.3,1)] ${className} ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
            style={{
                transform: `translateY(${isOpen ? "0%" : "100%"})`,
                width: "100%",
                zIndex: isOpen ? 40 : 10,
                transitionDelay: isOpen ? '300ms' : '0ms'
            }}
        >
            <div
                ref={scrollContainerRef}
                onScroll={handleScroll}
                className={`w-full relative shadow-2xl rounded-sm overflow-x-hidden snap-y snap-mandatory scroll-smooth ${isOpen ? 'overflow-y-auto' : 'overflow-y-hidden'} ${t.bg}`}
                style={{ height: "90dvh" }}
            >
                {/* STATIC BACKGROUND & FRAME EXPERIMENT */}
                <div className={`sticky top-0 left-0 w-full h-[90dvh] z-0 pointer-events-none overflow-hidden ${t.bg}`}>
                    {/* Flower Animations Styles */}
                    <FlowerAnimations />

                    {/* ROSE 1: Top Right Peeking (Large Bloom) */}
                    <div className="absolute -right-8 -top-8 w-48 h-48 md:w-64 md:h-64 text-[#E6C27A]/30 anim-gentle z-0 pointer-events-none">
                        <RoseTwo className="w-full h-full drop-shadow-md" />
                    </div>

                    {/* ROSE 2: Bottom Left Emergence (Stem Rose) */}
                    <div className="absolute -left-12 -bottom-16 w-40 h-80 md:w-56 md:h-96 text-[#E6C27A]/40 anim-sway z-0 pointer-events-none">
                        <RoseOne className="w-full h-full drop-shadow-md" />
                    </div>

                    {/* Inner Gold Frame */}
                    <ScallopedFrame
                        insetClass="inset-4 md:inset-6"
                        borderColor="border-[#E6C27A]/50"
                        bgColor="bg-[#E6C27A]/50"
                        wClass="w-12 md:w-16" hClass="h-12 md:h-16"
                        xClass="left-12 right-12 md:left-16 md:right-16"
                        yClass="top-12 bottom-12 md:top-16 md:bottom-16"
                    />
                    {/* Secondary inset line for a classic double-border effect */}
                    <ScallopedFrame
                        insetClass="inset-[22px] md:inset-[30px]"
                        borderColor="border-[#E6C27A]/20"
                        bgColor="bg-[#E6C27A]/20"
                        wClass="w-8 md:w-12" hClass="h-8 md:h-12"
                        xClass="left-8 right-8 md:left-12 md:right-12"
                        yClass="top-8 bottom-8 md:top-12 md:bottom-12"
                    />
                </div>

                {/* FIXED CONTENT WRAPPER */}
                <div className="sticky top-0 left-0 w-full h-[90dvh] z-10 flex flex-col items-center justify-center p-6 md:p-8 -mt-[90dvh]">

                    {/* SECTION 0: THE INTRO */}
                    <div className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-1000 ease-out 
                        ${activeIndex === 0
                            ? (isUnfolded ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-8 pointer-events-none")
                            : "opacity-0 -translate-y-8 pointer-events-none"}`}
                    >
                        <div className="relative w-[70vw] max-w-[350px] border border-[#7c7566] rounded-t-full flex flex-col items-center p-2.5 pb-6 -mt-19 bg-[#fefefe]">

                            {/* Image Container */}
                            <div className="relative w-full aspect-4/5 overflow-hidden rounded-t-full mb-4">
                                <Image
                                    src="/assets/images/couple.jpeg"
                                    alt="Couple"
                                    fill
                                    className="object-cover object-center"
                                    priority
                                />
                            </div>

                            {/* Names with Faint '&' */}
                            <div className="relative w-full flex flex-col items-center justify-center mb-5 mt-2">
                                {/* Faint '&' */}
                                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-10 text-8xl font-script text-[#ede3e3] z-0 opacity-70">&amp;</span>

                                <p className="font-sans uppercase text-[16px] md:text-xs font-semibold text-[#700a0a] leading-[1.7] tracking-[.15em] z-10 text-center">
                                    {weddingData?.couple?.groom?.name ? `MR. ${weddingData.couple.groom.name.toUpperCase()}` : "MR. SUBODH VERMA"}<br />
                                    {weddingData?.couple?.bride?.name ? `MRS. ${weddingData.couple.bride.name.toUpperCase()}` : "MRS. SHWETA VERMA"}
                                </p>
                            </div>

                            <div className={`w-20 h-px mx-auto mb-6 ${t.border} border-t`}></div>

                            {/* Date */}
                            <h2 className="font-sans uppercase text-3xl font-bold tracking-[0.2em] text-[#700a0a]">
                                {displayDay}<sup className="text-sm align-top -ml-0.5 tracking-[0.2em]">{displaySuffix.toUpperCase()}</sup> <span className="ml-2">{displayMonth.toUpperCase()}</span>
                            </h2>
                        </div>
                    </div>

                    {/* SECTION 1: THE DETAILS */}
                    <div className={`absolute inset-0 pt-6 pb-24 flex flex-col items-center justify-center text-center px-6 transition-all duration-1000 ease-out ${activeIndex === 1 ? "opacity-100 translate-y-0 pointer-events-auto delay-200" : "opacity-0 translate-y-8 pointer-events-none"}`}>
                        <img src="/assets/images/logo-plain.svg" alt="Logo" className="w-[40vw] md:w-[250px] mb-4 object-contain opacity-90" />
                        <div className={`w-full h-4 bg-[url('/assets/images/line-break.png')] bg-contain bg-center bg-no-repeat mb-4 ${t.lineBreak}`} />

                        <p className={`font-sans uppercase text-2xl md:text-3xl font-bold tracking-[0.2em] mb-2 ${t.textAccent}`}>When & Where</p>
                        <p className={`font-sans text-[10px] md:text-xs font-semibold leading-[1.7] max-w-xs mb-4 ${t.textMuted}`}>
                            We cannot wait to share this beautiful evening with our closest friends and family.
                        </p>

                        <div className="flex flex-col gap-4 w-full">
                            <div className="flex flex-col items-center gap-1.5">
                                <Calendar className={`w-4 h-4 md:w-5 md:h-5 ${t.textAccent}`} strokeWidth={1.5} />
                                <div className={`font-sans text-[10px] md:text-xs font-semibold leading-[1.7] ${t.textMuted}`}>
                                    <span className={`font-sans uppercase text-sm md:text-base font-bold tracking-[0.2em] ${t.textMain}`}>{weddingData?.celebrations?.[0]?.date || "Saturday, September 24th"}</span><br />
                                    {weddingData?.celebrations?.[0]?.time || "Two Thousand and Twenty-Six"}
                                </div>
                                <a
                                    href={generateCalendarLink(weddingData?.celebrations?.[0])}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`mt-1.5 px-4 py-2 rounded-full text-[9px] md:text-xs uppercase tracking-[0.2em] font-bold transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 ${t.btnSolid} hover:scale-105`}
                                >
                                    <Calendar className="w-3 h-3 md:w-3.5 md:h-3.5" />
                                    Add to Calendar
                                </a>
                            </div>
                            <div className="flex flex-col items-center gap-1.5">
                                <MapPin className={`w-4 h-4 md:w-5 md:h-5 ${t.textAccent}`} strokeWidth={1.5} />
                                <div className={`font-sans text-[10px] md:text-xs font-semibold leading-[1.7] ${t.textMuted}`}>
                                    <span className={`font-sans uppercase text-sm md:text-base font-bold tracking-[0.2em] ${t.textMain}`}>{weddingData?.celebrations?.[0]?.venueTitle || weddingData?.celebrations?.[0]?.venue?.split(',')[0] || "The Conservatory"}</span><br />
                                    {weddingData?.celebrations?.[0]?.venueDetails || weddingData?.celebrations?.[0]?.venue?.split(',').slice(1).join(',').trim() || "123 Botanical Garden Way"}
                                </div>
                                {weddingData?.celebrations?.[0]?.googleMapsUrl && (
                                    <a
                                        href={weddingData.celebrations[0].googleMapsUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`mt-1.5 px-4 py-2 rounded-full text-[9px] md:text-xs uppercase tracking-[0.2em] font-bold transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 ${t.btnSolid} hover:scale-105`}
                                    >
                                        <MapPin className="w-3 h-3 md:w-3.5 md:h-3.5" />
                                        Get Directions
                                    </a>
                                )}
                            </div>
                        </div>
                        <div className={`w-full h-4 bg-[url('/assets/images/line-break.png')] bg-contain bg-center bg-no-repeat mt-4 ${t.lineBreak}`} />
                    </div>

                    {/* SECTION 2: THE CELEBRATION DETAILS */}
                    <div className={`absolute inset-0 pt-6 pb-24 flex flex-col items-center justify-center text-center px-10 transition-all duration-1000 ease-out ${activeIndex === 2 ? "opacity-100 translate-y-0 pointer-events-auto delay-200" : "opacity-0 translate-y-8 pointer-events-none"}`}>
                        <img src="/assets/images/logo-plain.svg" alt="Logo" className="w-[40vw] md:w-[250px] mb-4 object-contain opacity-90" />
                        <p className={`font-sans uppercase text-2xl md:text-3xl font-bold tracking-[0.2em] mb-4 ${t.textAccent}`}>The Celebration</p>

                        {/* Elegant Image Frame */}
                        {/* <div className={`relative w-40 h-40 md:w-56 md:h-56 mb-6 rounded-t-full overflow-hidden border-2 ${t.border} p-1 shadow-xl`}>
                            <div className="relative w-full h-full rounded-t-full overflow-hidden">
                                <img
                                    src="/assets/images/engagement-rings.webp"
                                    alt="Anniversary Celebration"
                                    className="object-cover w-full h-full object-center"
                                />
                                <div className="absolute inset-0 bg-[#6B0D1E]/10 mix-blend-overlay"></div>
                            </div>
                        </div> */}

                        <div className={`p-4 w-full max-w-sm rounded-sm ${t.card}`}>
                            <div className="mb-3">
                                <h4 className={`text-[10px] md:text-xs font-sans font-bold uppercase tracking-[0.2em] mb-1 ${t.textMain}`}>Dress Code</h4>
                                <p className={`font-sans text-[10px] md:text-xs font-semibold leading-[1.7] ${t.textMuted}`}>{weddingData?.celebrations?.[0]?.dressCode || "Black-Tie Optional"}</p>
                            </div>

                            <div className={`w-8 h-px mx-auto mb-3 ${t.border} border-t`}></div>

                            <div>
                                <h4 className={`text-[10px] md:text-xs font-sans font-bold uppercase tracking-[0.2em] mb-1.5 ${t.textMain}`}>Your Presence</h4>
                                <p className={`font-sans text-[10px] md:text-xs font-semibold leading-[1.7] ${t.textLight}`}>
                                    Please bless us with your presence as we celebrate this beautiful milestone. We look forward to sharing our joy with you.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* SECTION 3: RSVP */}
                    <div className={`absolute inset-0 pt-6 pb-24 flex flex-col items-center justify-center text-center px-6 transition-all duration-1000 ease-out ${activeIndex === 3 ? "opacity-100 translate-y-0 pointer-events-auto delay-200" : "opacity-0 translate-y-8 pointer-events-none"}`}>
                        <img src="/assets/images/logo-plain.svg" alt="Logo" className="w-[40vw] md:w-[250px] mb-4 object-contain opacity-90" />
                        <h2 className={`font-sans uppercase text-3xl md:text-4xl font-bold tracking-[0.2em] mb-4 drop-shadow-sm ${t.textAccent}`}>RSVP</h2>
                        <p className={`font-sans text-[10px] md:text-xs font-semibold leading-[1.7] max-w-xs mb-6 ${t.textMuted}`}>
                            We would be thrilled to have you join us. Please let us know if you can make it.
                        </p>

                        <div className="w-full z-20 relative">
                            <RSVPForm weddingData={weddingData} />
                        </div>
                        
                        <div className={`w-20 md:w-24 h-px mx-auto mt-8 mb-6 ${t.border} border-t z-20 relative`}></div>
                        
                        <div className="z-20 relative">
                            <p className={`font-sans text-[10px] md:text-[11px] font-semibold tracking-widest uppercase ${t.textMuted}`}>
                                Share Your Warmest Wishes
                            </p>
                            <a 
                                href={`https://wa.me/${weddingData?.contact?.whatsapp || "918709595001"}?text=${encodeURIComponent("Wishing you a very Happy Anniversary! 🥂")}`} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className={`inline-block mt-1.5 font-sans text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] border-b border-current pb-0.5 ${t.textAccent} hover:opacity-70 transition-opacity`}
                            >
                                Send your message here
                            </a>
                        </div>
                    </div>

                    {/* SECTION 4: CONTACT & SIGN OFF */}
                    <div className={`absolute inset-0 pt-8 pb-20 flex flex-col items-center justify-center text-center px-10 transition-all duration-1000 ease-out ${activeIndex === 4 ? "opacity-100 translate-y-0 pointer-events-auto delay-200" : "opacity-0 translate-y-8 pointer-events-none"}`}>
                        <img src="/assets/images/logo-plain.svg" alt="Logo" className="w-[40vw] md:w-[250px] mb-6 md:mb-4 object-contain opacity-90" />
                        <h2 className={`font-sans uppercase text-md md:text-lg font-bold tracking-[0.2em] mb-3 drop-shadow-sm ${t.textAccent}`}>Forever Marked in Time</h2>
                        <p className={`font-sans text-[10px] md:text-xs font-semibold leading-[1.7] max-w-[280px] md:max-w-xs mb-6 ${t.textMuted}`}>
                            Counting down the days until we celebrate this beautiful milestone together.
                        </p>

                        <div className="flex flex-col items-center justify-center w-full z-20 relative">
                            <div className={`font-sans uppercase text-xl md:text-2xl font-bold tracking-[0.2em] mb-4 ${t.textMain}`}>
                                {weddingData?.wedding?.displayDate || "MAY 31ST, 2026"}
                            </div>

                            <div className={`w-20 h-px mx-auto mb-4 ${t.border} border-t`}></div>

                            <div className="relative p-[1px] w-full max-w-xs rounded-md bg-linear-to-br from-[#BF953F] via-[#FCF6BA] to-[#AA771C] shadow-lg">
                                <div className={`w-full h-full rounded-[5px] p-4 flex flex-col items-center justify-center ${t.bg} bg-opacity-90 backdrop-blur-md`}>
                                    <CountdownTimer
                                        targetDate={weddingData?.wedding?.date || "2026-05-31T19:00:00"}
                                        textMainClass={t.textMain}
                                        textMutedClass={t.textMuted}
                                    />
                                </div>
                            </div>
                        </div>

                        <h3 className={`font-sans uppercase text-sm md:text-base font-bold tracking-[0.2em] mt-8 ${t.textMain}`}>See you there</h3>

                        {/* HALF SEAL FOR CLOSING */}
                        <div className="absolute bottom-[-30px] md:bottom-[-40px] left-1/2 -translate-x-1/2 z-50">
                            <button
                                onClick={onClose}
                                className="relative flex items-center justify-center w-28 h-28 md:w-36 md:h-36 rounded-full group cursor-pointer hover:scale-[1.03] active:scale-[0.97] transition-all duration-300"
                            >
                                {/* Minimal Royal Aura */}

                                <div className="absolute inset-x-[-5%] inset-y-[-5%] -z-10 bg-[#BF953F] rounded-full mix-blend-screen animate-royal-glow" />

                                <div className="absolute inset-[-30px] md:inset-[-40px] -z-10 border border-[#BF953F]/20 rounded-full pointer-events-none" />

                                <img
                                    src="/assets/images/seal.png"
                                    alt="Close Envelope"
                                    className="w-full h-full object-contain pointer-events-none drop-shadow-md z-10 relative"
                                />

                                {/* Circular Instruction Text */}
                                <div className="absolute inset-[-20px] md:inset-[-25px] z-0 pointer-events-none transition-opacity duration-1000 opacity-70 group-hover:opacity-100">
                                    <svg viewBox="0 0 200 200" className="w-full h-full animate-spin-slow origin-center overflow-visible">
                                        <path
                                            id="closeCirclePath"
                                            d="M 100, 100 m -85, 0 a 85,85 0 1,1 170,0 a 85,85 0 1,1 -170,0"
                                            fill="none"
                                        />
                                        <text className={`text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] pointer-events-none ${t.sealOrbit}`}>
                                            <textPath href="#closeCirclePath" startOffset="25%" textAnchor="middle">
                                                • Press here to reset •
                                            </textPath>
                                            <textPath href="#closeCirclePath" startOffset="75%" textAnchor="middle">
                                                • Press here to reset •
                                            </textPath>
                                        </text>
                                    </svg>
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* NAVIGATION BUTTON */}
                    {isOpen && (
                        <div className="absolute bottom-8 left-0 w-full z-50 flex justify-center pointer-events-none">
                            <div className={`transition-all duration-700 flex flex-col items-center ${activeIndex === totalSections - 1 || !isUnfolded ? 'opacity-0 translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0 pointer-events-auto'}`}>
                                <button
                                    onClick={scrollToNext}
                                    className={`flex flex-row items-center justify-center gap-2 group backdrop-blur-md px-4 py-2.5 rounded-full shadow-lg transition-all active:scale-95 ${t.navBtnBg} cursor-pointer select-none mb-2`}
                                    style={{ touchAction: "manipulation", WebkitTapHighlightColor: "transparent" }}
                                >
                                    <ChevronDown className={`w-3.5 h-3.5 animate-bounce ${t.navBtnIcon} pointer-events-none`} strokeWidth={2.5} />
                                    <span className={`text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold ${t.navBtnText} pointer-events-none whitespace-nowrap`}>
                                        {activeIndex === 0 ? "Tap to Read" : "Tap for More"}
                                    </span>
                                    <ChevronDown className={`w-3.5 h-3.5 animate-bounce ${t.navBtnIcon} pointer-events-none`} strokeWidth={2.5} />
                                </button>
                                <span className={`text-[7px] md:text-[9px] uppercase font-sans tracking-[0.2em] opacity-80 ${t.textMuted} pointer-events-none`}>
                                    Or swipe to explore
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                {/* SCROLL TRACKS */}
                <div className="w-full -mt-[90dvh] pointer-events-none">
                    <div className="w-full h-[90dvh] snap-start snap-always" />
                    <div className="w-full h-[90dvh] snap-start snap-always" />
                    <div className="w-full h-[90dvh] snap-start snap-always" />
                    <div className="w-full h-[90dvh] snap-start snap-always" />
                    <div className="w-full h-[90dvh] snap-start snap-always" />
                </div>

            </div>
        </div>
    );
}