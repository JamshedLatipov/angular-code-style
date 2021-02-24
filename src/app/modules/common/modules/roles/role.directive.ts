import { Directive, TemplateRef, ViewContainerRef, Input } from '@angular/core';
import { CookieService } from '@alpha-smart/common/lib/services/cookie.service';
import { ECookieKeys } from '@alpha-smart/utils/enums/auth.enum';
import { Role } from '@alpha-smart/models/admin/role';
import { User } from '@alpha-smart/models/admin/user';

@Directive({
  selector: '[hasAccess]',
})
export class RoleDirective {
  private _hasView = false;

  constructor(
    private _templateRef: TemplateRef<any>,
    private _viewContainer: ViewContainerRef,
    private _cookieService: CookieService
  ) {}

  @Input()
  public set hasAccess(roles: Array<Role>) {
    const user: User = this._cookieService.get(ECookieKeys.User);
    const hasAccess: boolean = user.role.some((role) => roles.indexOf(role) > -1);

    if (hasAccess && !this._hasView) {
      this._viewContainer.createEmbeddedView(this._templateRef);
      this._hasView = true;
    } else if (!hasAccess && this._hasView) {
      this._viewContainer.clear();
      this._hasView = false;
    }
  }
}
