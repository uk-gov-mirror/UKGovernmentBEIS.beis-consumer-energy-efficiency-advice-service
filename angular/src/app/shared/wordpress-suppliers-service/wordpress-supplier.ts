export class WordpressSupplier {
    // The slug is used to fetch the logo for the supplier from
    // /assets/images/eco-suppliers/{{slug}}.jpeg
    slug: string;
    name: string;
    link: string;

    constructor(rawSupplier: RawWordpressSupplier) {
        this.slug = rawSupplier.slug;
        this.name = rawSupplier.acf.name;
        this.link = rawSupplier.acf.supplier_info_link;
    }
}

export interface RawWordpressSupplier {
    id: number;
    acf: {
        name: string;
        supplier_info_link: string;
    };
    slug: string;
}
