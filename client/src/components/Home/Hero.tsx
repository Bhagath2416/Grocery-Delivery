
import { LeafIcon, ArrowRightIcon } from "lucide-react";
import { Link } from "react-router-dom";
import hero from "../../assets/ChatGPT Image Jun 2, 2026, 08_34_09 PM.png";

const Hero = () => {
  return (
    <section className="relative overflow-hidden min-h-[540px] mb-10 rounded-3xl flex items-center">
      {/* Background Image */}
      <img
        src={hero}
        alt="Hero"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-app-green via-app-green/65 to-transparent" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="max-w-xl xl:pl-10">
          {/* Badge */}
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-orange-300 bg-orange-300/10 rounded-full mb-5">
            <LeafIcon className="size-3" />
            Farm-Fresh & Organic
          </span>

          {/* Heading */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-5">
            Nourish your home with{" "}
            <span className="text-orange-300">
              Earth's finest
            </span>
          </h1>

          {/* Description */}
          <p className="text-base text-white/70 leading-relaxed mb-8 max-w-md">
            Fresh, organic groceries delivered from local farms to your
            doorstep. Quality you can taste, convenience you deserve.
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-4 flex-wrap">
            <Link
              to="/products"
              className="px-7 py-3 bg-orange-400 text-white font-semibold rounded-full hover:bg-orange-500 transition-all flex items-center gap-2 active:scale-[0.98]"
            >
              Shop Now
              <ArrowRightIcon className="size-4" />
            </Link>

            <Link
              to="/products"
              className="px-7 py-3 bg-white/10 text-white font-semibold rounded-full border border-white/20 hover:bg-white/20 transition-all flex items-center gap-2 active:scale-[0.98]"
            >
              Browse Categories
              {/* <ArrowRightIcon className="size-4" /> */}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;