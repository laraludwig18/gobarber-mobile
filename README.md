# GoBarber

App utilizado pelos clientes para agendar serviços com os prestadores.

## Telas

<div style="display:flex;">
  <img src="https://i.imgur.com/IWrCJ3r.png" width="300" height="600" title="source: imgur.com" />
  <img src="https://i.imgur.com/GbEVw24.png" width="300" height="600" title="source: imgur.com" />
  <img src="https://i.imgur.com/marM4lj.png" width="300" height="600" title="source: imgur.com" />
  <img src="https://i.imgur.com/EJYISyO.png" width="300" height="600" title="source: imgur.com" />
  <img src="https://i.imgur.com/jsn3vs8.png" width="300" height="600" title="source: imgur.com" />
  <img src="https://i.imgur.com/yOofmVs.png" width="300" height="600" title="source: imgur.com" />
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
- [x] Diminuir tamanho da imagem antes de enviar para a api
- [x] Melhorar layout da tela de perfil
- [ ] Adicionar botão para deslogar usuário
- [ ] Retornar erro ao tentar agendar em um sábado ou domingo
- [ ] Usar react-native-fast-image para lidar com imagens externas
- [ ] Paginar lista de providers
- [ ] Adicionar loader no botão
- [ ] Adicionar shimmer effect nas telas ou loader nas telas
- [ ] Criar estado global de loading usando context api
- [ ] Separar tipagens que estejam duplicadas
