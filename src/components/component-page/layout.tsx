import React, { type ReactNode } from "react";
import BackToGridLink from "@/components/BackToGridLink";
import InstallationOptions from "@/components/InstallationOptions";
import Terminal from "@/components/Terminal";
import PageRails from "./PageRails";

type ComponentPageLayoutProps = {
  title: string;
  category?: string;
  segmentCount?: number;
  preview: ReactNode;
  controls: ReactNode;
  code: string;
  cliCode: string;
  manualCode: string;
  controlTitle?: string;
  controlDescription?: string;
  controlAdornment?: ReactNode;
};

const ComponentPageLayout = ({
  title,
  category = "Click effect",
  segmentCount = 6,
  preview,
  controls,
  code,
  cliCode,
  manualCode,
  controlTitle = "Tune the effect",
  controlDescription = "Adjust the controls and copy the generated usage code.",
  controlAdornment,
}: ComponentPageLayoutProps) => {
  return (
    <PageRails segmentCount={segmentCount}>
      <div className="min-h-[calc(100vh-80px)] overflow-hidden bg-transparent text-black dark:text-white">
        <div className="min-h-[calc(100vh-80px)] w-full border-b border-black/20 px-4 py-6 dark:border-white/10 sm:px-6 md:px-10 md:py-8 lg:border-x">
          <BackToGridLink />

          <div className="mt-8 grid w-full gap-8 xl:grid-cols-[minmax(0,1.05fr)_minmax(25rem,0.95fr)]">
            <section className="min-w-0">
              <div className="mb-6">
                <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-black/45 dark:text-white/45">
                  {category}
                </p>
                <h1 className="font-sans text-5xl font-semibold leading-none tracking-normal text-black dark:text-white sm:text-6xl">
                  {title}
                </h1>
              </div>

              <div className="grid gap-5 lg:grid-cols-[minmax(18rem,1fr)_minmax(16rem,0.74fr)]">
                <div className="relative overflow-hidden border border-black/15 bg-white dark:border-white/10 dark:bg-[#050505]">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-black/35 to-transparent dark:via-white/35" />
                  <div className="relative flex min-h-[21rem] items-center justify-center p-7 sm:min-h-[25rem] lg:min-h-[28rem]">
                    {preview}
                  </div>
                </div>

                <div className="border border-black/10 bg-white/70 p-5 dark:border-white/10 dark:bg-white/[0.03]">
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <div>
                      <h2 className="text-lg font-medium tracking-normal">
                        {controlTitle}
                      </h2>
                      <p className="mt-1 text-sm text-black/55 dark:text-white/50">
                        {controlDescription}
                      </p>
                    </div>
                    {controlAdornment}
                  </div>

                  <div>{controls}</div>
                </div>
              </div>
            </section>

            <aside className="min-w-0">
              <div className="sticky top-24 space-y-7">
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <h2 className="text-lg font-medium tracking-normal">
                      Usage
                    </h2>
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-black/40 dark:text-white/40">
                      React
                    </span>
                  </div>
                  <Terminal code={code} />
                </div>

                <div>
                  <h2 className="text-lg font-medium tracking-normal">
                    Installation
                  </h2>
                  <p className="mt-1 text-sm text-black/55 dark:text-white/50">
                    Add the component through the CLI or copy the source into
                    your project.
                  </p>
                  <a
                    href="https://ui.shadcn.com/docs/installation"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 block text-sm text-black/55 underline decoration-black/30 underline-offset-4 transition-colors hover:text-black dark:text-white/50 dark:decoration-white/30 dark:hover:text-white"
                  >
                    Having trouble with the CLI? Set up shadcn first.
                  </a>
                </div>
                <InstallationOptions CLICode={cliCode} ManualCode={manualCode} />
              </div>
            </aside>
          </div>
        </div>
      </div>
    </PageRails>
  );
};

type ColorPickerProps = {
  value: string;
  colors: string[];
  onChange: (color: string) => void;
  label?: string;
};

export const ColorPicker = ({
  value,
  colors,
  onChange,
  label = "Color",
}: ColorPickerProps) => {
  return (
    <div className="mb-6 w-full max-w-md">
      <div className="mb-3 font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
        {label}
      </div>
      <div className="flex gap-3">
        {colors.map((color) => (
          <button
            key={color}
            type="button"
            aria-label={`Set particle color to ${color}`}
            onClick={() => onChange(color)}
            className={`h-7 w-7 border transition-all duration-200 ${
              value.toLowerCase() === color.toLowerCase()
                ? "scale-110 border-black shadow-[0_0_0_3px_rgba(0,0,0,0.08)] dark:border-white dark:shadow-[0_0_0_3px_rgba(255,255,255,0.12)]"
                : "border-black/20 hover:scale-105 dark:border-white/20"
            }`}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </div>
  );
};

export const ColorPreview = ({ color }: { color: string }) => {
  return (
    <div
      className="h-8 w-8 shrink-0 border border-black/15 dark:border-white/15"
      style={{ backgroundColor: color }}
      aria-hidden="true"
    />
  );
};

export default ComponentPageLayout;
