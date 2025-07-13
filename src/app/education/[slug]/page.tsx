import { notFound } from "next/navigation";
import education from "@/data/education";
import AnimatedArticle from "@/components/AnimatedArticle";
import { pageParams } from "@/lib/types";
import BackToPageButton from "@/components/BackToPageButton";
import {
  FaGraduationCap,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaStar,
} from "react-icons/fa";

/**
 * Generate static parameters for the education item pages to be pre-rendered.
 */
export async function generateStaticParams() {
  return education.map((item) => ({
    slug: item.slug,
  }));
}

/**
 * EducationItemPage component that renders a single education item based on the slug.
 */
export default async function EducationItemPage(props: { params: pageParams }) {
  const { slug } = await props.params;
  const eduItem = education.find((e) => e.slug === slug);
  if (!eduItem) return notFound();

  return (
    <AnimatedArticle>
      <BackToPageButton pageUrl="/education" />

      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-start gap-4 mb-6">
          <FaGraduationCap className="text-blue-500 dark:text-blue-400 text-4xl mt-2 flex-shrink-0" />
          <div>
            <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-gray-100">
              {eduItem.institution}
            </h1>
            <p className="text-xl text-blue-600 dark:text-blue-400 font-medium mb-4">
              {eduItem.degree}
            </p>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <FaCalendarAlt className="w-5 h-5" />
            <span className="font-medium">
              {eduItem.start} – {eduItem.end}
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <FaMapMarkerAlt className="w-5 h-5" />
            <span className="font-medium">{eduItem.location}</span>
          </div>
          {eduItem.gpa && (
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
              <FaStar className="w-5 h-5" />
              <span className="font-medium">GPA: {eduItem.gpa}</span>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
          {eduItem.description}
        </p>

        {/* Personal Journey Story - Only for NTU */}
        {eduItem.slug === "ntu-info-eng-media" && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
              My Journey: From Vietnam to NTU Singapore
            </h2>

            {/* Story Section */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-8 mb-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Story Text */}
                <div className="space-y-4">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    Growing up in rural Vietnam, my fascination with physics
                    earned me a national prize and set me on this path.
                  </p>

                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    Taking a gap year was tough, but it gave me clarity and
                    prepared me to apply to NTU Singapore.
                  </p>

                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    NTU’s Information Engineering & Media program perfectly
                    bridges my analytical background and creative interests.
                  </p>

                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    Every challenge from late nights studying to moments of
                    doubt has led me to NTU’s vibrant campus.
                  </p>
                </div>

                {/* Admission Letter Image */}
                <div className="relative">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg">
                    <img
                      src="/admission-letter.png"
                      alt="NTU Admission Letter"
                      className="w-full h-auto rounded-lg object-cover"
                      style={{ maxHeight: "320px" }}
                    />
                    <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
                      My NTU Admission Letter – A Dream Come True
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* First year */}
            <div className="bg-gradient-to-r from-yellow-50 to-red-50 dark:from-yellow-900/20 dark:to-red-900/20 rounded-xl p-8 mb-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                First Year: Coming to NTU during COVID-19 quarantine
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    Arriving at NTU during COVID-19 quarantine was overwhelming.
                    I was alone in a new country, separated from family by
                    borders and restrictions. The first few weeks were filled
                    with uncertainty and homesickness.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    But slowly, I found my place. I joined clubs, made friends
                    who became family, and discovered that my rural Vietnamese
                    background wasn't a barrier - it was my strength. Every late
                    night studying became a reminder of why I was here.
                  </p>
                </div>
                <div className="relative">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg">
                    <img
                      src="/first-ntu-class.jpg"
                      alt="First NTU Class"
                      className="w-full h-auto rounded-lg object-cover"
                      style={{ maxHeight: "320px" }}
                    />
                    <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
                      My First NTU Class – The Beginning of Everything
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Second Year to Fourth Year */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl p-8 mb-4">
              <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
                Second Year to Fourth Year: Discovering My Path
              </h3>

              {/* Image Collage */}
              <div className="mb-4">
                <div className="grid grid-cols-4 gap-3">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-2 shadow-md">
                    <img
                      src="/projects/peak.jpg"
                      alt="Hackathon Experience"
                      className="w-full h-24 object-cover rounded"
                    />
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-2 shadow-md">
                    <img
                      src="/projects/loreal.jpg"
                      alt="Business Competition"
                      className="w-full h-24 object-cover rounded"
                    />
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-2 shadow-md">
                    <img
                      src="/projects/ideasjam.png"
                      alt="ideasjam"
                      className="w-full h-24 object-cover rounded"
                    />
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-2 shadow-md">
                    <img
                      src="/projects/ic2e.jpg"
                      alt="ic2e"
                      className="w-full h-24 object-cover rounded"
                    />
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-2 shadow-md">
                    <img
                      src="/projects/bearingpoint.png"
                      alt="bearingpoint"
                      className="w-full h-24 object-cover rounded"
                    />
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-2 shadow-md">
                    <img
                      src="/projects/developer-google.png"
                      alt="workshop"
                      className="w-full h-24 object-cover rounded"
                    />
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-2 shadow-md">
                    <img
                      src="/projects/with-keppel-ceo.png"
                      alt="Keppel Work"
                      className="w-full h-24 object-cover rounded"
                    />
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-2 shadow-md">
                    <img
                      src="/projects/fyp.jpg"
                      alt="Career Development"
                      className="w-full h-24 object-cover rounded"
                    />
                  </div>
                </div>
              </div>

              {/* Story Text */}
              <div className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  I joined tech and business hackathons, did a few internships,
                  and realized the blend of technology and business makes me
                  feel excited and decided to pursue a technical consulting
                  career.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Through these experiences, I discovered my passion for
                  bridging the gap between technical solutions and business
                  needs. Each hackathon taught me to think creatively under
                  pressure, while my internships gave me real-world insights
                  into how technology can drive business transformation.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  The combination of my engineering background and growing
                  business acumen has shaped my vision for a career in technical
                  consulting, where I can leverage both my analytical skills and
                  strategic thinking to solve complex challenges.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Additional Details based on institution */}
      {eduItem.slug === "ntu-info-eng-media" && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            Journey Highlights & Milestones
          </h2>
          <p className="text-md text-gray-700 dark:text-gray-300 mb-6 max-w-3xl">
            A snapshot of the moments that defined my NTU experience – from
            academic high points to entrepreneurial adventures.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3 text-blue-800 dark:text-blue-300">
                Achievements
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>
                  • <strong>Dean's List</strong> AY2024-2025 (Top 5% of cohort)
                </li>
                <li>
                  • <strong>Rank 2</strong>, NTU CAO-WorldQuant Brain Alphathon
                  2025
                </li>
                <li>
                  • <strong>2nd Runner Up</strong>, NTU CAO-SimplifyNext RPA x
                  Gen AI Hackathon 2024
                </li>

                <li>
                  • <strong>Third Prize</strong>, IdeasJam 2023 by NTU
                  Garage@EEE
                </li>
                <li>
                  • <strong>Winner</strong>, NTU MLDA@EEE Deep Learning Week
                  Hackathon - Most Innovative Use of Computer Vision 2022
                </li>
              </ul>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3 text-green-800 dark:text-green-300">
                Innovation & Entrepreneurship
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>
                  • <strong>Merit Prize</strong>, NTU Innovation Ignition
                  Challenge for Young Entrepreneurs (I2CE) 2023
                </li>
                <li>
                  • <strong>2nd Runner Up</strong>, L'Oréal Brandstorm 2023
                  Singapore
                </li>
                <li>
                  • <strong>University Champion</strong>, NTU PEAK Best Ideation
                  Award 2022
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6">
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3 text-purple-800 dark:text-purple-300">
                NTU Co-curricular Activities
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>
                  • <strong>NTU ShARE Management Consulting Club:</strong>{" "}
                  Training Director (AY2023-2024)
                </li>
                <li>
                  • <strong>NTU Student​ Union (NTUSU):</strong> Research &
                  Policy Commitee (AY2022-2024)
                </li>
                <li>
                  • <strong>NTU CAC Soul Funky Pop & Lock</strong>: Junior
                  Member (AY2022-2023)
                </li>
                <li>
                  • <strong>NTU Heritage Club</strong>: Heritage Discoverer and
                  Explorer (HDE) Officer Systems (AY2022-2023)
                </li>
                <li>
                  • <strong>Garage@EEE</strong>: Business Developement Associate
                  (AY2021-2022)
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {eduItem.slug === "ku-exchange" && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            My Winter Exchange Journey in Korea
          </h2>

          {/* Personal Story Section */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-8 mb-8">
            <div className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                First time seeing snow, first time coming to Korea and met so
                many friends. Thanks NTU for providing a meaningful exchange
                program.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                This winter exchange at Korea University was more than just an
                academic experience - it was a journey of firsts. From
                experiencing my first snowfall to immersing myself in Korean
                culture, every moment was filled with wonder and discovery.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                The friendships I made during this short but intense program
                will last a lifetime. We shared late-night study sessions,
                explored Seoul together, and learned from each other's diverse
                backgrounds and perspectives.
              </p>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Memories from Korea
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-md">
                <img
                  src="/ku/first-snow.jpg"
                  alt="KU Campus"
                  className="w-full h-32 object-cover rounded"
                />
                <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
                  My First Snow
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-md">
                <img
                  src="/ku/ku-campus.jpg"
                  alt="KU Campus"
                  className="w-full h-32 object-cover rounded"
                />
                <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
                  KU Campus
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-md">
                <img
                  src="/ku/friends.jpg"
                  alt="KU Campus"
                  className="w-full h-32 object-cover rounded"
                />
                <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
                  New Friends
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-md">
                <img
                  src="/ku/grad.jpg"
                  alt="KU Campus"
                  className="w-full h-32 object-cover rounded"
                />
                <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
                  KU Graduation
                </p>
              </div>
            </div>
          </div>

          {/* Academic & Cultural Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3 text-purple-800 dark:text-purple-300">
                Academic Achievement
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• Grade: A+ in Data Analytics</li>
                <li>• KU Winter Campus Program</li>
                <li>• International Academic Excellence</li>
                <li>• Cross-cultural Learning Experience</li>
              </ul>
            </div>
            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3 text-orange-800 dark:text-orange-300">
                Cultural Experience
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• Seoul, South Korea Experience</li>
                <li>• Cultural Exchange Activities</li>
                <li>• International Networking</li>
                <li>• Global Perspective Development</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </AnimatedArticle>
  );
}
