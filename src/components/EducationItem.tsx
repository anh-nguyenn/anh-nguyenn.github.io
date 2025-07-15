"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaCalendarAlt, FaMapMarkerAlt, FaGraduationCap } from "react-icons/fa";
import React from "react";

interface EducationItemProps {
  slug: string;
  institution: string;
  degree: string;
  start: string;
  end: string;
  description: string;
  location: string;
  achievements?: string[];
}

/**
 * A functional component that renders an education item with institution, degree, dates, and achievements.
 */
export default function EducationItem({
  slug,
  institution,
  degree,
  start,
  end,
  description,
  location,
  achievements,
}: EducationItemProps) {
  return (
    <Link href={`/education/${slug}`} className="block group">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ opacity: { duration: 0.8 } }}
        whileHover={{
          scale: 1.05,
          transition: {
            type: "spring",
            stiffness: 200,
            damping: 30,
            duration: 0.4,
          },
        }}
        className="border rounded-xl p-4 shadow-sm hover:border-blue-500 transition bg-gray-100
              dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer"
      >
        {/* Institution and Degree */}
        <div className="flex items-start gap-3 mb-3">
          <FaGraduationCap className="text-blue-500 dark:text-blue-400 text-xl mt-1 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {institution}
            </h3>
            <p className="text-lg text-blue-600 dark:text-blue-400 font-medium">
              {degree}
            </p>
          </div>
        </div>

        {/* Duration and Location */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3 text-gray-500 dark:text-gray-400">
          <div className="flex items-center">
            <FaCalendarAlt className="w-4 h-4 mr-1" />
            <span>
              {start} – {end}
            </span>
          </div>
          <div className="flex items-center">
            <span className="hidden sm:inline mx-2">|</span>
            <FaMapMarkerAlt className="w-4 h-4 mr-1" />
            <span>{location}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-700 dark:text-gray-300 mb-3">
          {description
            .split(/(Highest Distinction \(First Class Honours\))/g)
            .map((part, idx) =>
              part === "Highest Distinction (First Class Honours)" ? (
                <b key={idx}>{part}</b>
              ) : (
                part
              )
            )}
        </p>

        {/* Achievements */}
        {achievements && achievements.length > 0 && (
          <div className="mt-3">
            <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
              Key Achievements:
            </h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
              {achievements.map((achievement, index) => (
                <li key={index}>{achievement}</li>
              ))}
            </ul>
          </div>
        )}
      </motion.div>
    </Link>
  );
}
