import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import {TextBlock} from "@/interfaces/core.interfaces";
import {RocketLaunchIcon, SparkleIcon} from "@phosphor-icons/react/ssr";
import {heroCardContent, processesContent, servicesContent} from "@/data/content.data";
import Image from "next/image";

const SectionHeader = ({ title, description }: TextBlock) => {
  return (
    <div className="my-5">
      <p className="section-title">{title}</p>
      <p className="section-subtitle">{description}</p>
    </div>
  );
}

const HeroSection = () => {
  return (
    <section id="#home" className="section-wrapper">
      <p className="hero-title">
        We Turn Ideas Into Powerful and <br/>
        Scalable Software That Works Just as <br/>
        You <span>Imagined</span>.
      </p>
      <button className="hero-button">
        <SparkleIcon/>
        Let's Collaborate
      </button>

      {/* Glass Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        {heroCardContent.map((content, index) => (
          <div key={index} className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-white mb-3">
              {content.title}
            </h3>
            <div className="text-white/80 text-sm leading-relaxed">
              {content.description}
            </div>
          </div>
        ))}
      </div>
      <div className="backdrop-blur-md flex items-center justify-center bg-white/10 border border-white/20 rounded-xl p-6 shadow-lg h-[800px] my-10">
        <p>Place looping video here</p>
      </div>
    </section>
  );
}
const ServicesSection = () => {
  return (
    <section id="#services" className="py-20 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Our Services"
          description={
            <>
              We tailor solutions that <br/> fits your needs.
            </>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {servicesContent.map((service, index) => (
            <div key={index} className="backdrop-blur-md bg-white/10 rounded-lg p-8 border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:transform hover:-translate-y-1">
              <div className="flex items-start justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                <service.icon className="w-8 h-8 text-gray-400 flex-shrink-0" />
              </div>
              <p className="text-gray-300 leading-relaxed">{service.description}</p>
            </div>

          ))}
        </div>
      </div>
    </section>
  );
};
const ProcessesSection = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Our Processes"
          description={
            <>
              We work in steps that <br />
              lead to results.
            </>
          }
        />

        {/* Process grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors">
            <RocketLaunchIcon className="w-6 h-6 text-white" />
          </div>
          {processesContent.map((process, index) => (
            <div key={index} className="group relative">
              {/* Connection line (hidden on mobile, shown on larger screens) */}
              {index < processesContent.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-8 h-0.5 bg-gray-200 z-0"></div>
              )}

              <div className="backdrop-blur-md bg-white/10 rounded-lg p-8 border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:transform hover:-translate-y-1">
                {/* Icon and label */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors">
                      <process.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-sm font-medium text-white uppercase tracking-wide">
              {process.iconText}
            </span>
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {process.title}
                  </h3>
                  <p className="text-white leading-relaxed">
                    {process.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl">
            Start Your Project
          </button>
        </div>
      </div>
    </section>
  );
};
const TechSection = () => {
  // Generate array of tech icon numbers from 1 to 21
  const techIcons = Array.from({ length: 21 }, (_, i) => {
    const number = i + 1;
    return number < 10 ? `0${number}` : number.toString();
  });

  return (
    <section className="section-wrapper">
      <SectionHeader
        title="Technologies we use"
        description={
          <>
            We build with the tools <br />
            that power today's best <br />
            digital products.
          </>
        }
      />

      {/* Tech Icons Grid */}
      <div className="grid grid-cols-7 gap-4 mt-12 max-w-4xl mx-auto lg:grid-cols-7 md:grid-cols-5 sm:grid-cols-3">
        {techIcons.map((iconNumber) => (
          <div
            key={iconNumber}
            className="flex items-center justify-center"
          >
            <Image
              src={`/assets/tech-icons/tech-${iconNumber}.svg`}
              alt={`Technology ${iconNumber}`}
              width={88}
              height={88}
              className="opacity-70 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300"
            />
          </div>
        ))}
      </div>
    </section>
  );
};
const OurStorySection = () => {
  return(
    <section id="#our-story" className="section-wrapper">
      <SectionHeader
        title="Our Story"
        description = {
          <>
            Born from passion, built to <br/>bring ideas to life.
          </>
        }
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div>
          <Image src='/assets/images/team.png' alt="withkm-team" height={368} width={485}/>

        </div>

        <div>
          Withkm began with a modest yet powerful idea: creating a community dedicated to turning imagination into reality. We observed too many tremendous ideas being nothing more than ideas because people generally lacked someone who would listen deeply, understand truly, and help them make their vision happen. People were not looking for people to write code; they were looking for people who would put in as much as they did.

        </div>
        <div>
          That insight became the heart of withkm. We started not with a plan, but with the belief that software should feel personal and be built around what makes each idea unique. No jargon. No unnecessary complexity. Just a commitment to bring vision to creation.

          Today, we are a small team with a clear focus. We help founders, creatives, and growing teams bring their ideas to life. We listen carefully, build with purpose, and stay true to the reason we started in the first place.
        </div>

      </div>
    </section>
  );
}
const ContactUsSection = () => {
  return(
    <section id="#contact-us" className="section-wrapper">
      <SectionHeader
        title="Contact Us"
        description={
          <>
            Have an idea? We’re ready <br /> to build.
          </>
        }
      />
    </section>
  );
}

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center">
      {/* Navbar with mx-auto */}
      <div className="w-full max-w-[1200px] mx-auto">
        <Navbar />
      </div>

      {/* Sections, full width or custom spacing */}
      <div className="w-full max-w-[1200px] px-4">
        <HeroSection/>
        <ServicesSection />
        <ProcessesSection />
        <TechSection />
        <OurStorySection />
        <ContactUsSection />
      </div>

      {/* Footer with mx-auto */}
      <div className="w-full max-w-[1200px] mx-auto">
        <Footer />
      </div>
    </main>

  );
}
