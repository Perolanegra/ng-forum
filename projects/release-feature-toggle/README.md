# ReleaseFeatureToggle

npm install path-to-release-feature-toggle/release-feature-toggle-0.0.1.tgz

Import a lib no seu AppModule:

import { ReleaseFeatureToggleModule } from "release-feature-toggle";

No array de imports declare da seguinte forma: 
ReleaseFeatureToggleModule.forRoot(environment) 

<-- onde o enviroment aponta pra pasta de seus arquivos de configuracao de cada ambiente -->

# Utilizando a lib no seu component TS

import { ReleaseFeatureToggleService } from 'release-feature-toggle';

constructor(private toggle: ReleaseFeatureToggleService) {}

ngOnInit() {

    const matricula_qualquer = 'i12345';
    this.toggle.isOn('exibirLogin', matricula_qualquer)
      .then((hasPermission: boolean) => {
      console.log('haspermission: ', hasPermission);
    })
    
    
    const matricula_qualquer_array = ['i12345', ];
    this.toggle.isOn('exibirLogin', matricula_qualquer_array)
      .then((hasPermission: boolean) => {
      console.log('haspermission: ', hasPermission);
    })
    
}

# Utilizando a lib no seu component HTML


<ng-template toggleFeature="exibirLogin" [matriculas]="matricula_qualquer"> 
    Conteúdo aqui
< / ng-template>    

  
<ng-template toggleFeature="exibirLogin" [matriculas]=" 'i12345' "> 
    Conteúdo aqui
< / ng-template> 


## Por último, mas não menos importante

> Nota: Não esqueça de criar os arquivos que irão conter as features `features.json` onde existirá cada arquivo para determinado ambiente. Exemplo Abaixo: 


![image](https://user-images.githubusercontent.com/34343165/127925157-3b23ff27-a75b-47c9-bdcd-6fcb7867675f.png)

![image](https://user-images.githubusercontent.com/34343165/127925260-83ddcd97-4eb2-4c4e-80bb-027b253eadbf.png)

![image](https://user-images.githubusercontent.com/34343165/127935417-f328693e-5ea7-45e9-af1d-aaf2502aae85.png)

> Nota: a propriedade `value` é exatamente dividida pelo caractere ^ (que significa o começo de uma matrícula), seguido da matrícula, terminando separado do começo de outra matrícula indicado pelo caractere |, e assim sucessivamente com as outras matrículas.
 
> Nota: dentro do seu objeto environment é preciso existir a propriedade `featuresTogglePath` que será populada pelo valor da url de caminho até o
arquivo `features.json` do determinado ambiente.


  
  #### Baixando a lib ####
  
  Vá até a pasta assets/libs deste repositório e faça o download o arquivo referente a lib.
  Siga para o primeiro passo de instalação no topo do Informativo.
  
  #################################################
