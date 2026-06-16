"use client";

import Link from "next/link";
import {
  ArrowRight,
  Brain,
  FileText,
  Briefcase,
  Target,
} from "lucide-react";

export default function HeroSection() {
  return (
    <section className="landing-bg relative min-h-screen flex items-center px-6 py-20">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">

        {/* LEFT CONTENT */}
        <div>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Stop Guessing.
            <br />
            Start Building
            <span className="block bg-linear-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Your Career Roadmap
            </span>
          </h1>

          <p className="mt-6 text-lg text-muted-foreground max-w-xl">
            Upload your resume and discover exactly what skills,
            projects, certifications, and interview preparation
            you need to land your dream role.
          </p>

          <div className="mt-10 flex gap-4 flex-wrap">
            <Link
              href="/dashboard"
              className="px-6 py-3 rounded-xl bg-primary text-primary-foreground flex items-center gap-2 hover:scale-105 transition"
            >
              Start Analysis
              <ArrowRight size={18} />
            </Link>

            <Link
              href="https://youtu.be/p-dSzDYunL8?si=Hkvyrjy6LERf2wqk"
              target="_blank"
              className="px-6 py-3 rounded-xl border border-border hover:bg-muted/10 transition"
            >
              View Demo
            </Link>
          </div>
        </div>

        {/* RIGHT SIDE ROADMAP */}
        <div className="relative flex flex-col items-center justify-center">

          <JourneyCard
            icon={<FileText className="h-5 w-5 text-cyan-400" />}
            title="Resume"
            subtitle="Upload CV"
          />

          <ArrowConnector />

          <JourneyCard
            icon={<Brain className="h-5 w-5 text-blue-400" />}
            title="AI Analysis"
            subtitle="Skill Extraction"
          />

          <ArrowConnector />

          <JourneyCard
            icon={<Target className="h-5 w-5 text-orange-400" />}
            title="Skill Gap Detection"
            subtitle="Missing Technologies"
          />

          <ArrowConnector />

          <JourneyCard
            icon={<Briefcase className="h-5 w-5 text-purple-400" />}
            title="Roadmap"
            subtitle="Personalized Plan"
          />

          <ArrowConnector />

          <div className="w-[320px] rounded-2xl border border-border bg-card backdrop-blur-xl p-6 shadow-xl text-center">
            <div className="text-4xl mb-3">🎯</div>

            <h3 className="font-bold text-xl">
              Dream Job
            </h3>

            <p className="text-sm text-muted-foreground mt-2">
              Software Engineer
            </p>
          </div>

          {/* Floating Skills */}

          <div className="absolute top-10 -left-20 rounded-full bg-muted/10 border border-border px-4 py-2 text-sm backdrop-blur">
            React
          </div>

          <div className="absolute top-40 -right-20 rounded-full bg-muted/10 border border-border px-4 py-2 text-sm backdrop-blur">
            Next.js
          </div>

          <div className="absolute bottom-44 -left-20 rounded-full bg-muted/10 border border-border px-4 py-2 text-sm backdrop-blur">
            DSA
          </div>

          <div className="absolute bottom-24 -right-24 rounded-full bg-muted/10 border border-border px-4 py-2 text-sm backdrop-blur">
            System Design
          </div>

        </div>
      </div>
    </section>
  );
}

function JourneyCard({ icon, title, subtitle }) {
  return (
    <div className="w-[320px] rounded-2xl border border-border bg-card backdrop-blur-xl p-5 shadow-xl">
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-muted/10">
          {icon}
        </div>

        <div>
          <h3 className="font-semibold text-lg">
            {title}
          </h3>

          <p className="text-sm text-muted-foreground">
            {subtitle}
          </p>
        </div>

      </div>
    </div>
  );
}

function ArrowConnector() {
  return (
    <div className="flex flex-col items-center py-2">
      <div className="h-8 w-0.5 bg-linear-to-b from-cyan-400 to-blue-500" />
      <div className="text-cyan-400 text-lg">
        ↓
      </div>
    </div>
  );
}

