export class WordpressSupplier {
    name: string;
    link: string;

    constructor(rawSupplier: RawWordpressSupplier) {
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
