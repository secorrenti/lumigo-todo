import { Component, Input } from '@angular/core';

@Component({
  selector: 'lm-icon',
  template: `
    <i class="bi bi-{{icon}} {{color}}"></i>
  `,
  styleUrls: ['./icon.component.scss']
})
export class IconComponent {

  @Input() icon: string;
  @Input() color: 'white';
}
