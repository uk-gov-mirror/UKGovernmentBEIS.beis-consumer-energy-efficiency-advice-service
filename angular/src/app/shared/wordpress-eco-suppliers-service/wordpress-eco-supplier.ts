/**
 * Energy companies participating in the Energy Company Obligation (ECO)
 */
export class WordpressECOSupplier {
    // The slug is used to fetch the logo for the ECO supplier from
    // /assets/images/eco-suppliers/{{slug}}.jpeg
    slug: string;
    name: string;
    link: string;

    constructor(rawSupplier: RawWordpressECOSupplier) {
        this.slug = rawSupplier.slug;
        this.name = rawSupplier.acf.name;
        this.link = rawSupplier.acf.supplier_info_link;
    }
}

export interface RawWordpressECOSupplier {
    id: number;
    acf: {
        name: string;
        supplier_info_link: string;
    };
    slug: string;
}
