# Seminário sobre Firestore da plataforma Firebase

## Vamos criar um projeto no Firebase

- https://console.firebase.google.com
- Habilitar o método de autenticação com conta Google.
- Criar um banco de dados Firestore (Iniciar em modo bloqueado)
- Utilizar o painel web para adicionar coleções e documentos.
- Definir regras de acesso aos dados

```.rules
service cloud.firestore {
  match /databases/{database}/documents {
    match /usuarios/{usuario} {
      allow read: if usuario == request.auth.uid;
      allow write: if usuario == request.auth.uid;

       match /tarefas/{id} {
         allow read: if usuario == request.auth.uid;
         allow write: if usuario == request.auth.uid;
       }
    }
  }
}
```

## Instalar VS Code e o Node.js

É recomendado instalar a última versão LTS, que esta na versão 10.15.3 no presente momento.

## Instalar as ferramentas que utilizaremos para o desenvolvimento e deploy da nossa aplicação.

    npm install --global @angular/cli firebase-tools

## Etapa 1 - Criando nosso projeto

    ng new seminario-firestore --style=scss --routing=false
    cd seminario-firestore
    code .

### Rodando a nossa aplicação pela primeira vez

    ng serve
    open http://localhost:4200/

### Caso tenha feito o download do código já pronto

    unzip seminario-firestore.zip
    cd seminario-firestore
    npm install
    ng serve

## Etapa 2 - Instalando mais algumas dependências necessarias para o nosso projeto

    npm install --save @angular/fire firebase
    ng add @ionic/angular

## Etapa 3 - Criando paginas e configurando a navegação

    ng generate component paginas/login
    ng generate component paginas/tarefas/listagem
    ng generate component paginas/tarefas/formulario

## Etapa 4 - Configurar sdk firebase

- Configurações do Projeto > Geral > Seus Aplicativos > (</> Web)
- Copiar configurações para dentro do arquivo environments.ts e enviroments.prod.ts
- Importar módulos @angular/fire

## Etapa 5 - Implementar login com google

- Adicionar login / logout
- Configurando regras navegação

## Etapa 6 - Implementar CRUD de tarefas

## Etapa 7 - Hospedar app com firebase hosting

    ng build --prod
    firebase login
    firebase init
    firebase deploy
