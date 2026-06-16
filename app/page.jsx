"use client"
import Image from "next/image";
import { faqs } from "@/data/faqs";
import { testimonial } from "@/data/testimonial";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { ArrowRight } from "lucide-react";

import HeroSection from "@/components/hero";
import HeroBanner from "@/components/Herobanner";
import { features } from "@/data/features";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { howItWorks } from "@/data/howItWorks";
import Link from "next/link";


export default function Home() {
  return (
      <div className="landing-bg">
    <HeroSection/>

<section className="py-16 md:py-24 bg-muted/5 dark:bg-muted/30">
  <div className="container mx-auto px-4">

    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
        How SensAI Works
      </h2>

      <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
        Follow a simple AI-powered workflow to improve your resume,
        prepare for interviews, and accelerate your career growth.
      </p>
    </div>

    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
      {howItWorks.map((step, index) => (
        <Card
          key={step.title}
          className="
            relative
            rounded-[2rem]
            border-border
            bg-card
            text-card-foreground
            group
            overflow-hidden
            hover:shadow-xl
            hover:-translate-y-2
            hover:border-primary/50
            transition-all
            duration-300
          "
        >
          <CardContent className="p-6">

            {/* Step Number */}
            <div className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
              {index + 1}
            </div>

            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
               {step.icon}
            </div>

            <h3 className="text-xl font-semibold mb-3">
              {step.title}
            </h3>

            <p className="text-muted-foreground">
              {step.description}
            </p>

          </CardContent>
        </Card>
      ))}
    </div>

  </div>
</section>
  <section className="py-16 md:py-24">
  <div className="container mx-auto px-4">
    
    {/* Heading */}
    <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-center mb-4">
      Powerful Features for Your Career Growth
    </h2>

    <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
      Everything you need to build your resume, prepare for interviews,
      and accelerate your professional journey.
    </p>

    {/* Feature Cards */}
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {features.map((feature) => (
        <Card
          key={feature.title}
          className="group transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-border"
        >
          <CardContent className="p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              {feature.icon}
            </div>

            <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
              {feature.title}
            </h3>

            <p className="text-muted-foreground">
              {feature.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>

    {/* Hero Banner */}
    <div className="mt-20">
      <HeroBanner />
    </div>
  </div>
</section>

{/* Analytics Showcase */}

<section className="py-20">
  <div className="container mx-auto px-4">

    <div className="text-center mb-14">
      <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
        Trusted By Career Builders
      </h2>

      <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
        Thousands of students and professionals use SensAI
        to improve resumes, identify skill gaps, and prepare
        for their dream careers.
      </p>
    </div>

    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

      {/* Active Users */}
      <Card className="bg-card border-border hover:scale-105 hover:shadow-lg transition-all duration-300">
        <CardContent className="p-8 text-center">
          <div className="text-5xl mb-4">👥</div>

          <h3 className="text-4xl font-bold">
            12.5K+
          </h3>

          <p className="text-muted-foreground mt-2">
            Active Users
          </p>

          {/* FIX: was text-green-500 — use semantic Tailwind pair for both modes */}
          <div className="mt-4 text-emerald-600 dark:text-emerald-400 text-sm">
            ↑ 18% this month
          </div>
        </CardContent>
      </Card>

      {/* Resumes */}
      <Card className="bg-card border-border hover:scale-105 transition-all duration-300">
        <CardContent className="p-8 text-center">
          <div className="text-5xl mb-4">📄</div>

          <h3 className="text-4xl font-bold">
            45K+
          </h3>

          <p className="text-muted-foreground mt-2">
            Resumes Analyzed
          </p>

          <div className="mt-4 text-emerald-600 dark:text-emerald-400 text-sm">
            ↑ 23% this month
          </div>
        </CardContent>
      </Card>

      {/* Roadmaps */}
      <Card className="bg-card border-border hover:scale-105 transition-all duration-300">
        <CardContent className="p-8 text-center">
          <div className="text-5xl mb-4">🗺️</div>

          <h3 className="text-4xl font-bold">
            3.2K+
          </h3>

          <p className="text-muted-foreground mt-2">
            Roadmaps Generated
          </p>

          <div className="mt-4 text-emerald-600 dark:text-emerald-400 text-sm">
            ↑ 15% this month
          </div>
        </CardContent>
      </Card>

      {/* Success Rate */}
      <Card className="bg-card border-border hover:scale-105 transition-all duration-300">
        <CardContent className="p-8 text-center">
          <div className="text-5xl mb-4">🚀</div>

          <h3 className="text-4xl font-bold">
            89%
          </h3>

          <p className="text-muted-foreground mt-2">
            Interview Success Rate
          </p>

          <div className="mt-4 text-emerald-600 dark:text-emerald-400 text-sm">
            ↑ 12% this month
          </div>
        </CardContent>
      </Card>

    </div>

    {/* Bottom Dashboard Style Bar */}
    {/* FIX: was bg-white/5 border-white/10 — invisible in light mode */}
    <div className="mt-16 rounded-3xl border border-border bg-muted/5 dark:bg-muted/40 p-8">

      <div className="grid md:grid-cols-3 gap-8">

        <div>
          <p className="text-muted-foreground text-sm">
            Average Resume Score
          </p>

          <h3 className="text-3xl font-bold mt-2">
            82 / 100
          </h3>
        </div>

        <div>
          <p className="text-muted-foreground text-sm">
            Skills Identified
          </p>

          <h3 className="text-3xl font-bold mt-2">
            125K+
          </h3>
        </div>

        <div>
          <p className="text-muted-foreground text-sm">
            Career Matches
          </p>

          <h3 className="text-3xl font-bold mt-2">
            9.8K+
          </h3>
        </div>

      </div>

    </div>

  </div>
</section>


<section className="py-16 md:py-24">
  <div className="container mx-auto px-4">

    {/* Section Header */}
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
        Success Stories
      </h2>

      <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
        Thousands of professionals have accelerated their careers
        using SensAI's AI-powered guidance.
      </p>
    </div>

    {/* Testimonials Grid */}
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

      {testimonial.map((item, index) => (
        <Card
          key={index}
          className="
            group
            border border-border
            hover:-translate-y-2
            hover:shadow-xl
            transition-all
            duration-300
          "
        >
          <CardContent className="p-6">

            {/* Stars */}
            <div className="mb-4 flex gap-1 text-yellow-500">
              ⭐⭐⭐⭐⭐
            </div>

            {/* Quote */}
            <blockquote className="text-muted-foreground italic leading-relaxed mb-6">
              "{item.quote}"
            </blockquote>

            {/* User Info */}
            <div className="flex items-center gap-4">

              <Image
                src={item.image}
                alt={item.author}
                width={56}
                height={56}
                className="rounded-full border border-border"
              />

              <div>
                <h4 className="font-semibold">
                  {item.author}
                </h4>

                <p className="text-sm text-muted-foreground">
                  {item.role}
                </p>

                <p className="text-xs text-primary">
                  {item.company}
                </p>
              </div>

            </div>

          </CardContent>
        </Card>
      ))}

    </div>

  </div>
</section>


<section className="py-24">
  <div className="container mx-auto px-4">

    <div className="text-center mb-12">
      <h2 className="text-4xl font-bold">
        Frequently Asked Questions
      </h2>

      <p className="mt-4 text-muted-foreground">
        Everything you need to know about SensAI.
      </p>
    </div>

    <Accordion
      type="single"
      collapsible
      className="max-w-3xl mx-auto"
    >
      {faqs.map((item, index) => (
        <AccordionItem
          key={index}
          value={`item-${index}`}
        >
          <AccordionTrigger>
            {item.question}
          </AccordionTrigger>

          <AccordionContent>
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>

  </div>
</section>


<section className="py-24">
  <div className="container mx-auto px-4">

    <div
      className="
        relative
        overflow-hidden
        rounded-3xl
        border border-border
        bg-linear-to-r
        from-cyan-500/10
        via-blue-500/10
        to-purple-500/10
        p-12
        md:p-16
        text-center
      "
    >

      {/* Background Glow — decorative only, safe in both modes */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.12),transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.20),transparent_70%)]" />

      <div className="relative z-10">

        <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
          🚀 AI-Powered Career Growth
        </span>

        <h2 className="mt-6 text-4xl md:text-5xl font-bold tracking-tight">
          Ready to Build Your
          <span className="block bg-linear-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            Dream Career?
          </span>
        </h2>

        <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground">
          Upload your resume, uncover hidden skill gaps, generate a
          personalized roadmap, and prepare for interviews with
          AI-powered guidance.
        </p>

        <div className="mt-10 flex justify-center">

          <Link
            href="https://www.youtube.com/watch?v=p-dSzDYunL8"
            className="
              group
              inline-flex
              items-center
              justify-center
              rounded-xl
              bg-primary
              px-8
              py-4
              font-medium
              text-primary-foreground
              transition-all
              duration-300
              hover:scale-105
              hover:shadow-lg
              hover:shadow-primary/30
            "
          >
            Get Started Free

            <ArrowRight
              className="
                ml-2
                h-5
                w-5
                transition-transform
                duration-300
                group-hover:translate-x-2
              "
            />
          </Link>

        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
          <span>✓ Free Resume Analysis</span>
          <span>✓ Instant Feedback</span>
          <span>✓ Personalized Roadmaps</span>
        </div>

      </div>
    </div>

  </div>
</section>

    </div>
  );
}