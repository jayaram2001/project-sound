import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  @ViewChildren('box') boxes!: QueryList<ElementRef>;

  // Maps to store the state for each scroll box
  isDownMap = new Map<HTMLElement, boolean>();
  startXMap = new Map<HTMLElement, number>();
  startYMap = new Map<HTMLElement, number>();
  scrollLeftMap = new Map<HTMLElement, number>();
  scrollTopMap = new Map<HTMLElement, number>();

  ngAfterViewInit(): void {
    this.boxes.forEach((box: ElementRef) => {
      const boxEl = box.nativeElement;

      // Initialize the state for each scroll box
      this.isDownMap.set(boxEl, false);
      this.startXMap.set(boxEl, 0);
      this.startYMap.set(boxEl, 0);
      this.scrollLeftMap.set(boxEl, 0);
      this.scrollTopMap.set(boxEl, 0);

      // Add event listeners to each scroll-box
      boxEl.addEventListener('mousedown', (e: MouseEvent) => this.onMouseDown(e, boxEl));
      boxEl.addEventListener('mouseleave', () => this.onMouseLeave(boxEl));
      boxEl.addEventListener('mouseup', () => this.onMouseUp(boxEl));
      document.addEventListener('mousemove', (e: MouseEvent) => this.onMouseMove(e, boxEl));
    });
  }

  onMouseDown(e: MouseEvent, boxEl: HTMLElement): void {
    this.isDownMap.set(boxEl, true);
    this.startXMap.set(boxEl, e.pageX - boxEl.offsetLeft);
    this.startYMap.set(boxEl, e.pageY - boxEl.offsetTop);
    this.scrollLeftMap.set(boxEl, boxEl.scrollLeft);
    this.scrollTopMap.set(boxEl, boxEl.scrollTop);
    boxEl.style.cursor = 'grabbing';
  }

  onMouseLeave(boxEl: HTMLElement): void {
    this.isDownMap.set(boxEl, false);
    boxEl.style.cursor = 'grab';
  }

  onMouseUp(boxEl: HTMLElement): void {
    this.isDownMap.set(boxEl, false);
    boxEl.style.cursor = 'grab';
  }

  onMouseMove(e: MouseEvent, boxEl: HTMLElement): void {
    if (!this.isDownMap.get(boxEl)) return;

    const x = e.pageX - boxEl.offsetLeft;
    const y = e.pageY - boxEl.offsetTop;

    const walkX = (x - (this.startXMap.get(boxEl) || 0)) * 1; // Adjust scroll speed here
    const walkY = (y - (this.startYMap.get(boxEl) || 0)) * 1; // Adjust scroll speed here

    boxEl.scrollLeft = (this.scrollLeftMap.get(boxEl) || 0) - walkX;
    boxEl.scrollTop = (this.scrollTopMap.get(boxEl) || 0) - walkY;
  }
}
