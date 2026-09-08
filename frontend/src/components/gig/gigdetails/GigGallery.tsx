import { useState } from 'react';
import { Image } from 'antd';
import { ChevronLeft, ChevronRight, ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { GigGalleryProps } from '../../../types/gig.types';

export default function GigGallery({ images }: GigGalleryProps) {
  const [selected, setSelected] = useState(0);

  // No images
  if (!images || images.length === 0) {
    return (
      <div className="flex h-[450px] items-center justify-center rounded-2xl border bg-muted">
        <div className="text-center">
          <ImageIcon className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
          <p className="text-lg font-medium">No images available</p>
        </div>
      </div>
    );
  }

  const previous = () => {
    setSelected((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const next = () => {
    setSelected((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <Image.PreviewGroup>
      <div className="space-y-5">
        {/* Main Image */}

        <div className="relative overflow-hidden rounded-2xl border bg-white shadow-sm">
          <Image src={images[selected].url} alt="Gig Image" preview={false} />

          {images.length > 1 && (
            <>
              <Button
                size="icon"
                variant="secondary"
                onClick={previous}
                className="absolute left-5 top-1/2 -translate-y-1/2 rounded-full"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>

              <Button
                size="icon"
                variant="secondary"
                onClick={next}
                className="absolute right-5 top-1/2 -translate-y-1/2 rounded-full"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </>
          )}
        </div>

        {/* Thumbnails */}

        {images.length > 1 && (
          <div className="flex gap-4 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelected(index)}
                className={`overflow-hidden rounded-xl border-2 transition-all ${
                  selected === index ? 'border-primary' : 'border-transparent'
                }`}
              >
                <img
                  src={image.url}
                  alt={`Thumbnail ${index + 1}`}
                  className="h-24 w-36 object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </Image.PreviewGroup>
  );
}
