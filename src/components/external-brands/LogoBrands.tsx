import Image from "next/image";

interface brandLogo {
  size?: number;
  className?: string;
}

export function GitHubBrand({ size = 24, className }: brandLogo) {
  return (
    <Image
      src="/icons/icon-github.png"
      alt="IconGoogleBrand"
      width={size}
      height={size}
      className={className}
    />
  );
}

export function GoogleBrand({ size = 24, className }: brandLogo) {
  return (
    <Image
      src="/icons/icon-google.png"
      alt="IconGoogleBrand"
      width={size}
      height={size}
      className={className}
    />
  );
}
