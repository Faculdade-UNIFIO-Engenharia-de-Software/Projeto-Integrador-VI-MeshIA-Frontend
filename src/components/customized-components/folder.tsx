import * as React from "react"
import Link from "next/link"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const folderVariants = cva(
  [
    "group",
    "flex items-center",
    "w-full",
    "rounded-md",
    "border border-border",
    "bg-card",
    "text-card-foreground",
    "shadow-sm",
    "transition-colors",
  ],
  {
    variants: {
      variant: {
        default: [
          "hover:bg-accent",
          "hover:text-accent-foreground",
        ],

        ghost: [
          "border-transparent",
          "bg-transparent",
          "shadow-none",
          "hover:bg-accent",
          "hover:text-accent-foreground",
        ],

        selected: [
          "border-primary",
          "bg-accent",
          "text-accent-foreground",
        ],

        link: [
          "cursor-pointer",
          "hover:bg-accent",
          "hover:text-accent-foreground",
          "hover:border-accent",
        ],
      },

      size: {
        xs: "min-h-10 max-w-70 px-2 gap-2",
        sm: "min-h-12 max-w-70 px-3 gap-2",
        md: "min-h-16 max-w-70 px-4 gap-3",
        lg: "min-h-20 max-w-70 px-5 gap-3",
        xl: "min-h-24 max-w-70 px-6 gap-4",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

const folderIconVariants = cva(
  [
    "flex shrink-0 items-center justify-center",
    "rounded-md",
    "bg-muted",
    "text-muted-foreground",
    "transition-colors",
    "group-hover:bg-background",
    "group-hover:text-foreground",
  ],
  {
    variants: {
      size: {
        xs: "size-7",
        sm: "size-8",
        md: "size-10",
        lg: "size-12",
        xl: "size-14",
      },
    },

    defaultVariants: {
      size: "md",
    },
  }
)

const folderTextVariants = cva(
  [
    "min-w-0",
    "flex-1",
    "truncate",
    "font-medium",
  ],
  {
    variants: {
      size: {
        xs: "text-xs",
        sm: "text-sm",
        md: "text-sm",
        lg: "text-base",
        xl: "text-lg",
      },
    },

    defaultVariants: {
      size: "md",
    },
  }
)

interface FolderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
    VariantProps<typeof folderVariants> {
  children: React.ReactNode
  icon: React.ReactNode
  action?: React.ReactNode
  href?: string
}

function Folder({
  className,
  variant,
  size,
  icon,
  children,
  action,
  href,
  ...props
}: FolderProps) {
  const isLink = variant === "link"

  const content = (
    <>
      <div className={`cn(folderIconVariants({ size }))`}>
        {icon}
      </div>

      <span className={`cn(folderTextVariants({ size })) px-4`}>
        {children}
      </span>
    </>
  )

  return (
    <div
      data-slot="folder"
      className={cn(
        folderVariants({
          variant,
          size,
        }),
        className
      )}
      {...props}
    >
      {isLink && href ? (
        <>
          <Link
            href={href}
            className="flex min-w-0 flex-1 items-center gap-inherit"
          >
            {content}
          </Link>

          {action && (
            <div className="shrink-0">
              {action}
            </div>
          )}
        </>
      ) : (
        <>
          <div className="flex min-w-0 flex-1 items-center gap-inherit">
            {content}
          </div>

          {action && (
            <div className="shrink-0">
              {action}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export {
  Folder,
  folderVariants,
  folderIconVariants,
  folderTextVariants,
}
