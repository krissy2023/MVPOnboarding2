
using MVPOnboarding2.Server.DTOs;
using MVPOnboarding2.Server.Models;

namespace MVPOnboarding2.Server.Mappers
{
    public class SaleMapper
    {
        public static Sale DtoToEntity(SaleDto saleDto)
        {
            var entity = new Sale
            {
                Id = saleDto.Id,
                CustomerId = saleDto?.CustomerId,
                StoreId = saleDto?.StoreId,
                ProductId = saleDto?.ProductId,
                DateSold = saleDto?.DateSold,
            };

            return entity;
        }

        public static SaleDto EntityToDto(Sale sale)
        {
            var dto = new SaleDto
            {
                Id = sale.Id,
                CustomerId = sale.CustomerId,
                StoreId = sale.StoreId,
                ProductId = sale.ProductId,
                DateSold = sale.DateSold,
                CustomerName = sale.Customer?.Name,
                StoreName = sale.Store?.Name,
                ProductName = sale.Product?.Name,
            };
            return dto;
        }
    }
}
