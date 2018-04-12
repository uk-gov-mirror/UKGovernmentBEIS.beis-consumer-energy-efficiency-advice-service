import * as parse from 'url-parse';

export interface AcfImage {
    url: string;
    alt: string;
    width: number;
    sizes: any;
}

/**
 * ACF images have thumbnails (created on upload).
 *
 * This function will look for the smallest thumnail larger than the
 * given width.
 */
export function getAcfImageUrlForMinSize(minWidth: number, image: AcfImage): string {
    if (!image || !image.sizes) {
        return null;
    }

    // "sizes" has keys like:
    //
    //   "medium": "http://localhost:81/wp-content/uploads/2017/12/iStock-499804470-LR-300x199.jpg",
    //   "medium-width": 300,
    //   "medium-height": 199,
    let bestThumbUrl = image.url;
    let bestThumbName = null;
    let bestThumbWidth = image.width;
    for (const key in image.sizes) {
        if (key.endsWith("-width")) {
            const width = image.sizes[key];
            if (width < bestThumbWidth && width >= minWidth) {
                bestThumbName = key.substring(0, key.length - "-width".length);
                bestThumbWidth = width;
                bestThumbUrl = image.sizes[bestThumbName];
            }
        }
    }

    // The URL will be a Wordpress URL on the admin-site server, which isn't
    // accessible to the public; convert it to a path only and serve it from
    // our user-site server:
    const parsedUrl = parse(bestThumbUrl);
    return parsedUrl.pathname;
}
