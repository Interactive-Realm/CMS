import { cn } from "@/lib/utils/shadcn";
import { type VariantProps, cva } from "class-variance-authority";
import { GalleryVerticalEnd } from "lucide-react";

const logoImageVariants = cva("", {
  variants: {
    variant: {
      default: "",
      icon: "",
      text: "hidden",
    },
    size: {
      default: "size-4",
      lg: "size-7",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});
type LogoImageProps = VariantProps<typeof logoImageVariants>;

const logoTextVariants = cva("", {
  variants: {
    variant: {
      default: "",
      icon: "hidden",
      text: "",
    },
    size: {
      default: "text-md font-medium",
      lg: "text-2xl font-bold",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});
type LogoTextProps = VariantProps<typeof logoTextVariants>;

export interface LogoProps
  extends React.ComponentPropsWithoutRef<"span">,
    LogoImageProps,
    LogoTextProps {}

export function Logo({ className, variant, size, ...props }: LogoProps) {
  return (
    <span
      className={cn("flex items-center gap-2 self-center", className)}
      {...props}
    >
      <GalleryVerticalEnd
        className={cn(logoImageVariants({ variant, size }))}
      />
      <span className={cn(logoTextVariants({ variant, size }))}>Mekado</span>
    </span>
  );
}
