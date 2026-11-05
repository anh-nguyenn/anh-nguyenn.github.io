"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { bus } from "@/lib/motion";

const LINKS = [
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "open-source", label: "Open source" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

/** Quiet ambient drone built with the Web Audio API. Created lazily, off by default. */
function useDrone() {
  const ctx = useRef<AudioContext | null>(null);
  const gain = useRef<GainNode | null>(null);

  const set = useCallback(async (on: boolean) => {
    if (!ctx.current) {
      if (!on) return;
      const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ac = new Ctor();
      const master = ac.createGain();
      master.gain.value = 0;
      const filter = ac.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 420;
      const lfo = ac.createOscillator();
      const lfoGain = ac.createGain();
      lfo.frequency.value = 0.07;
      lfoGain.gain.value = 180;
      lfo.connect(lfoGain).connect(filter.frequency);
      [55, 82.4, 110.3].forEach((f, i) => {
        const o = ac.createOscillator();
        o.type = i === 2 ? "triangle" : "sine";
        o.frequency.value = f;
        o.detune.value = i * 4;
        o.connect(filter);
        o.start();
      });
      lfo.start();
      filter.connect(master).connect(ac.destination);
      ctx.current = ac;
      gain.current = master;
    }
    const ac = ctx.current!;
    if (on) await ac.resume();
    gain.current!.gain.cancelScheduledValues(ac.currentTime);
    gain.current!.gain.linearRampToValueAtTime(on ? 0.06 : 0, ac.currentTime + 1.2);
    if (!on) window.setTimeout(() => void ac.suspend(), 1300);
  }, []);

  useEffect(() => () => void ctx.current?.close(), []);
  return set;
}

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [sound, setSound] = useState(false);
  const [section, setSection] = useState({ id: "top", index: 0, title: "Intro" });
  const button = useRef<HTMLButtonElement>(null);
  const overlay = useRef<HTMLDivElement>(null);
  const curtain = useRef<HTMLDivElement>(null);
  const setDrone = useDrone();

  useEffect(() => {
    bus.curtain = curtain.current;
    const onSection = (e: Event) => setSection((e as CustomEvent).detail);
    const close = () => setOpen(false);
    window.addEventListener("portfolio:section", onSection);
    window.addEventListener("portfolio:navigate", close);
    return () => {
      window.removeEventListener("portfolio:section", onSection);
      window.removeEventListener("portfolio:navigate", close);
    };
  }, []);

  useEffect(() => {
    // `inert` is set as a DOM property so closed-menu links are unreachable by keyboard and AT.
    if (overlay.current) (overlay.current as HTMLElement & { inert: boolean }).inert = !open;
  }, [open]);

  // Modal behaviour: inert page, focus handling, Escape and a Tab trap.
  useEffect(() => {
    const main = document.getElementById("main-content");
    if (!open) {
      main?.removeAttribute("inert");
      return;
    }
    main?.setAttribute("inert", "");
    const links = overlay.current?.querySelectorAll<HTMLElement>("a, button");
    window.setTimeout(() => links?.[0]?.focus(), 60);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); button.current?.focus(); }
      if (e.key === "Tab" && links?.length) {
        const list = [button.current!, ...Array.from(links)];
        const first = list[0], last = list[list.length - 1];
        const active = document.activeElement;
        if (e.shiftKey && active === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && active === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("keydown", onKey); main?.removeAttribute("inert"); };
  }, [open]);

  const toggleSound = () => { const next = !sound; setSound(next); void setDrone(next); };

  return (
    <>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Jerry Nguyen, back to top">Jerry Nguyen<span>.</span></a>
        <p className="header-section" aria-hidden="true">
          <span>{String(section.index).padStart(2, "0")}</span> / {section.title}
        </p>
        <div className="header-actions">
          <button type="button" className="sound-btn" aria-pressed={sound} onClick={toggleSound}>
            <span className="sound-bars" aria-hidden="true"><i /><i /><i /><i /></span>
            <span className="sound-label">Sound {sound ? "on" : "off"}</span>
          </button>
          <button
            type="button"
            ref={button}
            className="menu-btn"
            aria-expanded={open}
            aria-controls="menu-overlay"
            onClick={() => setOpen((v) => !v)}
          >
            <span>{open ? "Close" : "Menu"}</span>
            <span className="menu-icon" aria-hidden="true"><i /><i /></span>
          </button>
        </div>
      </header>

      <div
        id="menu-overlay"
        ref={overlay}
        className={`menu${open ? " is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
      >
        <nav aria-label="Sections" className="menu-nav">
          <ol>
            {LINKS.map((l, i) => (
              <li key={l.id} style={{ ["--i" as string]: i }}>
                <a href={`#${l.id}`} aria-current={section.id === l.id ? "true" : undefined}>
                  <span className="menu-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="menu-text">{l.label}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="menu-foot">
          <a href="mailto:nguyentuananh.kmf@gmail.com">nguyentuananh.kmf@gmail.com</a>
          <a href="https://www.linkedin.com/in/jerrynguyentuananh/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
          <a href="https://github.com/anh-nguyenn" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
        </div>
      </div>

      <div className="curtain" ref={curtain} aria-hidden="true" />
    </>
  );
}
