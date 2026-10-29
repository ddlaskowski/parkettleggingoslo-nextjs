import Image from "next/image";
import type { ProjectImage } from "@/lib/projects";

/** Natural dimensions preserve portrait and landscape photographs without cropping. */
export default function ProjectGallery({ images }: { images: readonly ProjectImage[] }) {
  return (
    <div className="grid md:grid-cols-2 gap-8 items-start">
      {images.map((image) => (
        <figure key={image.id} className="min-w-0">
          <Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1152px) calc((100vw - 80px) / 2), 536px" className="w-full h-auto rounded-2xl border border-gray-200" />
          {image.caption && <figcaption className="mt-3 text-sm text-gray-600 [overflow-wrap:anywhere]">{image.caption}</figcaption>}
        </figure>
      ))}
    </div>
  );
}
