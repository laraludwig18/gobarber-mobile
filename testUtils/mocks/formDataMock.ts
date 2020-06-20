function FormDataMock(): void {
  this.append = jest.fn();
}

global.FormData = FormDataMock;
