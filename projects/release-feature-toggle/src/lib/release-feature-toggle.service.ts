import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ReleaseFeatureToggleService {
  private propPath: string;

  constructor(private http: HttpClient) {
    this.start();
  }

  private start() {
    this.path = environment.featuresTogglePath;
  }

  private set path(pPath: string) {
    this.propPath = pPath;
  }

  private get path() {
    return this.propPath;
  }

  isEnabled(
    features: { [key: string]: { enabled: boolean; value: string } },
    key: string,
    value?: string | Array<string>
  ): boolean {
    if (features[key].enabled) {
      if (features[key].value && value) {
        if (typeof value === "string") {
          return String(features[key].value)
            .toLowerCase()
            .includes(value.toLowerCase());
        }
        return Boolean(
          value.findIndex((val: string) =>
            val
              ? String(features[key].value)
                  .toLowerCase()
                  .includes(val.toLowerCase())
              : 0
          )
        );
      }
      return features[key].enabled;
    }
  }

  isOn(key: string, value?: string | Array<string>) {
    return new Promise((resolve, reject) => {
      this.http
        .get(environment.featuresTogglePath)
        .subscribe(
          (features: {
            [key: string]: { enabled: boolean; value: string };
          }) => {
            if (features) {
              resolve(this.isEnabled(features, key, value));
            }
          }
        );
    });
  }
}
