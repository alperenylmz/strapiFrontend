import { getStrapiURL } from "./api";

// Media tipini tanımla
interface Media {
  url: string;
}

export function getStrapiMedia(media: Media): string {
  const imageUrl = media.url.startsWith("/")
    ? getStrapiURL(media.url)
    : media.url;
  return imageUrl;
}