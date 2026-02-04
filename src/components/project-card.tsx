"use client";

import { useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  title: string;
  description: string;
  tags?: string[];
  features?: { title: string; detail: string }[];
  link?: string;
  linkText?: string;
  className?: string;
}

export function ProjectCard({
  title,
  description,
  tags = [],
  features = [],
  link,
  linkText = "View Project",
  className,
}: ProjectCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={cn(
        "group relative border border-white/10 bg-gray-900/50 overflow-hidden rounded-xl px-8 py-10 transition-colors hover:border-white/20",
        className
      )}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(6, 182, 212, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative z-10">
        <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 mb-2">
          {title}
        </h3>
        <p className="mt-2 text-gray-300 leading-relaxed max-w-2xl text-lg">
          {description}
        </p>

        {tags.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-300 backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {features.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, idx) => (
              <div key={idx} className="flex flex-col space-y-1">
                <span className="font-semibold text-white text-lg">{feature.title}</span>
                <span className="text-sm text-gray-400">{feature.detail}</span>
              </div>
            ))}
          </div>
        )}

        {link && (
          <div className="mt-10">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-white/5 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-white/10 hover:scale-105 hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] border border-white/10"
            >
              {linkText}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
