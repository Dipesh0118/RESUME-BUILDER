import Header from '@/components/custom/Header';
import { UserButton } from '@clerk/clerk-react';
import { AtomIcon, Edit, Share2 } from 'lucide-react';
import React from 'react';

function Home() {
  return (
    <div>
      <Header />

      {/* Hero Section */}
      <section className="z-50 py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Build Your Resume <span className="text-primary">With AI</span>
        </h1>
        <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
          Effortlessly Craft a Standout Resume with Our AI-Powered Builder
        </p>
        <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
          <a
            href="/dashboard"
            className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-primary hover:bg-primary focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
          >
            Get Started
          </a>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-8 bg-white z-50 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12 mt-[-50px]">
        <h2 className="font-bold text-3xl">How it Works?</h2>
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Step 1: Write Prompt */}
          <a
            className="block rounded-xl border bg-white border-gray-200 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
            href="#"
          >
            <AtomIcon className="h-8 w-8" />
            <h2 className="mt-4 text-xl font-bold text-black">Write prompt for your form</h2>
            <p className="mt-1 text-sm text-gray-600">
              Start by creating a form prompt that outlines your resume requirements. The Gemini AI will help generate the necessary sections.
            </p>
          </a>

          {/* Step 2: Edit Form */}
          <a
            className="block rounded-xl border bg-white border-gray-200 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
            href="#"
          >
            <Edit className="h-8 w-8" />
            <h2 className="mt-4 text-xl font-bold text-black">Edit Your form</h2>
            <p className="mt-1 text-sm text-gray-600">
              Customize the sections and details in the generated form to ensure it matches your exact requirements.
            </p>
          </a>

          {/* Step 3: Share & Accept Responses */}
          <a
            className="block rounded-xl border bg-white border-gray-200 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
            href="#"
          >
            <Share2 className="h-8 w-8" />
            <h2 className="mt-4 text-xl font-bold text-black">Download & Share Resume</h2>
            <p className="mt-1 text-sm text-gray-600">
              Download & Share the resume whenever needed.
            </p>
          </a>
        </div>
      </section>
    </div>
  );
}

export default Home;
