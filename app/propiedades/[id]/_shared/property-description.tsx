"use client";

import { useState } from "react";

interface PropertyDescriptionProps {
  description: string;
}
export function PropertyDescription({ description }: PropertyDescriptionProps) {
  // Create a state to handle the show more/less functionality
  const [showMore, setShowMore] = useState(false);

  // Slice the description to show only the first 500 characters
  const slicedDescription = (description || "").slice(0, 500);

  // Handle the show more/less button click
  const handleShowMore = () => {
    setShowMore((prev) => !prev);
  };

  // If showMore is true, show the full description, otherwise show the sliced description
  const _description = showMore ? description : `${slicedDescription}...`;

  // If there's no description, return null
  if (!description) {
    return null;
  }

  return (
    <p className="text-sm text-zinc-500">
      {_description}{" "}
      <button
        className="font-medium text-sky-500 hover:underline"
        onClick={handleShowMore}
        type="button"
      >
        {showMore ? "Mostrar menos" : "Mostrar mas"}
      </button>
    </p>
  );
}
