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

  public isEnabled(
    features: any,
    key: string,
    value?: string | Array<string>
  ): boolean {
    try {
      if (features[key].enabled && features[key].value) {
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
    } catch (error) {
      throw new Error(
        "Não existe a feature referente a chave passada ou falta o parametro matrícula."
      );
    }
  }

  isOn(key: string, value?: string | Array<string>): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http.get(environment.featuresTogglePath).subscribe(
        (features) => resolve(this.isEnabled(features, key, value)),
        (err) => reject(err)
      );
    });
  }
}
