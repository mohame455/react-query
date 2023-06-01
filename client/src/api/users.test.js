import axios from 'axios'
import {getUser} from './users'
jest.mock('axios');


describe('getPost', () => {
    test('should return the data from axios response', async () => {
      const expectedData = { id: 1, name: 'Example user name' };
  
      axios.get.mockResolvedValue({ data: expectedData });
  
      const result = await getUser(1);

      expect(result).toEqual(expectedData);
    });
  });


  
