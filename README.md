# GoBarber

App para agendamento de serviços de barbearia

## Telas

<div style="display:flex;">
  <img src="https://i.imgur.com/IWrCJ3r.png" width="300" height="600" title="source: imgur.com" />
  <img src="https://i.imgur.com/GbEVw24.png" width="300" height="600" title="source: imgur.com" />
</div>

## Inicialização

### Android

Instalar dependências:
```
yarn
```
Instalar app no dispositivo:
```
yarn android
```
Rodar projeto:
```
yarn start
```

### IOS

Instalar dependências:
```
yarn
```
Dentro da pasta ios para instalar dependências:
```
pod install
```
Instalar app no dispositivo:
```
yarn ios
```
Rodar projeto:
```
yarn start
```

## TODO

- [x] Deslogar usuário quando token expirar
- [ ] Paginar lista de providers
- [ ] Usar react-native-fast-image para lidar com imagens externas
- [ ] Adicionar loader no botão
- [ ] Criar estado global de loading usando context api
- [ ] Adicionar tratamento caso usuário não tenha avatar
- [ ] Separar tipagens que estejam duplicadas
