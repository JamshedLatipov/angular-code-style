import { BaseModalComponent } from '@alpha-smart/ui/lib/modules/dialog/components/base-modal/base-modal.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'alpha-smart-error-request',
  templateUrl: './error-request.component.html',
  styleUrls: ['./error-request.component.scss']
})
export class ErrorRequestComponent extends BaseModalComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
