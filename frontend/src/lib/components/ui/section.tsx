import { cn } from "@/lib/utils/shadcn";
import { type VariantProps, cva } from "class-variance-authority";

const sectionVariants = cva("", {
  variants: {
    variant: {
      default: "",
      outline: "rounded-lg border bg-card text-card-foreground shadow-sm",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
type SectionVariantProps = VariantProps<typeof sectionVariants>;

export interface SectionProps
  extends React.ComponentPropsWithoutRef<"span">,
    SectionVariantProps {}

function Section({ className, children, variant, ...props }: SectionProps) {
  return (
    <section className={cn(sectionVariants({ variant, className }))} {...props}>
      {children}
    </section>
  );
}

Section.displayName = "Section";

export { Section };
