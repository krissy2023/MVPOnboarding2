using MVPOnboarding2.Server.DTOs;
using MVPOnboarding2.Server.Models;

namespace MVPOnboarding2.Server.Mappers
{
    public static class StoreMapper
    {
        public static Store DtoToEntity(StoreDto storeDto)
        {
            var entity = new Store
            {
                Id = storeDto.Id,
                Name = storeDto.Name,
                Address = storeDto.Address,
            };

            return entity;
        }

        public static StoreDto EntityToDto (Store store)
        {
            var dto = new StoreDto
            {
                Id = store.Id,
                Name = store.Name,
                Address = store.Address,
            };
            return dto;
        }
    }
}
