using MVPOnboarding2.Server.DTOs;
using MVPOnboarding2.Server.Models;

namespace MVPOnboarding2.Server.Mappers
{
    public static class ProductMapper
    {
        public static Product DtoToEntity(ProductDto productDto)
        {
            var entity = new Product
            {
                Id = productDto.Id,
                Name = productDto.Name,
                Price = productDto.Price,
            };
             return entity;
        }

        public static ProductDto EntityToDto(Product product) 
        {
            var dto = new ProductDto
            {
                Id = product.Id,
                Name = product.Name,
                Price = product.Price,
            };
            return dto;
        }
    }
           
}
