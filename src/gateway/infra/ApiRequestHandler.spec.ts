import axios, { AxiosInstance } from 'axios';
import { ApiRequestHandler } from './ApiRequestHandler';

describe('ApiRequestHandler', () => {
    let axiosMock: jest.Mocked<AxiosInstance>;
    let apiRequestHandler: ApiRequestHandler;

    beforeEach(() => {
        axiosMock = {
            get: jest.fn(),
        } as unknown as jest.Mocked<AxiosInstance>;

        apiRequestHandler = new ApiRequestHandler(axiosMock);
    });

    it('deve realizar uma requisição GET com sucesso', async () => {
        const mockData = { id: 1, name: 'John Doe' };
        axiosMock.get.mockResolvedValue({ data: mockData });

        const response = await apiRequestHandler.get('http://localhost:3000/users');
        
        expect(response).toEqual(mockData);
    });

    it('deve realizar uma requisição GET autenticada com sucesso', async () => {
        const mockData = { id: 1, name: 'John Doe' };
        const token = 'fake-token';
        axiosMock.get.mockResolvedValue({ data: mockData });

        const response = await apiRequestHandler.getAuthenticated('http://localhost:3000/users', token);
        
        expect(response).toEqual(mockData);
    });
});
