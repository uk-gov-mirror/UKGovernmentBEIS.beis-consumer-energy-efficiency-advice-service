import { Component, Input } from '@angular/core';
@Component({
    selector: 'app-show-image',
    template: `
    <img src="/dist/assets/images/question-images/{{src}}" />
`
})
export class ShowImageComponent {
    @Input() src = "hotwaterboiler.jpg";
}
