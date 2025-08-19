import {
  Clapperboard,
  NotebookPen,
  Sparkles,
  UserRoundCog,
} from "lucide-react";
import React from "react";

export default function HomeView() {
  return (
    <main className="flex flex-col items-center justify-center py-16 px-4 sm:px-6 ">
      <div className="max-w-6xl w-full text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-slate-900  mb-6">
          Where Your Next Great Story Begins
        </h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-10">
          PlotPoint is your dedicated space to log ideas, outline plots, and
          develop characters, all supercharged with AI to bring your vision to
          life.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
          <a
            className="bg-blue-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-400 transition-transform transform hover:scale-104 text-lg"
            href="#"
          >
            Get Started for Free
          </a>
        </div>
      </div>
      <div className="max-w-6xl w-full mt-4 grid grid-cols-1 md:grid-cols-5 gap-8">
        <div className="md:col-span-1 h-70">
          <img
            alt="Person writing in a notebook"
            className="rounded-2xl w-full h-full object-cover object-bottom-right shadow-lg"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAuRFwenQclHCmIKByStMugDLgDqidT2PF5O6bZlB7YimTRBH2R5MXsNfyS40azsF0g8wOYZvk1v37MBIs61zATox_rQziGyf4tLbhIwdcI6tBmf2pcD4H_VOX4TH1lKZBwfUDziZ45-pvXyM8f57LyZZTU6c0O2k6rPO635H6qu1692F-RB-Ekx_pCBYZeEJ4qtkD36vYEsMFcyEKEQip5--quOB8p5W2j-Ehli9SwP2kOlsrCh7TjjjXweSAhM6zdGM5PZe3fDZk"
          />
        </div>
        <div className="md:col-span-1 bg-blue-400 rounded-2xl h-70 text-white p-3 pt-8 text-center flex flex-col items-center ">
          <NotebookPen size={50} className="mb-6" />
          <h3 className="text-xl font-semibold mb-3">Story Planning</h3>
          <p className="text-sm">
            Organize your ideas and create detailed outlines with our intuitive
            planning tools.
          </p>
        </div>

        <div className="md:col-span-1 rounded-2xl h-70 p-3 bg-white shadow-md shadow-slate-200 pt-8 text-center flex flex-col items-center">
          <Sparkles size={50} className="mb-6" />
          <h3 className="text-xl font-semibold mb-3">AI Assistance</h3>
          <p className="text-sm">
            Get creative suggestions and overcome writer's block with our
            AI-powered tools.
          </p>
        </div>

        <div className="md:col-span-1 bg-blue-500 rounded-2xl h-70 text-white p-3 pt-8 text-center flex flex-col items-center">
          <UserRoundCog size={50} className="mb-6" />
          <h3 className="text-xl font-semibold mb-3">Character Development</h3>
          <p className="text-sm">
            Create compelling characters with detailed profiles and backstories.
          </p>
        </div>

        <div className="md:col-span-1 bg-white shadow-md shadow-slate-200 rounded-2xl h-70 text-slate-900 p-3 pt-8 text-center flex flex-col items-center">
          <Clapperboard size={50} className="mb-6" />
          <h3 className="text-xl font-semibold mb-3">Plot Visualization</h3>
          <p className="text-sm">
            Visualize your story structure and plot points with interactive
            timelines.
          </p>
        </div>
      </div>
    </main>
  );
}
