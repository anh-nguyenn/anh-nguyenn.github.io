import type {MetadataRoute} from 'next'

/**
 * Generates a robots.txt file for the website.
 */
export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
        },
        sitemap: 'https://nextjs-portofolio-website.vercel.app/sitemap.xml',
    }
}
