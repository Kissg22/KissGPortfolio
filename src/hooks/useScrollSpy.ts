// src/hooks/useScrollSpy.ts
import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";

type Options = {
  /** Fix header magasság px-ben – ehhez igazítjuk a görgetést és a találati zónát */
  offset?: number;
  /** A viewporton belüli “aktivációs” vonal (0..1), pl. 0.35 = a felső 35% alja */
  activationRatio?: number;
};

export function useScrollSpy(sectionIds: string[], options?: Options) {
  const offset = options?.offset ?? 88;       // ← nálad a navbar 88px
  const activationRatio = options?.activationRatio ?? 0.35;

  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? "");
  const ticking = useRef(false);

  const computeActive = useCallback(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return;

    const scrollY = window.scrollY;
    const activationLine = scrollY + window.innerHeight * activationRatio;

    let current = sectionIds[0] ?? "";

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (!el) continue;

      const top = el.offsetTop - offset;
      const bottom = top + el.offsetHeight;

      // Ha az aktivációs vonal a szekcióban van → ez az aktív
      if (activationLine >= top && activationLine < bottom) {
        current = id;
        break;
      }
      // Ha az aktivációs vonal már lejjebb van a top-nál, lépjünk tovább
      if (activationLine >= top) current = id;
    }

    // Lap alja fallback – pici Contact is aktív lesz, ha leérünk
    const atBottom =
      window.innerHeight + scrollY >=
      document.documentElement.scrollHeight - 2;
    if (atBottom && sectionIds.length) {
      current = sectionIds[sectionIds.length - 1];
    }

    setActiveId((prev) => (prev === current ? prev : current));
  }, [activationRatio, offset, sectionIds]);

  useEffect(() => {
    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          computeActive();
          ticking.current = false;
        });
        ticking.current = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    computeActive();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [computeActive]);

  const handleNavClick = useCallback(
    (e: MouseEvent<HTMLElement>, id: string) => {
      e.preventDefault();
      if (typeof window === "undefined" || typeof document === "undefined") return;

      const el = document.getElementById(id);
      if (!el) return;

      const top = el.offsetTop - offset;
      // Azonnali vizuális visszajelzés:
      setActiveId(id);
      // Görgetés header-offsettel:
      window.scrollTo({ top, behavior: "smooth" });
      // URL frissítése #anchor-ral:
      history.replaceState(null, "", `#${id}`);
    },
    [offset]
  );

  return { activeId, handleNavClick };
}
