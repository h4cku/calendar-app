import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-bg-selector',
  standalone: true,
  imports: [],
  templateUrl: './bg-selector.component.html',
  styleUrl: './bg-selector.component.scss',
})
export class BgSelectorComponent {
  @ViewChild('canvasEl') canvas!: ElementRef<HTMLCanvasElement>;
  context!: CanvasRenderingContext2D;

  constructor() {}

  ngAfterViewInit() {
    this.context = this.canvas.nativeElement.getContext('2d')!;
    this.drawPalette();
  }

  drawPalette() {
    const ctx = this.context;
    const width = this.canvas.nativeElement.width;
    const height = this.canvas.nativeElement.height;

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const color = this.calculateColor(x / width, y / height);
        ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }

  calculateColor(
    x: number,
    y: number
  ): { r: number; g: number; b: number; a: number } {
    // Calculate color based on x-axis position
    const r = Math.floor(255 * x);
    const g = Math.floor(255 * (1 - x));
    const b = Math.floor(255 * y);

    // Calculate transparency based on y-axis position
    const a = Math.floor(255 * (1 - y));

    return { r, g, b, a };
  }

  onMouseClick(event: MouseEvent) {
    // this.drawPalette();
    console.log(event.offsetX);
    console.log(event.offsetY);
    console.log(event);
  }
}
