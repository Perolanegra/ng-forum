# ReleaseFeatureToggle

npm install release-feature-toggle

Import a lib no seu AppModule:

import { ReleaseFeatureToggleModule } from "release-feature-toggle";

No array de imports declare da seguinte forma: 
ReleaseFeatureToggleModule.forRoot(environment) 

<-- onde o enviroment aponta pra pasta de seus arquivos de configuracao de cada ambiente -->

# Utilizando a lib no seu component TS

import { ReleaseFeatureToggleService } from 'release-feature-toggle';
constructor(private toggle: ReleaseFeatureToggleService)

ngOnInit() {
    this.toggle.isOn('nomeFeatureSetadoNoJSON', 'matricula_qualquer').then((hasPermission: boolean) => {
      console.log('haspermission: ', hasPermission);
    })
}

# Utilizando a lib no seu component HTML

<ng-template toggleFeature="nomeFeatureSetadoNoJSON" [matriculas]="propriedadeTypescript"> 
    <div>Conteúdo aqui</div>
</ng-template>    

<ng-template toggleFeature="nomeFeatureSetadoNoJSON" [matriculas]="'matricula_qualquer'"> 
    <div>Conteúdo aqui</div>
</ng-template> 


## Por último, mas não menos importante

Run `ng generate component component-name --project release-feature-toggle` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project release-feature-toggle`.
> Nota: Não esqueça de criar os arquivos que irão conter as features `features.json` onde existirá cada arquivo para determinado ambiente. Exemplo Abaixo:  

