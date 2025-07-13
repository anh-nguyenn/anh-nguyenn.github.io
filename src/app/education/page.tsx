"use client";

import EducationItem from "@/components/EducationItem";
import education from "@/data/education";
import { useMemo, useState } from "react";
import SortDropdown from "@/components/SortDropdown";
import FilterDropdown from "@/components/FilterDropdown";
import { AnimatePresence, motion } from "framer-motion";
import { FaFrown } from "react-icons/fa";

/**
 * EducationPage component that serves as the main page for displaying education history.
 * This is accessed at the "/education" URL of the application.
 */
export default function EducationPage() {
  const [selectedInstitutions, setSelectedInstitutions] = useState<string[]>(
    []
  );
  const [institutionDrafts, setInstitutionDrafts] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<"oldest" | "newest">("newest");

  // Memoized unique institutions list with counts to avoid recalculating on every render
  const uniqueInstitutions = useMemo(() => {
    const institutionCounts: Record<string, number> = {};
    education.forEach((eduItem) => {
      institutionCounts[eduItem.institution] =
        (institutionCounts[eduItem.institution] || 0) + 1;
    });
    return Object.entries(institutionCounts)
      .map(([institution, count]) => ({ institution, count }))
      .sort((a, b) => a.institution.localeCompare(b.institution));
  }, []);

  const toggleInstitutionDrafts = (institution: string) => {
    setInstitutionDrafts((prev) =>
      prev.includes(institution)
        ? prev.filter((t) => t !== institution)
        : [...prev, institution]
    );
  };

  const applyFilters = () => {
    setSelectedInstitutions([...institutionDrafts]);
  };

  const clearFilters = () => {
    setSelectedInstitutions([]);
    setInstitutionDrafts([]);
  };

  // Memoized filtered education items based on selected institutions and sort order
  const filteredEducationItems = useMemo(() => {
    const filtered = education.filter(
      (eduItem) =>
        selectedInstitutions.length === 0 ||
        (eduItem.institution &&
          selectedInstitutions.some((institution) =>
            eduItem.institution.includes(institution)
          ))
    );

    return filtered.sort((a, b) => {
      if (sortOrder === "newest") {
        return (
          new Date(b.end || "").getTime() - new Date(a.end || "").getTime()
        );
      } else {
        return (
          new Date(a.start || "").getTime() - new Date(b.start || "").getTime()
        );
      }
    });
  }, [selectedInstitutions, sortOrder]);

  return (
    <section className="px-4 max-w-4xl mx-auto">
      <div className="flex flex-wrap justify-between gap-4 mb-8 items-center w-full">
        {/* Institution Filter Dropdown - Left */}
        <div className="relative flex-grow md:flex-grow-0">
          <FilterDropdown
            items={uniqueInstitutions.map(({ institution, count }) => ({
              name: institution,
              count,
            }))}
            selectedItems={institutionDrafts}
            onToggle={toggleInstitutionDrafts}
            onApply={applyFilters}
            onClear={clearFilters}
            placeholder="Filter by Institution"
            resultCount={filteredEducationItems.length}
          />
        </div>

        {/* Sort Order Dropdown - Right */}
        <div className="relative flex-grow md:flex-grow-0 z-20">
          <SortDropdown
            sortOrder={sortOrder}
            onChange={(order) => setSortOrder(order as "newest" | "oldest")}
            options={[
              { label: "Newest First", value: "newest" },
              { label: "Oldest First", value: "oldest" },
            ]}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {filteredEducationItems.length > 0 ? (
          <motion.div
            key="education-items"
            className="space-y-6 grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {filteredEducationItems.map((item) => (
              <EducationItem key={item.slug} {...item} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="no-results"
            className="flex flex-col items-center text-center text-gray-600 dark:text-gray-300 mt-12 px-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <FaFrown className="text-4xl md:text-5xl mb-3 text-gray-400 dark:text-gray-500" />
            <p className="text-lg md:text-xl lg:text-2xl font-semibold">
              No education items found
            </p>
            <p className="text-sm md:text-base lg:text-lg mt-2 max-w-2xl">
              The combination of selected institution filters didn&apos;t match
              any education items. Try changing or clearing your filters.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
