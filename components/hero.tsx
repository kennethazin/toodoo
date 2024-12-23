import React from "react";
import { FlipWords } from "./ui/flip-words";

export default function Hero() {
  const words = ["is simple", "helps", "is yours", "works"];

  return (
    <div className="h-[40rem] flex justify-center items-center px-4">
      <div className="flex flex-col">
      <div className="text-4xl mx-auto font-normal text-neutral-600 dark:text-neutral-400">
        A todo app that
        <FlipWords words={words} /> <br />
      </div>
      <a href="sign-up">
      <button className="mt-5 px-4 py-2 hover:bg-muted-foreground rounded-md border border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200">
  Start now
</button>
</a>
</div>
    </div>
  );
}
