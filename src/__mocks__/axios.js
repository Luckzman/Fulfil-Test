  
export const mockResponse = {
  data: [
    {
      id: 1,
      thumbnailUrl: "https://via.placeholder.com/150/92c952",
      title: "accusamus beatae ad facilis cum similique qui sunt"
    },
    {
      id: 2,
      thumbnailUrl: "https://via.placeholder.com/150/92c952",
      title: "accusamus beatae ad facilis cum similique qui sunt"
    },
    {
      id: 3,
      thumbnailUrl: "https://via.placeholder.com/150/92c952",
      title: "accusamus beatae ad facilis cum similique qui sunt"
    },
  ]
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  // get: jest.fn().mockResolvedValue(mockResponse)
  get: () => Promise.resolve(mockResponse)
}