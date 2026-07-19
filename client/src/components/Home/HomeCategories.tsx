// import {categoriesData} from "../../assets/categories"
// import { Link } from "react-router-dom"

// const HomeCategories = () => {
//   return (
//   <section className="py-16">
//     <div className="max-w-7xl mx-auto">
//         <div>
//              <h2 className="text-2xl font-semibold">Browse Categories</h2>
//              <p className="text-sm text-app-text-light mt-1">Find exactly what you need using</p>
//         </div>

//         <div className="flex items-center mt-8 overflow-x-scroll no-scrollbar">
//         {categoriesData.map((cat) => (
//            <Link key={cat.slug} to={`/products?category=${cat.slug}`}
//             onClick={() => window.scrollTo(0,0)}  className="group flex flex-col items-center gap-3 p-4">
//                 <div className="size-18 sm:size-26 sm:p-2 rounded-2xl overflow-hidden bg-orange-100 group-hover:ring-2 ring-orange-300/75 transition-all">
//                     <img src={cat.image} alt={cat.name} className="w-full h-full object-contain rounded-full transition-all"/>
//                 </div>
//            </Link>
//         ))}
//         </div>
//     </div>
//   </section>
//   )
// }

// export default HomeCategories

import { categoriesData } from "../../assets/categories";
import { Link } from "react-router-dom";

const HomeCategories = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-orange-50/40 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-app-green">
            Browse Categories
          </h2>
          <p className="text-app-text-light mt-2">
            Find exactly what you need from fresh groceries to daily essentials
          </p>
        </div>

        {/* Categories */}
        <div className="flex gap-5 overflow-x-auto no-scrollbar pb-4">
          {categoriesData.map((cat) => (
            <Link
              key={cat.slug}
              to={`/products?category=${cat.slug}`}
              onClick={() => window.scrollTo(0, 0)}
              className="group flex flex-col items-center shrink-0"
            >
              {/* Card */}
              <div className="w-32 h-36 sm:w-40 sm:h-44 rounded-3xl bg-white border border-orange-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 p-4 flex flex-col items-center justify-center">
                
                {/* Image */}
                <div className="size-20 sm:size-24 rounded-full overflow-hidden bg-orange-100 ring-2 ring-transparent group-hover:ring-orange-300 transition-all duration-300">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Name */}
                <p className="mt-4 text-sm sm:text-base font-semibold text-center text-app-green group-hover:text-orange-500 transition-colors">
                  {cat.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeCategories;