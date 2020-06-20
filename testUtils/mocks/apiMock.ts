import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mockedApi = new MockAdapter(axios);

export default mockedApi;
