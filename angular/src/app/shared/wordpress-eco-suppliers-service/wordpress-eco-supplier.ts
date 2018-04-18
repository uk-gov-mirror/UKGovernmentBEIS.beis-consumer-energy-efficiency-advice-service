/**
 * Energy companies participating in the Energy Company Obligation (ECO)
 */
import {AcfImage, getAcfImageUrlForMinSize} from "../wordpress-pages-service/acf-image";

export class WordpressECOSupplier {
    name: string;
    link: string;
    logo_image_src: string;

    constructor(rawSupplier: RawWordpressECOSupplier) {
        this.name = rawSupplier.acf.name;
        this.link = rawSupplier.acf.supplier_info_link;
        // The thumbnail width chosen here should match eco-suppliers-page.component.scss
        this.logo_image_src = getAcfImageUrlForMinSize(230, rawSupplier.acf.logo_image);
    }
}

export interface RawWordpressECOSupplier {
    id: number;
    acf: {
        name: string;
        supplier_info_link: string;
        logo_image: AcfImage;
    };
    slug: string;
}
