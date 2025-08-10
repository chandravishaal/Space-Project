import React from "react";

function BlackHoleInfo() {
  return (
    <div>
      <section className="text-white">
        <div className="flex items-center justify-center min-h-screen px-6 text-center">
          <div className="max-w-3xl">
            <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
              Supermassive Black Hole
            </h1>
            <p className="text-gray-300 mt-6 text-base sm:text-lg md:text-xl font-light">
              A{" "}
              <span className="text-white font-semibold">
                supermassive black hole
              </span>{" "}
              is a cosmic titan, its mass can equal hundreds of thousands to
              billions of Suns. Lurking at the heart of galaxies, including our
              own <span className="text-white">Milky Way</span>, these
              gravitational giants shape the birth, growth, and fate of galaxies
              themselves.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default BlackHoleInfo;
