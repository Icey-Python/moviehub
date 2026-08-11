"use client";

import { useState } from "react";
import Image from "next/image";
import { IconStar, IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import type { Review } from "@/app/lib/types";

function ReviewCard({ review }: { review: Review }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = review.content.length > 400;
  const displayContent = isLong && !expanded
    ? review.content.slice(0, 400) + "..."
    : review.content;

  const avatar = review.author_details.avatar_path;
  const avatarUrl = avatar
    ? avatar.startsWith("http")
      ? avatar
      : `https://image.tmdb.org/t/p/w45${avatar}`
    : null;
  const rating = review.author_details.rating;

  const date = new Date(review.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="glass rounded-xl p-4 sm:p-5">
      <div className="flex items-start gap-3">
        <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 bg-background-elevated">
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt={review.author}
              fill
              sizes="40px"
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-sm font-bold text-muted-foreground">
              {review.author.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-sm">{review.author}</span>
            {rating !== null && (
              <span className="flex items-center gap-1 text-xs text-amber-400">
                <IconStar className="w-3 h-3" fill="currentColor" stroke={1.5} />
                {rating.toFixed(1)}
              </span>
            )}
            <span className="text-xs text-muted-foreground">{date}</span>
          </div>
          <p className="mt-2 text-sm text-foreground-secondary leading-relaxed whitespace-pre-line">
            {displayContent}
          </p>
          {isLong && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-2 text-xs text-accent hover:text-accent-hover transition-colors flex items-center gap-1"
            >
              {expanded ? (
                <>Show less <IconChevronUp className="w-3 h-3" /></>
              ) : (
                <>Read more <IconChevronDown className="w-3 h-3" /></>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function MovieReviews({ reviews }: { reviews: Review[] }) {
  const [showAll, setShowAll] = useState(false);
  const displayed = showAll ? reviews : reviews.slice(0, 4);

  if (reviews.length === 0) return null;

  return (
    <section className="mt-8 xs:mt-10 sm:mt-12 md:mt-14">
      <h2 className="section-heading">Reviews</h2>
      <div className="flex flex-col gap-4">
        {displayed.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
      {reviews.length > 4 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-4 text-sm text-foreground-secondary hover:text-white transition-colors flex items-center gap-1"
        >
          {showAll ? (
            <>Show fewer reviews <IconChevronUp className="w-4 h-4" /></>
          ) : (
            <>Show all {reviews.length} reviews <IconChevronDown className="w-4 h-4" /></>
          )}
        </button>
      )}
    </section>
  );
}
