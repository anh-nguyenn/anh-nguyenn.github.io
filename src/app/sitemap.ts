import type {MetadataRoute} from 'next';

/**
 * Generates a sitemap.xml file for the website.
 */
export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://nextjs-portofolio-website.vercel.app',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1
        }
    ]
}
