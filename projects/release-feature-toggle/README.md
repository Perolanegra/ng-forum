# ReleaseFeatureToggle

npm install release-feature-toggle

Import a lib no seu AppModule:

import { ReleaseFeatureToggleModule } from "release-feature-toggle";

No array de imports declare da seguinte forma: 
ReleaseFeatureToggleModule.forRoot(environment) 

<-- onde o enviroment aponta pra pasta de seus arquivos de configuracao de cada ambiente -->

# Utilizando a lib no seu component TS

import { ReleaseFeatureToggleService } from 'release-feature-toggle';

constructor(private toggle: ReleaseFeatureToggleService) {}

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

> Nota: Não esqueça de criar os arquivos que irão conter as features `features.json` onde existirá cada arquivo para determinado ambiente. Exemplo Abaixo: 


![image](https://user-images.githubusercontent.com/34343165/127925157-3b23ff27-a75b-47c9-bdcd-6fcb7867675f.png)

![image](https://user-images.githubusercontent.com/34343165/127925260-83ddcd97-4eb2-4c4e-80bb-027b253eadbf.png)


