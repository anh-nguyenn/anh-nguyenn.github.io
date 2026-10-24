import type {MetadataRoute} from 'next'

export const dynamic = 'force-static';

/**
 * Generates a robots.txt file for the website.
 */
export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
        },
        sitemap: 'https://anh-nguyenn.github.io/sitemap.xml',
    }
}
