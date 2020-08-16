import {
  Directive,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  HostListener,
} from '@angular/core';

@Directive({
  selector: '[clickOutside]',
})
export class ClickOutsideDirective {
  @Output() onClickOutside = new EventEmitter<MouseEvent>();

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  public onClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const clickedInside = this.elementRef.nativeElement.contains(target);
    if (!clickedInside) {
      this.onClickOutside.emit(event);
    }
  }
}
