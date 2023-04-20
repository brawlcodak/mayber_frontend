import { Injectable } from "@angular/core";
import { EndPoints } from "./end-points.setting";

@Injectable()
export class UrlSettings {
  public auth = {
    login: {
      url: {
        base: EndPoints.uri('users/login'),
        register: EndPoints.uri('users/register'),
        send_report_error: EndPoints.uri('users/report_error'),
        consult_token: EndPoints.uri('users/token'),
        allusers: EndPoints.uri('users/all'),
      }
    }
  };
  public account = {
    url: {
      license_types: EndPoints.uri('dashboard/licenses_type'),
      licenses_by_user: EndPoints.uri('dashboard/licenses_by_user'),
      add_license: EndPoints.uri('dashboard/add_license'),
      add_free_license: EndPoints.uri('dashboard/add_license_free'),
      update_license: EndPoints.uri('dashboard/update_license'),
      black_ips: EndPoints.uri('dashboard/blacks'),
      pay_report: EndPoints.uri('accounts/pay_report'),
      pay_report_response: EndPoints.uri('accounts/pay_report/response'),
      black_list:  EndPoints.uri('accounts/black_list'),
    }
  };
}
