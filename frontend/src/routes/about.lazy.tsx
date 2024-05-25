import { createLazyFileRoute } from "@tanstack/react-router";
import Banner from "../components/Banner";
import Box from "../components/Box";

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Banner>
        <h1 className="text-2xl font-bold text-white">About</h1>
      </Banner>

      <div className="max-auto flex w-full max-w-4xl flex-col items-center justify-center gap-4 p-3">
        <Box className="flex flex-col gap-4 text-center">
          <h2 className="text-2xl font-bold">What is FootyBee?</h2>
          <p>
            FootyBee is a Euro 2024 football prediction platform. As a user, you
            can make predictions on matches, create and join leagues with
            friends, and compete on our global leaderboard.
          </p>
          <p>
            Earn points by correctly predicting match results, team
            qualifications, and other outcomes. FootyBee is a full-stack app
            built with React, TypeScript, and Node, and you can find the source
            code on GitHub:{" "}
            <a
              href="https://github.com/xBracey/footybee-new"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700"
            >
              https://github.com/xBracey/footybee-new
            </a>
          </p>
        </Box>

        <div className="flex flex-col gap-4 md:flex-row">
          <div className="overflow-hidden rounded-lg">
            <img src="/about.jpg" alt="James and I" className="w-full" />
            <div className="rounded-b-lg border border-gray-300 bg-white p-2 text-center">
              Me(right) and James(left) at James' wedding
            </div>
          </div>

          <Box className="flex flex-col gap-2 text-center text-sm">
            <h2 className="text-2xl font-bold">The Origins of FootyBee</h2>
            <p>
              The idea for a football predictor stemmed from my brother, James,
              who started a mini-league among his friends during the Euros six
              years ago. We made predictions on match results and team
              qualifications, earning points for correct guesses, with a prize
              pool to keep things exciting.{" "}
            </p>
            <p>
              Two years later, we repeated the experience for the World Cup. As
              a newly graduated computer science student, I attempted to build a
              website to manage the whole process. Underestimating the
              complexity, I ended up with a half-finished, basic-looking site
              that only lasted through the group stages.{" "}
            </p>
            <p>
              Fast forward another two years, and with more web dev experience
              under my belt, I decided to expand on the original idea. As
              someone who likes a challenge, I set out to create a full-stack
              app where multiple leagues could coexist on a single site, with
              separate prediction rounds for the group and knockout stages.{" "}
            </p>
            <p>
              Now, in the present day, after revisiting my code from two years
              ago, I've redesigned and re-architected everything, focusing on a
              simple, easy-to-use web app that can be served as a Progressive
              Web App (PWA) on your phone.
            </p>
          </Box>
        </div>
      </div>
    </div>
  );
};

export const Route = createLazyFileRoute("/about")({
  component: About,
});
