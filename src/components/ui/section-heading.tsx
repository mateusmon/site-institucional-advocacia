import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";

type SectionHeadingProps = Readonly<{
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}>;

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p className="text-xs font-semibold tracking-[0.16em] text-primary uppercase sm:text-sm">
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        className="mt-3 font-serif text-3xl leading-tight font-semibold tracking-[-0.025em] text-foreground sm:text-4xl lg:text-5xl"
      >
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
          {description}
        </p>
      )}
    </Reveal>
  );
}
