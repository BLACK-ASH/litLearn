import type React from "react";

const FadeBackground = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="bg-gradient-to-b min-h-screen from-primary/7 to-inherit z-10">
      <div className="w-full relative">
        {/* Dashed Top Fade Grid */}
        <div
          className="absolute inset-0 -z-10 h-screen"
          style={{
            backgroundImage: `
        linear-gradient(to right, rgba(216, 180, 254, 0.4) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(216, 180, 254, 0.4) 1px, transparent 1px)
      `,
            backgroundSize: "20px 20px",
            backgroundPosition: "0 0, 0 0",
            maskImage: `
        repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)
      `,
            WebkitMaskImage: `
 repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)
      `,
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
          }}
        />

        {/* Your Content/Components */}
        <div className="">{children}</div>
      </div>
    </div>
  );
};

export default FadeBackground;
