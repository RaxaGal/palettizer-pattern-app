import { Component } from '@angular/core';

interface Box {
  x: number;
  y: number;
  r: number;
}

@Component({
  selector: 'app-palette-editor',
  templateUrl: './palette-editor.component.html',
  styleUrls: ['./palette-editor.component.scss']
})
export class PaletteEditorComponent {
  paletteWidth = 800; // Width of the palette in mm
  paletteHeight = 1200; // Height of the palette in mm
  boxWidth = 200; // Width of a box in mm
  boxHeight = 300; // Height of a box in mm
  boxes: Box[] = [{
    "x": 100,
    "y": 150,
    "r": 0
  }];
  
  get patternOutput(): string {
    return JSON.stringify(this.boxes, null, 2);
  }

  // Drag and drop box logic
  onDrop(event: any): void {
    const x = event.dropPoint.x;
    const y = event.dropPoint.y;
  }

  addBox(): void {
    // Calculate the number of boxes in the current column
    const boxRef = this.boxes[this.boxes.length - 1];
    const x1 = boxRef.x;
    let columnCount = 0;
    for (let i = this.boxes.length - 1; i >= 0; i--) {
      const box = this.boxes[i];
      if (box.x === x1) {
        columnCount++;
      } else {
        break; // Stop counting once a different column is encountered
      }
    }

    // Calculate x and y cordinates.
    let x = boxRef.x || 100;
    let y = (boxRef.y <= this.boxHeight ? this.paletteHeight - ((this.boxHeight / 2) * columnCount) : boxRef.y - ((this.boxHeight / 2) * columnCount) - 5)
   
    
    // Check if the new box exceeds the height of the palette
    const colBoxes = this.boxes.filter(box => box.x === x) || 1;
    if (this.boxHeight > (this.paletteHeight - (this.boxHeight + 5) * colBoxes.length)) {
      // Move to the next column
      x += this.boxWidth + 5;
    }

    // Check if the new box exceeds the width of the palette
    if (!(x + this.boxWidth > this.paletteWidth)) {
      const box: Box = {
        x,
        y,
        r: 0
      };
      this.boxes.push(box);
    }

  }

  removeBox(box: Box): void {
    const index = this.boxes.indexOf(box);
    if (index !== -1) {
      this.boxes.splice(index, 1);
    }
  }

  rotateBox(box: Box, degree: number = 90): void {
    box.r += degree;
    box.x = (box.r / 90) % 2 == 0 ? box.x - 50 : box.x + 50;
    box.y = (box.r / 90) % 2 == 0 ? box.y - 50 : box.y + 50;
  }
}
