import type {MetadataRoute} from 'next';

export const dynamic = 'force-static';

/**
 * Generates a sitemap.xml file for the website.
 */
export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://anh-nguyenn.github.io/',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1
        }
    ]
}
