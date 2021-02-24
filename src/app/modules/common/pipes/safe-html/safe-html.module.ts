import { NgModule } from '@angular/core';
import { SafeHtmlPipe } from '@alpha-smart/common/lib/pipes/safe-html/safe-html.pipe';

@NgModule({
  declarations: [
    SafeHtmlPipe
  ],
  exports: [
    SafeHtmlPipe
  ],
  providers: [
    SafeHtmlPipe
  ]
})
export class SafeHtmlModule {}
