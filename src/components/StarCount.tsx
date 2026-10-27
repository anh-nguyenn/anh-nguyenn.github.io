import { GoStar } from "react-icons/go";

export default function StarCount({
  count,
  approximate,
}: {
  count: number;
  approximate: boolean;
}) {
  const compact = new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(count).toLowerCase();

  return (
    <span
      className="star-count"
      aria-label={approximate ? `About ${compact} GitHub stars` : `${count.toLocaleString("en")} GitHub stars`}
    >
      <GoStar aria-hidden="true" />
      <span aria-hidden="true">{compact}</span>
    </span>
  );
}
