import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { LucideShieldCheck } from "lucide-react";

const versaIdVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline: "text-foreground border-border hover:bg-muted",
      },
      size: {
        default: "text-xs py-0.5 px-2.5",
        sm: "text-[10px] py-0 px-2",
        lg: "text-sm py-1 px-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface VersaIdBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof versaIdVariants> {
  versaId: string;
  showIcon?: boolean;
}

export function VersaIdBadge({
  className,
  variant,
  size,
  versaId,
  showIcon = true,
  ...props
}: VersaIdBadgeProps) {
  return (
    <div className={cn(versaIdVariants({ variant, size }), className)} {...props}>
      {showIcon && <LucideShieldCheck className="mr-1 h-3 w-3" />}
      <span className="font-mono">{versaId}</span>
    </div>
  );
}
