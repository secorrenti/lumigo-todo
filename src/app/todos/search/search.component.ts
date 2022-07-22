import { Component, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { SearchService } from './search.service';

@Component({
  selector: 'lm-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  open: boolean;
  @ViewChild('inputRef') inputRef: ElementRef<HTMLInputElement>
  @Output() searchChange = new EventEmitter<string>();

  constructor(
    private searchService: SearchService,
  ) {}

  toggle(): void {
    this.open = !this.open;
    const el = this.inputRef.nativeElement;
    if(this.open) {
      setTimeout(() => el.focus(), 300);
    } else {
      el.value = '';
      this.change(el.value);
      el.blur();
    }
  }

  change(value: string): void {
    this.searchService.searchChange(value);
  }
}
