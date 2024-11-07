import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-dummy',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './dummy.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DummyComponent { }
