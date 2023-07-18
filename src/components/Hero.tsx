import heroImage from "../assets/Reading glasses-cuate.png";
const Hero = () => {
  return (
    <div>
      <div className="pt-32 md:py-12 xl:container m-auto px-6 md:px-12">
        <div
          aria-hidden="true"
          className="absolute inset-0 my-auto w-96 h-32 rotate-45 bg-gradient-to-r from-primaryLight to-secondaryLight blur-3xl opacity-50 dark:opacity-20"
        ></div>
        <div className="relative lg:flex lg:items-center lg:gap-12">
          <div className="text-center lg:text-left md:mt-12 lg:mt-0 sm:w-10/12 md:w-2/3 sm:mx-auto lg:mr-auto lg:w-6/12">
            <h1 className=" font-bold text-4xl md:text-6xl lg:text-5xl xl:text-6xl ">
            Love Learning with Book  {' '}
              <span className="text-primary dark:text-primaryLight">
                 App.
              </span>
            </h1>
            <p className="mt-8">
            Love is a transformative aspect of the spiritual path—and, in fact, it is our very nature. A. H. Almaas takes us on a journey beyond a narrow, individual understanding of love into an exploration of what he calls the boundless dimension of Divine Love.
 
 This is not the kind of love that we feel toward someone else; it is nondual, a love without boundaries. Or put another way, it is universal true nature experienced as love.
 
 In this book talk given on March 23, 2023,  A. H. Almaas shares about his inspiration for the book and his teachings of Nondual Love, the second book on the topic of love in a three-part series on the topic of love.
            </p>
            <div>
            <button
                    
                    className="w-1/4 mt-14 rounded-full bg-green-500 dark:bg-green-400 h-11 flex items-center justify-center px-6 py-3 transition hover:bg-green-600 focus:bg-green-600 active:bg-green-800"
                  >
                    <span className="text-base font-semibold text-white dark:text-gray-900">
                      Read More ...
                    </span>
                  </button>
            </div>
     
          </div>
          <div className="overflow-hidden w-full lg:w-7/12 lg:-mr-16">
            <img
              src={heroImage}
              alt="project illustration"
              height=""
              width=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
